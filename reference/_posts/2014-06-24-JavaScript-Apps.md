---
layout: reference
title: Zetta Apps Reference Docs
author: Adam Magaluk
description: Reference docs for zetta apps
---

### Zetta JavaScript Apps

Zetta apps are exported module functions, and differ from Drivers and Scouts.

```js
module.exports = function(server) {
  var arduinoQuery = server.where({type: 'arduino'});
  server.observe([arduinoQuery], function(arduino){
    //Work with arduino!
  });
}
```

##### Exported Module - function(server)

* `server` Server


##### Method: Server#where(query)

* `query` Object

Generate a query for use inside zetta. All options properties are &&'d together.

```js
var query = server.where({foo: 'bar'});
```

##### Method: Server#observe(queries, cb)

* `queries` Array of Query
* `cb` Function

Wait for devices to come online. Execute the callback when all devices conforming to queries have come online.

```js

var queryFoo = server.where({type: 'foo'});
var queryBar = server.where({type: 'bar'});

server.observe([queryFoo, queryBar], function(foo, bar){

});

```
