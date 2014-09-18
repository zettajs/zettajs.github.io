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

![state machine](../docs/img/state_machine.png)

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

![Hookup Diagram](img/hookup_diagram_step_5.png)
