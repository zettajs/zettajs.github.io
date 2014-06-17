---
layout: recipe
---

## Overview

In this recipe, we will setup a sound detector, create an API for it and show how to include it in an app.

We will also explore how to develop, test, stage and deploy the sensor into production in multiple, geo-distributed locations.

![Sound Sensor Mockup]({{ site.url }}/images/sound_sensor_mock.jpg)

### Preparation Time Estimates

* Hardware Preparation Time: 30 minutes
* Software Development Time: 15 minutes

## Hardware

### Parts List
* Development Computer
  * Node.js installed
  * NPM installed
* [Sound Detector](https://www.sparkfun.com/products/12642)
* [Arduino Uno](http://arduino.cc/en/Main/ArduinoBoardUno)
* [Breadboard](https://www.sparkfun.com/products/12002)
* [Jumper Wire](https://www.sparkfun.com/products/124)
* [USB Type B Cable](https://www.sparkfun.com/products/11515)

### Setup

![Sound Sensor Hookup]({{ site.url }}/images/soundSensor.png)

1. Place sound sensor on the breadboard
2. Connect sound sensor to Arduino
    1. Sound Sensor `GND` to Arduino `GND`
    2. Sound Sensor `VCC` to Arduino `5v`
    3. Sound Sensor `GATE` to Arduino `Pin 2`
    4. Sound Sensor `ENVELOPE` to Arduino `Pin A0`
3. Connect the Arduino to your computer with the USB cable

## Software

### Zetta Projects Overview

Zetta projects typically include apps and devices. The file structure looks like this:


+ `/soundSensor`
  + `server.js`
  + `apps`
    + `i_heard_dat.js`
  + `/scouts`
    + `/microphone`
      + `index.js`
      + `microphone_driver.js`

### Install Zetta

Install Zetta and prerequisites, see [Zetta Installation]({% post_url 2014-06-04-installation %}).

### Write Device Driver

A driver is responsible for interacting with a Zetta device. This is a building block of your system.

##### Create a new device driver

Call the driver `microphone_driver.js`. In zetta the naming convention for a device driver is to name the driver after the device it is representing, and add `_driver` at the end.

##### Write this code

```JavaScript
var util = require('util');
var Driver = require('zetta').Driver;

var Microphone = module.exports = function(port){
  Driver.call(this);
  this._port = port;
  this.amplitude = 0;
};
util.inherits(Microphone, Driver);

Microphone.prototype.init = function(config) {
  config
    .name('sound-sensor')
    .type('sound')
    .state('ready')
    .stream('amplitude', this.streamAmplitude);
}

Microphone.prototype.streamAmplitude = function(stream) {
  var self = this;
  this._port.on('data', function(d) {
    var data = Number(d.toString());
    self.amplitude = data;
    stream.write(data);
  });
};
```

In the driver sample above there are a few things to take note of.

1. In Zetta youll have your drivers inherit from `require('zetta').Driver`. This is required. This is how we can tell that your code is a driver.
2. In Zetta the `name` property is special. It is the human readable name for your device. It isnt required, but it is *highly* recommended that you use it.
3. This driver simply streams basic amplitude data from our sensor.
  * In the `stream` function we name our stream `amplitude`. It is best practice to name streams the name of the value that they will stream out of the system.
  * Our second argument to `stream` is a function that wires up the flow of data. It is best practice to follow the naming structure stream{Name of your stream} with this function.
  * Inside the implementation of `streamAmplitude` two things are happening. We are writing to our stream value, and then we are setting an amplitude property to be exposed in the API. Do this allows us to read occasional values as well as stream them if necessary.

### Write Device Scout

A scout is responsible for finding a device on the network or connected to your computer. These are a crucial part to getting devices into Zetta.

##### Create a new device scout

Call the scout `index.js`. In zetta the naming convention for a scout is using the node.js convention of naming a file `index.js` for purposes of requiring the module.

##### Write this code

```JavaScript
var util = require('util');
var Scout = require('zetta').Scout;
var SerialPort = require('serialport').SerialPort;
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

    self.discover(Microphone, port);

    cb();
  });
};
```

In the scout sample above there are a few things to take note of.

1. In Zetta youll have your scouts inherit from `require('zetta').Scout`. This is required. This lets Zetta know your code is a scout.
2. In this sample weve discovered a device when our serial connection has been established. We use `this.discover` to let Zetta know that we have found our desired device.
  * The arguments to `this.discover` are the constructor function for your driver, and any parameters that the constructor function requires.

##### Create a server file

Call the server file `server.js` it will live at the top level directory of your zetta application.

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

### Write an App

In order to test the device, we will want to create an app for it.


##### Write this code

```JavaScript
module.exports = function(server) {
  server.observe([{ type: 'sound' }, { type: 'lcd' }], function(sound, lcd) {
    sound.streams.amplitude.on('data', function(amplitude) {
      if (amplitude > 160) {
        lcd.call('update', 'I heard dat!');
      }
    });
  });
};
```

In the app sample above there are a few things to take note of.

1. Just like with device drivers you use the `name()` function to give your apps a human readable name. This is entirely optional but highly recommended.
2. We use `observe()` to wait for Zetta to notify us of devices that are coming online. Here we pass in the type of device we're waiting for. In our case it's `'sound'`.
3. To access streams just use the `.streams` object on a retrieved device. Notice our stream naming. Consistently name your streams {Name of your stream}Stream to ensure clarity in your code!

### Run Zetta

To run Zetta simply use the `node` command like you would with any other node.js based program. Sit back, relax, and let Zetta work it's magic to generate your app and API for you!

```
node app.js
```

### Explore Web API

Every device gets a web API in Zetta. This can help you interface with your devices easily through HTTP. Check out what our sound sensor looks like!

```json
{
 "class":["device"],
 "properties": {
  "id":"7A8B1779-FEEE-493C-8ADC-32460A6BD8A1",
  "name":"My Microphone",
  "type":"microphone",
  "state":"ready",
  "amplitude":10
 },
 "links":[
    {
      "title":"amplitude",
      "rel":["monitor", "http://rels.zettajs.io/object-stream"],
      "href":"ws://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/devices/7A8B1779-FEEE-493C-8ADC-32460A6BD8A1/amplitude"
    },
    {
      "rel": ["self"],
      "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/devices/7A8B1779-FEEE-493C-8ADC-32460A6BD8A1
      "
    },
    {
      "title":"detroit",
      "rel": ["up", "http://rels.zettajs.io/server"],
      "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7"
    }
  ]
}
```

In our sample API response above there are some special things to take note of.

1. We expose data on the device in the `properties` section of the response
  * `id` is unique per device and generated for you by Zetta
  * `name` is our human readable name for our device.
  * `type` is the type our device is. `'sound'` stands for sound sensor.
  * `state` is the state our device is currently in. Our only state for this sensor is `'standby'`
  * `amplitude` is the sensor value at the time of request.
2. We allow you to also stream sensor values through the API. In the `links` section of the response there will be a link titled `amplitude`. Use this to gain web socket access to your stream.

## Deployment

### Environments

Going from Laptop to RasPi or BeagleBone.

A typical development lifecycle includes multiples tiers: Dev, Test, Deploy, Production

When things get real with sensors in production, it's important to consider the entire development cycle.

Zetta is designed to support dev, test, stage and production environments.

```
+ /soundSensor
  + /envs
    + /dev
    + /test
    + /stage
    + /production
```

### Multiple Geolocations

Zetta is designed to connect devices across multiple geo-locations. In this example, we will imagine deploying sound sensors in four locations:

* Home
* Office

We follow the steps above to get the sensor hardware setup and configured in each location.

Identify the locations...

```
js
```

Deploy to all locations:

```
zetta ...
```

Deploy to one location:

```
zetta ...
```


## Next Steps

### Write a Big App

Write an app, see [I Heard That App]().

## Summary
