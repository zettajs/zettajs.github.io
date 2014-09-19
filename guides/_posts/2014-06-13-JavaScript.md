---
layout: guide
---

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
