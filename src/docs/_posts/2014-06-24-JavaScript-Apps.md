---
layout: doc
---

Zetta apps are exported module functions, and differ from Drivers and Scouts.

```
module.exports = function(server) {
  var arduinoQuery = server.where({type: 'arduino'});
  server.observe([arduinoQuery], function(arduino){
    //Work with arduino!
  });
}
```

#####Exported Module - function(server)

* `server` Server


#####Method: Server#where(options)

* `options` Object

Generate a query for use inside zetta. All options properties are &&'d together.

```
var zetta = require('zetta');

var query = zetta.where({foo: 'bar'});
```

#####Method: Server#observe(queries, cb)

* `queries` Array of Query
* `cb` Function

Wait for devices to come online. Execute the callback when all devices conforming to queries have come online.

```
var zetta = require('zetta');

zetta.observe(['sound'], function(sound){

});

```
