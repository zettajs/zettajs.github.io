#Interactions

Zetta can also locally make devices interact with each other using simple javascript. In this part of our recipe we'll go over
how to use queries, interact with streams, and call actions on devices all in javascript.

##Contents

1. Creating an app
2. Adding the app to our server


###Creating an app

An app in Zetta is just a local orchestration between devices based on state or sensor readings. Today our app will search
for the heartbeat sensor, and turn the LED on or off based on the readings of data it is streaming.

First we'll need to add a file named `app.js` to our `apps/` folder. It's best practice in Zetta to keep these apps in their own
folder for organizational purposes.

After our app file is created we'll need to put the following code into it.

```javascript
module.exports = function(server) {
  var heartbeatQuery = server.where({type: 'heartbeat'});
  var ledQuery = server.where({type: 'led'});

  server.observe([heartbeatQuery, ledQuery], function(heartbeat, led){
    heartbeat.streams.pulse.on('data', function(message){
      if(message.data > 65) {
        led.call('turn-on', function(err) {
          if(err) {
            server.log('Can\'t use that transition');
          }
        });
      } else {
        led.call('turn-off', function(err) {
          if(err) {
            server.log('Can\'t use that transition');
          }
        });
      }
    });

  });
}
```

+ First we'll export our app as a function so it can be used by Zetta
  + Zetta will call this function with the single argument `server` passed in
  + `server` is what is used to access information about your Zetta server at runtime
+ Next we'll create two queries. The simplest way to do this is pass a javascript object into the `where()` function on this server.
  + Zetta queries are similar to normal database queries you've used in the past.
+ Then we'll use the `observe()` function. This function will take our queries and have Zetta perform the lookup, or wait for the device to come online if not found.
  + Above we're simply looking up or waiting for our sensor and led.
  + The callback function for observe is called when the devices come online.
+ We'll be accessing the `pulse` data stream to affect our LED. Everytime the pulse stream fires a `"data"` event we know data is ready to be consumed.
  + Streams in Zetta follow the standard for how streams are used in Node.js
+ If the stream data is over the numerical value 65, then we'll turn our LED on.
  + The `call()` function is an asynchronous way to interact with a device that has actions available.
    + Call will take a callback function that passes in an error if one occured.
    + In our sample we call the `turn-on` or `turn-off` actions based on sensor data. If there is an issue we print it out in the callback.

###Adding the app to our server

Next we'll need to let Zetta know to use our app. The `load()` function will accomplish this. Update your server code to look like below to
have Zetta coordinating devices for you.

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var Heartbeat = require('zetta-mock-heartbeat-sensor');

var app = require('./apps/app')

zetta()
  .name('firstname.lastname')
  .link('http://hello-zetta.herokuapp.com/')
  .use(LED)
  .use(Heartbeat)
  .load(app)
  .listen(1337);
```

Now restart our server. You should have devices being coordinated by Zetta.
