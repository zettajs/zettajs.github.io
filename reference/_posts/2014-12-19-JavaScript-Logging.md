---
layout: reference
title: Logging Reference Docs
description: Reference docs for logging within Zetta
---

#### Class: Zetta.Logger

The logger class gives Zetta developer access to printing nicely formatted messages to STDOUT or STDERR. You can also replace Zetta logging with a custom logger such as bunyan or winston.

The logger itself is accessible anywhere you would write code in Zetta. Below are examples on how to access Zetta logging from different types of files.

**Server**
```javascript
var server = zetta();
server.log();
```
**Device**
```javascript
MyDevice.prototype.init = function(config) {
  this.log();
};
```
**Scout**
```javascript
MyScout.prototype.init = function(next) {
  this.server.log();  
};
```
**App**
```javascript
module.exports = function(server) {
  server.log();  
};

```

##### Method: Logger#log(message, data)

* `message` String
* `data` Object

`log` will print a standard blue log message to the console output. `message` is the particular message to be printed, and data is any relevant accompanying data.

```javascript
server.log('Hello world', { 'hello': 'world' });
```

##### Method: Logger#info

* `message` String
* `data` Object

`info` will print a standard blue log message to the console output. `message` is the particular message to be printed, and data is any relevant accompanying data.

```javascript
server.info('Hello world', { 'hello': 'world' });
```
##### Method: Logger#warn

* `message` String
* `data` Object

`warn` will print a standard yellow log message to the console output. `message` is the particular message to be printed, and data is any relevant accompanying data.


```javascript
server.warn('Hello world', { 'hello': 'world' });
```
##### Method: Logger#error

* `message` String
* `data` Object

`error` will print a standard red log message to the console output. `message` is the particular message to be printed, and data is any relevant accompanying data.

```javascript
server.error('Hello world', { 'hello': 'world' });
```

##### Custom Logging

Zetta allows to setup log message interception for using custom loggers.

On the Zetta server use the `.logger()` function to set this up. An example is below.

```javascript
zetta()
  .logger(function(log) {
    //log is an event emitter
    
    log.on('message', function(level, event, msg, data) {
      //Fires for any log message  
    });  

    log.on('info', function(event, msg, data) {
      //info event  
    });

    log.on('warn', function(event, msg, data) {
      //warn event
    });

    log.on('error', function(event, msg, data) {
      //error event
    });
  })
```

##### Logging suppression

Zetta can also suppress logs using the `.silent()` method.

```javascript
//Logs no longer printed.
zetta()
  .silent()
  .listen(3000);
```
