---
layout: reference
title: Zetta-device Reference Docs
author: Adam Magaluk
description: Reference docs for zetta-device
---

#### Class: Zetta.Device

This is a zetta device modeled in software. With zetta you can create state machines for all of your devices that conditionally allow functionality to be exposed based on the `state` property.
You should inherit from this class and implement the init function `require('zetta').Device`.

```js
var util = require('util');
var Driver = require('zetta').Device;

function DeviceDriver(){
  Driver.call(this);
}
util.inherits(DeviceDriver, Driver);
```

##### Property: Device#state

This is the current state of your device modeled in software.

##### Method: Device#init(config)

* `config` DeviceConfig

This method should be implemented by you. The argument `config` is a configuration object that will allow you to setup your state machine, name your object, and give it a type.

```js
DeviceDriver.prototype.init = function(config) {
  config
    .type('device')
    .state('on')
    .name('CoolDevice')
};

```

##### Method: DeviceConfig#when(state, options)

* `state` String
*  `options` Object

The `when` method on device config allows you to set what transitions are available in a particular state. The first argument of state should be a valid
state for the object, and the second takes an options object with a property called `allow` where you can define the available transitions for the state.

```js
DeviceDriver.prototype.init = function(config) {
  config
    .when('on', {allow: ['off']})
};
```

This method will conditionally set available transitions for your state machine based on the `state` property.

##### Method: DeviceConfig#map(transition, func, [options])

* `transition` String
* `func` Function
* `options` Array of Object

This method allows you to map transitions to functions. Whenever a transition is called on a state machine the corresponding function will be executed. The
`options` array is where inputs to the transition are defined.

```js
DeviceDriver.prototype.init = function(config) {
  config
    .map('on', this.turnOn);
    .map('strobe', this.strobe, [{name:'amount', type:'number'}])
};

DeviceDriver.prototype.turnOn = function(cb) {

};

DeviceDriver.prototype.strobe = function(amount, cb ){

};
```

##### Method: DeviceConfig#stream(name, func, [options])

* `name` String
* `func` Function
* `options` Object

`stream` will allow for setting up streaming data out of zetta. The first argument `name` is to identify the stream, the second argument `func` is a callback function
that is executed to provide a user with a stream. The third argument `options` will allow a user to define the type of stream to be created `object` or `binary`

```js
DeviceDriver.prototype.init = function(config) {
  config
    .stream('value', this.streamValue);
};

DeviceDriver.prototype.streamValue = function(stream) {
  setInterval(function(){
    stream.write(Math.random());
  }, 3000);
}
```


##### Method: DeviceConfig#monitor(name)

* `name` String

Stream a property from your device instance out of zetta. Zetta will monitor the property for changes, and if they occur will publish an event down the stream.

```js
function DeviceDriver() {
  this.blah = 0;
}

DeviceDriver.prototype.init = function(config) {
  config
    .monitor('blah');
}
```

##### Method: DeviceConfig#remoteFetch(handler)

* `handler` Function


By default all properties on the device are returned to the API except properties with a leading underscore and properties with the type functions.

Remote fetch takes a handler that is called when the device properties are returned to the API or Zetta to Zetta protocols. You can use this handler to configure what is sent to the API. `name`, `id` and `type` are automatically appended the object returned. Any properties with a leading underscore will be filtered. For example the following device will only return `blah` and `other` properties to the API along with `name`, `id` and `type`.

```js
function DeviceDriver() {
  this.authToken = 'abc123';
  this.blah = 25;
}

DeviceDriver.prototype.init = function(config) {
  config
    .name('some device')
    .monitor('blah')
    .remoteFetch(function() {
      return {
        blah: this.blah,
        other: 'some other property'
      };
    });
}

```

##### Method: DeviceConfig#remoteUpdate(handler)

* `handler` Function

By default when a PUT is made to a device resource on the API zetta updates the device by updating the internal properties to the payload supplied in the request and removing any that did not exist.

Remote update takes a handler function that can be used to alter this functionality. You can manually select which properties can be updated remotely and provide extra validation.

```js
function DeviceDriver() {
  this.macAddress = '00-14-22-01-23-45';
  this.location = 'Kitchen';
}

DeviceDriver.prototype.init = function(config) {
  config
    .name('Light Bulb One')
    .remoteUpdate(function(properties, cb) {
      var self = this;
      // ensure remote update does not change macAddress
      delete properties['macAddress'];

      // update existing properties
      Object.keys(properties).forEach(function(key) {
        self[key] = properties[key];
      });

      // must manually call save to store in db.
      this.save(cb);
    });
}

```


##### Method: Device#call(name, [arguments])

This method will call a transition on your state machine.
