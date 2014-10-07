---
layout: recipe
---

## Overview

This is a liquid crystal display.

![LCD Mockup](/images/lcd_mockup.jpg)

### Preparation Time Estimates

* Hardware Preparation Time: 45 minutes
* Software Development Time: 20 minutes

## Hardware

### Parts List
* Development Computer
  * Node.js installed
  * NPM installed
* [LCD Button Shield](https://www.sparkfun.com/products/11851) - SparkFun
* [Arduino Uno R3](https://www.sparkfun.com/products/11021) - SparkFun
* [USB Type B Cable](https://www.sparkfun.com/products/11515) - SparkFun

### Setup

1. Solder the header pins onto the LCD Button Shield
2. Place the shield onto the Arduino Uno R3
3. Plug Arduino Uno R3 into the development computer

## Software

### Zetta Projects Overview

Zetta projects typically include apps and devices. The file structure looks like this:

+ `/i-heard-dat`
  + `server.js`
  + `apps`
    + `i_heard_dat.js`
  + `/scouts`
    + `/arduino`
      + `index.js`
      + `lcd_driver.js`

### Install Zetta

Install Zetta and prerequisites, see [Zetta Installation]().

### Write Device Driver

A driver is responsible for interacting with a Zetta device. This is a building block of your system.

##### Create a new device driver

Call the driver `lcd_driver.js`. In zetta the naming convention for a device driver is to name the driver after the device it is representing, and add `_driver` at the end.

##### Write this code

```JavaScript
var util = require('util');
var Driver = require('zetta').Driver;

var LCD = module.exports = function(port){
  Driver.call(this);
  this._port = port;
  this.message = 'Hello, World!';
};
util.inherits(LCD, Driver);

LCD.prototype.init = function(config) {
  config
    .name('message-screen')
    .type('lcd')
    .state('ready')
    .when('ready', { allow: ['change'] })
    .map('change', this.change, [{ name: 'message' }])
    .monitor('message');
}

LCD.prototype.change = function(message, cb) {
  var self = this;
  this._port.write(message, function(err) {
    if (err) {
      return cb(err);
    }

    self.message = message;

    cb();
  });
};
```

In the driver sample above there are a few things to take note of.

1. In Zetta you'll have your drivers inherit from `require('zetta').Driver`. This is required. This is how we can tell that your code is a driver.
2. In Zetta the `name` property is special. It is the human readable name for your device. It isn't required, but it is *highly* recommended that you use it.
3. In Zetta we use state machines to define what devices look like in software:
  * The `.state('ready')` function sets the initial state of the LCD to ready.
  * The `.when()` function tells us what transitions are available per state. When the device is in the `'ready'` state we only allow the `'change'` transition to occur.
  * The `.map()` function maps a transition to a javascript function to be called. Here we are mapping the `'change'` transition to the `change()` function on the  `LCD` prototype.

### Write Device Scout

Call the scout `index.js`. In zetta the naming convention for a scout is using the node.js convention of naming a file `index.js` for purposes of requiring the module.

##### Write this code

```JavaScript
var util = require('util');
var Scout = require('zetta').Scout;
var SerialPort = require('serialport').SerialPort;
var LCD = require('./lcd_driver');
var Microphone = require('./microphone_driver');

var Arduino = module.exports = function(portName) {
  Scout.call(this);
  this.portName = portName;
};
util.inherits(Arduino, Scout);

Arduino.prototype.init = function(cb) {
  var self = this;
  var port = new SerialPort(portName, function(err) {
    if(err) {
      return cb(err);
    }

    self.discover(LCD, port);

    cb();
  });
};
```

In the scout sample above there are a few things to take note of.

1. In Zetta you'll have your scouts inherit from `require('zetta').Scout`. This is required. This lets Zetta know your code is a scout.
2. In this sample we've discovered a device when our serial connection has been established. We use `this.discover` to let Zetta know that we have found our desired device.
  * The arguments to `this.discover` are the constructor function for your driver, and any parameters that the constructor function requires.

##### Create a server file

Call the server file `server.js` it will live at the top level directory of your zetta application. This is where you'll load devices, and apps together.
With Zetta you don't need to write apps to access devices. APIs come for free from modeling your devices.

##### Write this code

```JavaScript
var zetta = require('zetta');
var Arduino = require('./devices/arduino')
var app = require('./apps/i_heard_dat');

zetta()
  .name(process.env.ZETTA_NAME || 'local')
  .use(Arduino, process.env.ZETTA_ARDUINO_PORT || '/dev/tty.usbserial')
  .expose('*')
  .load(app)
  .link(process.env.ZETTA_PEERS.split(',') || 'http://example.com')
  .listen(process.env.PORT || 3000);
```

In the server sample above there are a few things to take note of.

1. Just like with device drivers you use the `name()` function to give your apps a human readable name. This is entirely optional but highly recommended.
2. `use(Arduino)` is the syntax you'll use to load a device into zetta. This can be drivers that you write, or drivers retrieved off of NPM.
3. Use `expose('*')` to reveal all devices over your API. This makes it easy to access devices quickly.
4. `load(app)` is the syntax for loading apps. Don't worry about this for now. We'll go over apps in the next section.
5. `link('http://example.com')` allows you to link an instance of zetta to another instance of Zetta. Typically this is to link Zetta to the cloud to share devices with the open internet.
6. `listen(3000)` allows you to set the port that you'll use to have your instance of zetta listen on. It's good to remember this during development!

## Run Zetta

Simply run your server with the node command! `node server.js` This will scout for your LCD screen and allow you to see it over the API.

## API

Zetta automatically generates a Web API based on the drivers that you write in code. Below is the Web API for the LCD screen you just wrote.

### Explore Web API

```
{
 "class":["device"],
 "properties": {
  "id":"63C9D11C-4567-4911-90A8-1357C810C65C",
  "name":"My LCD Screen",
  "type":"lcd",
  "state":"ready",
  "message":"Hello, World!"
 },
 "actions":[
   {
     "name":"change",
     "method":"POST",
     "href":"http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/devices/63C9D11C-4567-4911-90A8-1357C810C65C",
     "fields": [
       {
         "name": "action",
         "type": "hidden",
         "value": "change"
       },
       {
         "name":"message",
         "type":"text"
       }
     ]
   }
 ],
 "links":[
    {
      "rel": ["self"],
      "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/devices/63C9D11C-4567-4911-90A8-1357C810C65C"
    },
    {
      "title":"detroit",
      "rel": ["up", "http://rels.zettajs.io/server"],
      "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7"
    },
    {
      "rel": ["monitor", "http://rels.zettajs.io/log-stream"],
      "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/devices/63C9D11C-4567-4911-90A8-1357C810C65C"
    }
  ]
}
```

## Deployment

### Environments

### Multiple Geolocations

## Next Steps

### Write a Big App

## Summary
