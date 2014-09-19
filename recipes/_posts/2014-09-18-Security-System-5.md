#The WeMo

The WeMo is an off the shelf consumer device. If there is a way to interact with a device in Node.js we can use it in Zetta. We'll


##Contents

1. Circuit
2. Retrieving Driver
3. Adding code to Server
4. Adding to your app
5. API and Browser

###Circuit

No circuit will be required! Here we'll use an off the shelf consumer device in our Zetta app.

###Retrieving Driver

Again we'll use the npm command to install our driver. Type `npm install zetta-wemo-driver --save`. This will install our driver for us.

**TIP**: Every module you'll use in this tutorial is open source. This one can be found here https://github.com/zettajs/zetta-wemo-driver.

###Adding code to Server

Now it's time to actually wire up our Zetta driver into the server node.

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');
var PIR = require('zetta-pir-bonescript-driver');
var Microphone = require('zetta-microphone-bonescript-driver');
var WeMo = require('zetta-wemo-driver');


var app = require('./apps/app');

zetta()
  .use(Buzzer, 'P9_14')
  .use(PIR, 'P9_12')
  .use(Microphone, 'P9_36')
  .use(WeMo)
  .load(app)
  .listen(1337)
```

* Here we've updated our code to let Zetta know that we want to use our WeMo.

###Creating your first app

Now we'll wire up our sound sensor into our app.

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var pirQuery = server.where({type: 'pir'});
  var microphoneQuery = server.where({type: 'microphone'});
  var wemoQuery = server.where({type: 'wemo'});

  server.observe([buzzerQuery, pirQuery, microphoneQuery, wemoQuery], function(buzzer, pir, microphone, wemo){
    var microphoneReading = 0;

    microphone.streams.volume.on('data', function(msg){
      if (msg.data > 10) {
        if (pir.state === 'motion') {
          buzzer.call('turn-on', function() {});
          wemo.call('turn-on', function(){});
        } else {
          buzzer.call('turn-off', function() {});
          wemo.call('turn-off', function(){});
        }
      }
    });

    pir.on('no-motion', function() {
      buzzer.call('turn-off', function() {});
      wemo.call('turn-off', function(){});
    });

  });
}
```

* We've updated our app to listen for a wemo to also come online.
* We've also updated the app to turn on the WeMo

###API and Browser

Below is a sample API response for our WeMo.

```json
{FILL_IN:"SOON!"}
```
