---
layout: guide
---

#### Class: Zetta.Device

This is a zetta device modeled in software. With zetta you can create state machines for all of your devices that conditionally allow functionality to be exposed based on the `state` property.
You should inherit from this class and implement the init function `require('zetta-device');` or `require('zetta').Device;`.

```js
var util = require('util');
var Device = require('zetta-device');

function MyDevice(){
  Device.call(this);
}
util.inherits(MyDevice, Device);
```

##### Property: Device#state

This is the current state of your device modeled in software.

##### Method: Device#init(config)

* `config` DeviceConfig

This method should be implemented by you. The argument `config` is a configuration object that will allow you to setup your state machine, name your object, and give it a type.

```js
MyDevice.prototype.init = function(config) {
  config
    .type('device')
    .state('on')
    .name('CoolDevice')
};

```

##### Method: Device#available(transition)

* `transition` String

Check if a transition is available for use on the current device.

```js
if(device.available('turn-on')) {
  //turn-on transition available
}
```

##### Method: Device#call(name, [arguments...], callback)

* `name` String
* `arguments` Arguments for the transition.
* `callback` Function

This method will call a transition on your state machine. You supply a splat fo additional arguments if required by the implementation of the particular transition. An optional callback can be provided as well. Callback is called once the state transition is complete.

```js
device.call('change-color', '#FF0000', function(err){
  if(err) {
    console.log('Color change error');
  }
});
```

##### Method: Device#save

Save the device in it's current state to the zetta device registry.

```js
device.save();
```

##### Method: Device#createReadStream(name)

* `name` String

Create an instance of a readable stream of values from the `name` of the stream.

```js
var volumeStream = microphone.createReadStream('volume');
```



##### Method: DeviceConfig#when(state, options)

* `state` String
*  `options` Object

The `when` method on device config allows you to set what transitions are available in a particular state. The first argument of state should be a valid
state for the object, and the second takes an options object with a property called `allow` where you can define the available transitions for the state.

```js
MyDevice.prototype.init = function(config) {
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
MyDevice.prototype.init = function(config) {
  config
    .map('on', this.turnOn);
    .map('strobe', this.strobe, [{name:'amount', type:'number'}])
};

MyDevice.prototype.turnOn = function(cb) {

};

MyDevice.prototype.strobe = function(amount, cb ){

};
```

##### Method: DeviceConfig#stream(name, func, [options])

* `name` String
* `func` Function
* `options` Object

`stream` will allow for setting up streaming data out of zetta. The first argument `name` is to identify the stream, the second argument `func` is a callback function
that is executed to provide a user with a stream. The third argument `options` will allow a user to define the type of stream to be created `object` or `binary`

```js
MyDevice.prototype.init = function(config) {
  config
    .stream('value', this.streamValue);
};

MyDevice.prototype.streamValue = function(stream) {
  setInterval(function(){
    stream.write(Math.random());
  }, 3000);
}
```


##### Method: DeviceConfig#monitor(name)

* `name` String

Stream a property from your device instance out of zetta. Zetta will monitor the property for changes, and if they occur will publish an event down the stream.

```js
function MyDevice() {
  this.blah = 0;
}

MyDevice.prototype.init = function(config) {
  config
    .monitor('blah');
}
```
