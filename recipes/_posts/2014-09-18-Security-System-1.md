---
layout: recipe
title: IoT Security System
author: Matt Dobson
tags: 
  - recipe
  - iot
  - home security
  - diy
---

#Setting up your security system {#setup}

The following documentation will guide you through how to build an IoT Security system using Zetta.

##Contents

* [Materials](#materials)
* [Following this tutorial](#following-this-tutorial)
* [Getting help](#getting-help)
* [Glossary](#glossary)
* Steps in This Tutorial
  1. [The Piezo Element](#the-piezo-element)
  2. [The Microphone Sensor](#the-microphone-sensor)
  3. [The PIR Motion Detector](#the-pir-motion-detector)
  4. [The WeMo Actuator](#the-wemo-actuator)
  5. [Writing Your Own Driver](#writing-your-own-driver)
  6. [Next Steps](#next-steps)

###Materials

<script src="https://www.sparkfun.com/wish_lists/95647.js"></script>

###Following this tutorial

The steps of the tutorial are broken out by component of the security system. It'll be important to follow the steps in order to ensure your circuitry is built correctly, and fits properly on the breadboard.

###Getting Help

If you're going through this project, and run into an issue feel free to use these methods to reach out and contact us!

* matt@apigee.com
* https://groups.google.com/forum/#!forum/zetta-discuss
* https://github.com/zettajs/zetta/issues
* Reference Documentation: http://zettajs.github.io/

###Glossary

We may end up using some terms that are new to you. Here are their quick definitions and where to find out more about them.

[Actuator](http://en.wikipedia.org/wiki/Actuator) 
: a type of motor that is responsible for moving or controlling a mechanism or system.

[Sensor](http://en.wikipedia.org/wiki/Sensor)
: a device that detects events or changes in quantities and provides a corresponding output.

Driver
: the Zetta representation of a device. It includes a Scout for finding the physical device, and a driver for interacting with the device via javascript.

Scout
: responsible for searching for a physical device, and alerting Zetta to it's existence.

### Final Hookup Diagram

![Hookup Diagram](/images/recipes/hookup_diagram_final.png)

#The Piezo Element

The piezo element is a key piece of our IoT security system. It will let out a loud buzz that will function as our sound component to the alarm.
This element will get us going with the basics of Zetta. This step will have us dealing with `npm` and `drivers` in Zetta.
Drivers are a key component of Zetta, and will be the building blocks of your IoT app. They represent real world devices in software,
and follow a state machine model. Drivers are distributed and used in the form of Node.js packages on NPM.


##Contents

1. Circuit
2. Retrieving Driver
3. Adding code to Server
4. API and Browser

###Circuit

Here is a simple fritzing diagram of what your circuit will look like on the BeagleBone Black.

![Hookup Diagram](/images/recipes/hookup_diagram_step_1.png)

###Retrieving Driver

Drivers in Zetta are distributed through NPM the Node Package Manager. It's a tool that is automatically distributed
with node.js and makes dependency management a breeze. To retrieve our package you'll want to use the command line and
type `npm install zetta-buzzer-bonescript-driver`. This will automatically fetch the package off NPM and ensure all
dependencies are met.

The driver you just downloaded represents a piezo element in software. It's state machine is comprised of the `on`, `off` states. When `on` it will
turn the buzzer on, and when `off` it will turn the buzzer off. The changes in state are represented by transitions. Transitions are functions in
Zetta that are called when the state of an object changes. Our piezo element has `on`, `off`, and `beep` as transitions. `on` and `off` change to
their corresponding states, and `beep` will swap the state between `on` and `off` creating an alarm effect.

**TIP**: Ensure you install while on the BeagleBone operating system. The package
installation will fail if you use your native OS.

**TIP**: Every module you'll use in this tutorial is open source. This one can be found here https://github.com/zettajs/zetta-buzzer-bonescript-driver.

###Adding code to Server

Now it's time to actually wire up our Zetta driver into the server node. Below is a snippet we'll go through line by line.

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');

zetta()
  .use(Buzzer, 'P9_14')
  .listen(1337)
```

* The first line requires the Zetta package. This contains all the functionality needed to wire up an IoT app.
* The second line requires the driver for the piezo element.
* The third line initializes an instance of zetta for use in your code.
* The fourth line tells zetta that we want to use a piezo element hooked up to our BeagleBone Black.
* The fifth line tells zetta that we want our API server to listen at port `1337`

###API and Browser

In Zetta every device gets an API automatically generated for it. Our API will represent the device in it's current state,
and the actions that can be taken on it. We use a special hypermedia type known as [Siren](http://sirenspec.org/) to represent
our entities. Below is what a sample API response for your piezo module should look like.


```json
{
  "class": [
    "device"
  ],
  "properties": {
    "id": "18662cab-92b2-42d3-9e5e-1c0422da81f6",
    "pin": "P9_14",
    "type": "buzzer",
    "name": "Buzzer",
    "state": "off"
  },
  "actions": [
    {
      "name": "beep",
      "method": "POST",
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/18662cab-92b2-42d3-9e5e-1c0422da81f6",
      "fields": [
        {
          "name": "action",
          "type": "hidden",
          "value": "beep"
        }
      ]
    },
    {
      "name": "turn-on",
      "method": "POST",
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/18662cab-92b2-42d3-9e5e-1c0422da81f6",
      "fields": [
        {
          "name": "action",
          "type": "hidden",
          "value": "turn-on"
        }
      ]
    }
  ],
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/18662cab-92b2-42d3-9e5e-1c0422da81f6"
    },
    {
      "title": "beaglebone",
      "rel": [
        "up",
        "http://rels.zettajs.io/server"
      ],
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19"
    },
    {
      "title": "state",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/events?topic=buzzer%2F18662cab-92b2-42d3-9e5e-1c0422da81f6%2Fstate"
    },
    {
      "title": "logs",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/events?topic=buzzer%2F18662cab-92b2-42d3-9e5e-1c0422da81f6%2Flogs"
    }
  ]
}
```

A device in zetta has three different pieces of information attached to it in the API.

* `properties` are information on the object. Most of this is user defined.
  * `type` is defined by the driver. It lets Zetta know what kind of device is represented in the API.
  * `id` is a unique identifier that Zetta generates for you.
  * `name` is a unique identifier that can be determined by you in the driver. For now we hard coded it to `"Buzzer"`.
* `actions` are the specific actions that can be taken on the object. We outline any parameters needed, and what kind of HTTP call must be made to trigger the action.
* `links` are different pieces of context around the object. They can be websocket links leading to sensor readings or links back to the parent server of where the object lives.


#The Microphone sensor

Next up is our microphone sensor. This will detect sound of possible intruders, and serve as another characterisitic that
we can use to trigger our alarm. This section you'll learn about streaming sensor data values, and taking advantage of
those readings in your Zetta app.

##Contents

1. Circuit
2. Retrieving Driver
3. Adding code to Server
4. Adding to your app
5. API and Browser

###Circuit

Here is a simple fritzing diagram of what your circuit will look like on the BeagleBone Black.

![Hookup Diagram](/images/recipes/hookup_diagram_step_3.png)

###Retrieving Driver

Again we'll use the npm command to install our driver. Type `npm install zetta-microphone-bonescript-driver --save`. This will install our driver for us.


**TIP**: Ensure you install while on the BeagleBone operating system. The package
installation will fail if you use your native OS.

**TIP**: Every module you'll use in this tutorial is open source. This one can be found here https://github.com/zettajs/zetta-microphone-bonescript-driver.

###Adding code to Server

Now it's time to actually wire up our Zetta driver into the server node.

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');
var Microphone = require('zetta-microphone-bonescript-driver');

zetta()
  .use(Buzzer)
  .use(Microphone)
  .listen(1337)
```

* Here we've updated our code to let Zetta know that we want to use our Microphone sensor to detect sound.

###Creating your first app

Next we'll want to wire up interactions in Zetta. This is done with apps. Apps are just simple code snippets that wait for devices to come online.
After devices come online we then orchestrate interactions between devices.


```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var microphoneQuery = server.where({type: 'microphone'});

  server.observe([buzzerQuery, microphoneQuery], function(buzzer, pir, microphone){
    var microphoneReading = 0;

    microphone.streams.volume.on('data', function(msg){
      if (msg.data > 10) {
        buzzer.call('turn-on', function() {});
      } else {
        buzzer.call('turn-off', function() {});
      }
    });

  });
}
```

* The first line is an export statement in node. This is so that we can keep our apps modular and separated from the rest of our code.
  * The `server` variable is an instance of Zetta. We can use functionality attached to it to search for devices.
* The second line is where we create our first query. Zetta uses query to look for devices, or wait for devices to come online that fill all the parameters given.
  * This particular query tells Zetta to retrieve the buzzer for us
* The third line is a query for our Microphone sensor.
* The fourth line is a call to the function `observe`. Zetta waits for devices that fit queries given in the first argument to come online, and then fires the callback.
  * We want the callback function to fire when `"buzzer"` and `"microphone"` devices come online.
  * The function passes in the state machines of the devices in as individual arguments.
* The fifth line listens for a `"data"` event to happen on a `"volume"` stream
* The sixth line will call the `"beep"` transition on the buzzer. If the data value is above `10`

After you write this code you need to make sure the app is included in your server file. Update your server to look like so.

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');
var Microphone = require('zetta-microphone-bonescript-driver');

var app = require('./apps/app');

zetta()
  .use(Buzzer)
  .use(Microphone)
  .load(app)
  .listen(1337)
```

The `load` function lets Zetta know that we have a particular app we want it to use. Run your code, and you should have an interaction happening when your sensor detects motion!


###API and Browser

Below is a sample API response for our microphone.

```json
{
  "class": [
    "device"
  ],
  "properties": {
    "id": "5637ad21-9530-49f3-a819-14ccd12904ae",
    "pin": "P9_36",
    "type": "microphone",
    "name": "Microphone",
    "volume": 1.055
  },
  "actions": null,
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/5637ad21-9530-49f3-a819-14ccd12904ae"
    },
    {
      "title": "beaglebone",
      "rel": [
        "up",
        "http://rels.zettajs.io/server"
      ],
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19"
    },
    {
      "title": "volume",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/events?topic=microphone%2F5637ad21-9530-49f3-a819-14ccd12904ae%2Fvolume"
    },
    {
      "title": "logs",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/events?topic=microphone%2F5637ad21-9530-49f3-a819-14ccd12904ae%2Flogs"
    }
  ]
}

```

* The important difference between the device, and the others we've already used is that we include a link to monitor sensor readings over websockets.
  * Zetta makes it easy to get real time sensor readings quickly

#The PIR motion detector

The PIR sensor is used to detect motion, and will be a critical sensor needed for our security system. We'll install
the driver for this sensor through npm, and wire up an app that will have our buzzer sound off when motion detected.

##Contents

1. Circuit
2. Retrieving Driver
3. Adding code to Server
4. Creating your first app
5. API and Browser

###Circuit

Here is a simple fritzing diagram of what your circuit will look like on the BeagleBone Black.

![Hookup Diagram](/images/recipes/hookup_diagram_step_2.png)

###Retrieving Driver

Again we'll use the npm command to install our driver. Type `npm install zetta-pir-bonescript-driver --save`. This will install our driver for us.


**TIP**: Ensure you install while on the BeagleBone operating system. The package
installation will fail if you use your native OS.

**TIP**: Every module you'll use in this tutorial is open source. This one can be found here https://github.com/zettajs/zetta-pir-bonescript-driver.

###Adding code to Server

Now it's time to actually wire up our Zetta driver into the server node. Below is a snippet we'll go through line by line.

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');
var Microphone = require('zetta-microphone-bonescript-driver');
var PIR = require('zetta-pir-bonescript-driver');
var app = require('./apps/app');

zetta()
  .use(Buzzer)
  .use(Microphone)
  .use(PIR, 'P9_12')
  .load(app)
  .listen(1337)
```

* Here we've updated our code to let Zetta know that we want to use our PIR sensor to detect motion.
* We've passed in the exact pin on the BeagleBone Black that is required to work on the sensor. It's just additional arguments on the `use()` function.

###Updating your first app

Now we'll wire up our sound sensor into our app.

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var pirQuery = server.where({type: 'pir'});
  var microphoneQuery = server.where({type: 'microphone'});

  server.observe([buzzerQuery, pirQuery, microphoneQuery], function(buzzer, pir, microphone){
    var microphoneReading = 0;

    microphone.streams.volume.on('data', function(msg){
      if (msg.data > 10) {
        if (pir.state === 'motion') {
          buzzer.call('turn-on', function() {});
        } else {
          buzzer.call('turn-off', function() {});
        }
      }
    });

    pir.on('no-motion', function() {
      buzzer.call('turn-off', function() {});
    });

  });
}
```

* We've updated our app code to include the new PIR device we've added.
* We'll now check for movement along with our sound code. If movement is detected we'll trigger the buzzer.

###API and Browser

Below is what a sample API response for your PIR module should look like. Only devices are exposed over the API by Zetta. Your apps are internal to your
IoT system.


```json
{
  "class": [
    "device"
  ],
  "properties": {
    "id": "b8622d08-8721-41f5-8ebc-706e17e8818a",
    "pin": "P9_12",
    "type": "pir",
    "name": "PIR Sensor",
    "state": "no-motion"
  },
  "actions": [
    {
      "name": "motion",
      "method": "POST",
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/b8622d08-8721-41f5-8ebc-706e17e8818a",
      "fields": [
        {
          "name": "action",
          "type": "hidden",
          "value": "motion"
        }
      ]
    }
  ],
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/b8622d08-8721-41f5-8ebc-706e17e8818a"
    },
    {
      "title": "beaglebone",
      "rel": [
        "up",
        "http://rels.zettajs.io/server"
      ],
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19"
    },
    {
      "title": "state",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/events?topic=pir%2Fb8622d08-8721-41f5-8ebc-706e17e8818a%2Fstate"
    },
    {
      "title": "logs",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/events?topic=pir%2Fb8622d08-8721-41f5-8ebc-706e17e8818a%2Flogs"
    }
  ]
}
```

#The WeMo Actuator

The WeMo is an off the shelf consumer device. If there is a way to interact with a device in Node.js we can use it in Zetta. We'll


##Contents

1. Circuit
2. Retrieving Driver
3. Adding code to Server
4. Adding to your app
5. API and Browser

###Circuit

No circuit will be required! Here we'll use an off the shelf consumer device in our Zetta app.

###Retrieving Driver

Again we'll use the npm command to install our driver. Type `npm install zetta-wemo-driver --save`. This will install our driver for us.

**TIP**: Every module you'll use in this tutorial is open source. This one can be found here https://github.com/zettajs/zetta-wemo-driver.

###Adding code to Server

Now it's time to actually wire up our Zetta driver into the server node.

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');
var PIR = require('zetta-pir-bonescript-driver');
var Microphone = require('zetta-microphone-bonescript-driver');
var WeMo = require('zetta-wemo-driver');


var app = require('./apps/app');

zetta()
  .use(Buzzer, 'P9_14')
  .use(PIR, 'P9_12')
  .use(Microphone, 'P9_36')
  .use(WeMo)
  .load(app)
  .listen(1337)
```

* Here we've updated our code to let Zetta know that we want to use our WeMo.

###Creating your first app

Now we'll wire up our sound sensor into our app.

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var pirQuery = server.where({type: 'pir'});
  var microphoneQuery = server.where({type: 'microphone'});
  var wemoQuery = server.where({type: 'wemo'});

  server.observe([buzzerQuery, pirQuery, microphoneQuery, wemoQuery], function(buzzer, pir, microphone, wemo){
    var microphoneReading = 0;

    microphone.streams.volume.on('data', function(msg){
      if (msg.data > 10) {
        if (pir.state === 'motion') {
          buzzer.call('turn-on', function() {});
          wemo.call('turn-on', function(){});
        } else {
          buzzer.call('turn-off', function() {});
          wemo.call('turn-off', function(){});
        }
      }
    });

    pir.on('no-motion', function() {
      buzzer.call('turn-off', function() {});
      wemo.call('turn-off', function(){});
    });

  });
}
```

* We've updated our app to listen for a wemo to also come online.
* We've also updated the app to turn on the WeMo

###API and Browser

Below is a sample API response for our WeMo.

```json
{FILL_IN:"SOON!"}
```

#Writing your own driver

This next section will take you through writing your own driver. Drivers use a state machine model to represent devices in
Zetta. Being able to write your own drivers in Zetta will be key to expanding your IoT system to include any devices
that you want.

##Contents

1. Getting started
2. Create a basic scout
3. State machine for an LED
4. Writing our driver
5. Incorporating our driver into Zetta
6. Sample API response

###Getting Started

In Zetta drivers are usually broken into two pieces. The first being the state machine itself, and the second being a
scout. Scouts search for devices that could be attached to your hub via any number of protocols. They then announce
the presence of the device to Zetta. For now we won't worry about creating the scout for our driver we'll install that
component off of npm. Use `npm install zetta-led-bonscript-scout --save` to retrieve it off of npm.

Next we'll want to setup the directory where our driver will be located. In your project you should already have a `/devices` directory.
In there create a folder called `LED`. This folder will contain two files. One for your scout called `index.js`, and the other for your state machine called `led_driver.js`.
In the next section we'll cover what it takes to setup our scout. However, you should end this section of the tutorial
with a file structure that looks like so:

+ `/zetta-security-system`
  + `/apps`
    + `app.js`
  + `/devices`
    + `/led`
      + `index.js`
      + `led_driver.js`
  + `server.js`
  + `package.json`

###Create a basic scout

Our scouting logic is unique for this particular app. We set one up ahead of time for you. Your `index.js` file should only contain this
one line for your scout.

```javascript
var LED = require('./led_driver.js');
var Scout = require('zetta-auto-scout');
module.exports = new AutoScout('led', LED);
```

That will export your scout for use in Zetta.

###State machine for an LED

Next we'll create our state machine for use in Zetta. Our LED state machine will be basic. Drawing it out with state machine notation helps.
It should look a little like this.

![state machine](/images/recipes/state_machine.png)

As you can see from the diagram. When our LED is `off` it can only transition to the `on` state, and conversely when the state is `on` it can only transition to `off`.

###Writing our driver

Below is the code for our driver. We'll go through it line by line.

```javascript
var Device = require('zetta').Device;
var util = require('util');
var bone = require('bonescript');

var Led = module.exports = function(pin) {
  Device.call(this);
  this.pin = "P9_41";
  //Everything is off to start
  bone.pinMode(this.pin, bone.OUTPUT);
  bone.digitalWrite(this.pin, 0);
};
util.inherits(Led, Device);

Led.prototype.init = function(config) {
  config
    .state('off')
    .type('led')
    .name('LED')
    .when('on', { allow: ['turn-off', 'toggle'] })
    .when('off', { allow: ['turn-on', 'toggle'] })
    .map('turn-on', this.turnOn)
    .map('turn-off', this.turnOff)
    .map('toggle', this.toggle);
};

Led.prototype.turnOn = function(cb) {
  var self = this;
  bone.digitalWrite(this.pin, 1, function() {
    self.state = 'on';
    cb();
  });
};

Led.prototype.turnOff = function(cb) {
  var self = this;
  bone.digitalWrite(this.pin, 1, function() {
    self.state = 'off';
    cb();
  });
};

Led.prototype.toggle = function(cb) {
  if (this.state === 'on') {
    this.call('turn-off', cb);
  } else {
    this.call('turn-on', cb);
  }
};
```

* First we'll require all the necessary libraries we'll need
  * We'll need the Device class to create our driver
  * We'll need the util module for inheritance functionality
  * We'll need bonescript for actually interacting with hardware on the beaglebone
* The first thing we'll do is setup the constructor for our LED. Here you set parameters and initialize different things about the device.
  * We setup to inherit from the Device class to get functionality for API generation.
  * **TIP**: Any property on your javascript class that doesn't include an _ will be exposed by the API.
* Next we'll implement the init function. This is where you'll implement your state machine.
  * `state` sets the initial state of your device. We're starting in the off state
  * `type` sets what the type of the device is. In our case it's `led`.
  * `name` sets a human readable name for our device. It's an optional parameter.
  * `when` sets up what transitions are available based on the state of the device.
    * `when` our device is in state `"on"` it can only use the `"off"` transition
    * `when` our device is in state `"off"` it can only use the `"on"` transition
  * `map` will setup the functions that will be called for particular transitions. Whenever a transition occurs the function it is mapped to will be called.
    * when the `"on"` transition is called we will call the `turnOn` function of this particular class
    * when the `"off"` transition is called we will call the `turnOff` function of this particular class
  * `turnOn` will actually turn on the LED on the BeagleBone. It is provided a callback that you should call once the transition has completed.
  * `turnOff` will actually turn off the LED on the BeagleBone. It is provided a callback that you should call once the transition has completed.

###Incorporating our driver into Zetta

To wire up our custom device to the server is easy. We simply require the scout module and pass it in with the `use` function. Similar to the modules we've already used.

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');
var PIR = require('zetta-pir-bonescript-driver');
var Microphone = require('zetta-microphone-bonescript-driver');
var WeMo = require('zetta-wemo-driver');
var AutoScout = require('zetta-auto-scout');
var LED = require('./devices/LED');

var app = require('./apps/app');

zetta()
  .use(Buzzer, 'P9_14')
  .use(PIR, 'P9_12')
  .use(Microphone, 'P9_36')
  .use(WeMo)
  .use(LED)
  .load(app)
  .listen(1337)
```

Our app doesn't change much either. Simply add another query that looks for a device with type of `"led"` and add it into the currently orchestrated interactions.

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var pirQuery = server.where({type: 'pir'});
  var microphoneQuery = server.where({type: 'microphone'});
  var wemoQuery = server.where({type: 'wemo'});
  var ledQuery = server.where({type: 'led'});

  server.observe([buzzerQuery, pirQuery, microphoneQuery, wemoQuery, ledQuery], function(buzzer, pir, microphone, wemo, led){
    var microphoneReading = 0;

    microphone.streams.volume.on('data', function(msg){
      if (msg.data > 10) {
        if (pir.state === 'motion') {
          buzzer.call('turn-on', function() {});
          wemo.call('turn-on', function(){});
          led.call('turn-on', function(){});
        } else {
          buzzer.call('turn-off', function() {});
          wemo.call('turn-off', function(){});
          led.call('turn-off', function(){});
        }
      }
    });

    pir.on('no-motion', function() {
      buzzer.call('turn-off', function() {});
      wemo.call('turn-off', function(){});
      led.call('turn-off', function(){});
    });

  });
}
```

###Sample API response

```json
{
  "class": [
    "device"
  ],
  "properties": {
    "id": "e478ee7f-ebc6-42c5-a4d4-1128845bdbe8",
    "pin": "P9_15",
    "type": "led",
    "name": "LED",
    "state": "off"
  },
  "actions": [
    {
      "name": "turn-on",
      "method": "POST",
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/e478ee7f-ebc6-42c5-a4d4-1128845bdbe8",
      "fields": [
        {
          "name": "action",
          "type": "hidden",
          "value": "turn-on"
        }
      ]
    },
    {
      "name": "toggle",
      "method": "POST",
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/e478ee7f-ebc6-42c5-a4d4-1128845bdbe8",
      "fields": [
        {
          "name": "action",
          "type": "hidden",
          "value": "toggle"
        }
      ]
    }
  ],
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/e478ee7f-ebc6-42c5-a4d4-1128845bdbe8"
    },
    {
      "title": "beaglebone",
      "rel": [
        "up",
        "http://rels.zettajs.io/server"
      ],
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19"
    },
    {
      "title": "state",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/events?topic=led%2Fe478ee7f-ebc6-42c5-a4d4-1128845bdbe8%2Fstate"
    },
    {
      "title": "logs",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/events?topic=led%2Fe478ee7f-ebc6-42c5-a4d4-1128845bdbe8%2Flogs"
    }
  ]
}
```

### Hookup Diagram

![Hookup Diagram](/images/recipes/hookup_diagram_step_5.png)

#Next Steps

1. Wire up our Twilio Driver to send a text message when the movement is detected!
2. Build an app to consume your new API!
