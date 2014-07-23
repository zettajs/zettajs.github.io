---
layout: doc
---

####Class: Zetta

This is the base module for Zetta. It is accessed by using `require('zetta')` in node. This class exposes functionality
for standing up your Zetta server, and linking to the cloud.

#####Method: name(name)

* `name` String

Give your zetta instance a human readable name. This will be exposed in the API using the `name` property.

```
var zetta = require('zetta');

var server = zetta();

server.name('detroit');

```

#####Method: use(constructor, [args], [options])

* `constructor` Function
* `[args]` list of arguments
* `[options]` Object


Load a device driver into Zetta. These can be custom drivers that you've written, or drivers retrieved from npm.

```
var zetta = require('zetta');
var arduino = require('arduino');

var server = zetta();
server.use(arduino)

```
#####Method: expose(query)

* `query` Query

Conditionally expose devices. Use the `'*'` flag to expose all devices via HTTP API by default.

```
var zetta = require('zetta');

var server = zetta();
server.expose('*');

```

#####Method: load(app)

* `app` Function

Load a zetta app from another module.

```
var zetta = require('zetta');
var myApp = require('./myapp.js');

var server = zetta();
server.load(myApp);
```

#####Method: link(host)

* `host` String or Array of Strings

Link to another Zetta instance. Typically this is used to link your local instance of Zetta to the cloud.

```
var zetta = require('zetta');

var server = zetta();
server.link('http://zettajs.io/cloud');
```

#####Method: listen(port, [ip])

* `port` Number
* `ip` String

Select which port your instance of Zetta will listen on locally.

```
var zetta = require('zetta');

var server = zetta();
server.listen(3000);

```

#####Method: where(options)

* `options` Object

Generate a query for use inside zetta. All options properties are &&'d together.

```
var zetta = require('zetta');

var query = zetta.where({foo: 'bar'});
```

#####Method: observe(queries, cb)

* `queries` Array of Query
* `cb` Function

Wait for devices to come online. Execute the callback when all devices conforming to queries have come online.

```
var zetta = require('zetta');

zetta.observe(['sound'], function(sound){

});

```
