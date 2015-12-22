---
layout: reference
title: Zetta Reference Docs
author: Adam Magaluk
description: Reference docs for zetta
---

>Note: This topic has been relocated to the [Zetta doc wiki](https://github.com/zettajs/zetta/wiki/Zetta), the new home for all Zetta documentation. Please bookmark the [doc wiki](https://github.com/zettajs/zetta/wiki) for future reference. 

#### Class: Zetta

This is the base module for Zetta. It is accessed by using `require('zetta')` in node. This class exposes functionality
for standing up your Zetta server, and linking to the cloud.

##### Method: name(name)

* `name` String

Give your zetta instance a human readable name. This will be exposed in the API using the `name` property.

```js
var zetta = require('zetta');

zetta()
  .name('detroit');

```

##### Method: silent()

Suppress logging messages.

```js
var zetta = require('zetta');

zetta()
  .silent()
```

##### Method: logger(logFunction)

* `logFunction` Function

Implement a custom logger for Zetta.

```js
var zetta = require('zetta');

zetta()
  .logger(function(log) {
    log.on('message', function(level, event, msg, data) {
      //Intercept logging messages.  
    });
  })
```

##### Method: use(constructor, [args], [options])

* `constructor` Function
* `[args]` list of arguments
* `[options]` Object


Load a device driver into Zetta. These can be custom drivers that you've written, or drivers retrieved from npm.

```js
var zetta = require('zetta');
var arduino = require('arduino');

zetta()
  .use(arduino);

```

##### Method: load(app)

* `app` Function

Load a zetta app from another module.

```js
var zetta = require('zetta');
var myApp = require('./myapp.js');

zetta()
  .load(myApp);
```

##### Method: link(host)

* `host` String or Array of Strings

Link to another Zetta instance. Typically this is used to link your local instance of Zetta to the cloud.

```js
var zetta = require('zetta');

zetta();
  .link('http://zettajs.io/cloud');
```

##### Method: listen(port, [hostname], [callback])

* `port` Number
* `hostname` String
* `callback` Function

Select which port your instance of Zetta will listen on locally.

```js
var zetta = require('zetta');

zetta()
  .listen(3000, function(err) {
    console.log('Server listening on port 3000');
  });

```
