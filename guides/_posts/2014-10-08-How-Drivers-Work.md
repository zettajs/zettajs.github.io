---
layout: guide
title: Anatomy of a Zetta Driver 
description: >
  This guide will take you through the components of a Zetta Driver
---

> This article could use your help. 

## Writing The Driver

Let's create our state machine for use in Zetta. When drawn out with state machine notation, our LED should look a little like this:

![LED State Machine](/images/recipes/security_system/state_machine.png){:.zoom}

According to the diagram when our LED is `off` it can only transition to the `on` state, and conversely when the state is `on` it can only transition to `off`.

Our driver will have 4 major parts, all dictated by Zetta:

  * Dependencies
  * The constructor function
  * An init function to define our state machine
  * Transition functions

## Dependencies

First we'll require all the necessary libraries

  * We'll need the Device class to create our driver
  * We'll need the util module for inheritance functionality
  * We'll need bonescript for actually interacting with hardware on the BeagleBone

Add this to your empty `/devices/led/index.js` file:

```javascript
var Device = require('zetta-device');
var util = require('util');
var bone = require('bonescript');
```

## The Constructor Function

Now we'll setup the constructor for our LED. Here you set parameters and initialize different things about the device. 

Continue by adding this code to your `/devices/led/index.js` file:

```javascript
var Led = module.exports = function(pin) {
  Device.call(this);
  this.pin = pin || 'P9_41';
};

util.inherits(Led, Device);
```

* Line 3 tells the driver to use the pin you specify in `.use()` function in `server.js`, or uses the default of **P9_41**
* On line 6, we inherit from the `Device` class with `util.inherits()` to get functionality for API generation. 


## An Init Function to Define our State Machine

Next we'll implement the init function. This is where you'll implement your state machine.

* `.state()` sets the initial state of your device. We're starting in the **off** state
* `.type()` sets what the type of the device is. In our case it's `led`.
* `.name()` sets a human readable name for our device. It's an optional parameter.
* `.when()` sets up what transitions are available based on the state of the device.
  * `when` our device is in state `"on"` it can only use the `"turn-off"` and `"toggle"` transitions
  * `when` our device is in state `"off"` it can only use the `"on"` and `"toggle"` transitions
* `.map()` will setup the functions that will be called for particular transitions. Whenever a transition occurs the function it is mapped to will be called.
  * when the `"on"` transition is called we will call the `turnOn` function of this particular class
  * when the `"off"` transition is called we will call the `turnOff` function of this particular class
  * when the `"toggle"` transition is called we will call the `function` function of this particular class

Continue by adding this code to your `/devices/led/index.js` file:

```javascript
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

  //Everything is off to start
  bone.pinMode(this.pin, bone.OUTPUT);
  bone.digitalWrite(this.pin, 0);
};
```

> **TIP**
> Any setup you have to do for your device (such as line 14, which turns the LED off by default) should go inside it's init function, not the constructor

## Transition Functions

Finish up by adding the transition functions.

* `turnOn` will actually turn on the LED on the BeagleBone. It is provided a callback that you should call once the transition has completed.
* `turnOff` will actually turn off the LED on the BeagleBone. It is provided a callback that you should call once the transition has completed.
* `toggle` will change the led to **off** if it is currently **on**, or **on** if it is currently **off**. It is provided a callback that you should call once the transition has completed.

Your final `/devices/led/index.js` file should look like this:

```javascript
var Device = require('zetta').Device;
var util = require('util');
var bone = require('bonescript');

var Led = module.exports = function(pin) {
  Device.call(this);
  this.pin = "P9_41";
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

  //Everything is off to start
  bone.pinMode(this.pin, bone.OUTPUT);
  bone.digitalWrite(this.pin, 0);
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
  bone.digitalWrite(this.pin, 0, function() {
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
