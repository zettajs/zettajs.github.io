---
layout: guide
---

#### Class: Zetta.Scout

This is a class you inherit from when writing custom device drivers. Scouts are used to search for devices with external node modules, or protocols.
It's used by `require('zetta').Scout`. You must inherit from the `Scout` class when building custom Zetta modules.

```js
var util = require('util');
var Scout = require('zetta').Scout;

function DeviceScout(){
  Scout.call(this);
}
util.inherits(DeviceScout, Scout);
```


##### Method: Scout#init(func)

* `func` Function

This method should be implemented by you. This allows you to initialize any resources like bluetooth access, serial ports, or
vendor modules needed to look for devices. The argument `func` is provided, and must be called after scouting has started.

```js

DeviceScout.prototype.init = function(next) {
  var connection = Serial.connect(function(){
  });

  connection.on('start', function(){
    next();
  });
};

```

##### Method: Scout#discover(constructor, [arguments])

* `constructor` Subclass of Device
* `arguments` List of Objects

This method is called by you when you've found your device. The `constructor` argument should be a subclass of `Device`, and the second argument is a
list of objects to be used by the constructor.

```js
DeviceScout.prototype.init = function(next) {
  this.discover(DeviceDriver, foo, bar, 'baz');
};

```



##### Method: Scout#provision(deviceObject, constructor)

* `deviceObject` Object
* `constructor` Subclass of Device

Zetta will persist device data to an internal registry. Using an object retrieved from this registry you can initialize a device that Zetta already
knows about. The first argument `deviceObject` is just data on the object from Zetta. The `constructor` argument is what will be created by Zetta.

```js
DeviceScout.prototype.init = function(next) {
  var deviceObject = {
    name:'testObject',
    id: '123',
    foo: 'bar'
  };
  this.provision(deviceObject, DeviceDriver);
};
```

##### Property: Scout#server

This gives access to the zetta runtime. Here you can issue queries and lookup devices that Zetta already knows about.


```js
DeviceScout.prototype.init = function(next) {
  var self = this;

  // query registry for any device that has type led and an id that we know of.
  var query = this.server.where({ type: 'lcd', id: 'some-id' });
  this.server.find(query, function(err, results) {
    if (results.length > 0) {
      // found in registry, tell zetta it came online
      self.provision(results[0], DeviceDriver, foo, bar, 'baz');
    } else {
      // does not exist in registry, discover a new one.
      self.discover(DeviceDriver, foo, bar, 'baz');
    }
  });
};

```
