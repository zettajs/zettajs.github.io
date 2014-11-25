---
layout: guide
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

##### Method: Server#from(name)

* `name` String

Used as a modifier on a query. Specify a particular server to search for devices on.

```js
var query = server.from('Detroit').where({foo: 'bar'});
```

### Method: Server#ql(query)

* `query` String

Generate a query for use inside zetta. `query` is a CAQL query statement.

```js
var query = server.ql('where foo=bar');
```

##### Method: Server#query

Create an empty query object. The `where` and `ql` methods can be used on this object.

```js
var query = server.query();
query.where({foo: 'bar'});
```

##### Method: Server#log(message)

* `message` String

Generate a zetta formatted log message. Message will be sent to STDOUT.

```js
server.log('Hello there!');
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
