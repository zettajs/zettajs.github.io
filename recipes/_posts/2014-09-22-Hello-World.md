---
layout: recipe
title: Hello World
author: Adam Magaluk
difficulty: beginner
---

The following documentation will guide you through how to build the basic "Hello World!" sample in Zetta. This is all in code, so no hardware is required, other than your computer.

#Pre-reqs

Before you begin, you'll need to do the following:

  > 1. Have Zetta and Node.js installed. See [installation instructions](#) if you need to do this.
  > 2. [**download**{:.icon} Download](https://github.com/zettajs/zetta-heartbeat-sample) this recipe's source code

#Recipe Steps

1. [The LED](#the-led)
   Develop a state machine model for our mock LED
2. [Sine Wave Generator](#sine-wave-generator)
   The sine wave device outputs a sine wave
3. [Interactions](#interactions)
   How to use queries, interact with streams, and call actions on devices
4. [Next Steps](#next-steps)
{:.steps}

#1. The LED

Here we'll add our LED. We'll go over what the first steps are in getting started with Zetta.

##Contents

1. Retrieving the Driver
2. Adding Code to the Server
3. API
4. Browser

###Retrieving the Driver

Firstly, we'll need to retrieve the driver for our mock LED. Zetta uses npm to manage dependencies,
and module distribution. To get started open your command line and navigate to your project. Then type:

```
$ npm install zetta-mock-led
```

The above line will retrieve the driver for you off the npm registry, and place it in your `node_modules/` folder.

###Adding Code to the Server

Next we'll initialize our device and load it into Zetta. Here is what you need to write in your `server.js` file.

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');

zetta()
  .use(LED)
  .listen(1337);
```

+ The first line will load the zetta module into the script.
+ The second line will load the mock LED module into the script.
+ The third line will initialize Zetta and make sure everything is wired up properly.
+ The fourth line calls the `use()` function. This function tells Zetta that we'd like to use a device.
+ The fifth line tells Zetta what port the API server should listen on.

Now let's go back to our command line and type

```
$ node server.js
```

The above command will start your server, and expose and API for your mock LED.

###API

With Zetta everything is API first. Whenever you use a device in the platform an HTTP API is generated for you. Navigate
your browser to http://0.0.0.0:1337/ to see what the API will look like. Below is a sample API response.

```json
{
  "class": [
    "root"
  ],
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://0.0.0.0:1337/"
    },
    {
      "rel": [
        "http://rels.zettajs.io/server"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773"
    },
    {
      "rel": [
        "http://rels.zettajs.io/peer-management"
      ],
      "href": "http://0.0.0.0:1337/peer-management"
    }
  ]
}
```

Above is a sample response for the root of your API. Zetta harnesses Siren hypermedia for an expressive, and robust
API model that allows for more contextual information to be passed between client and server. Navigate to the link
with rel `"http://rels.zettajs.io/server"`. Zetta organizes everything by server, and this is the link to the server you just created.

```json
{
  "class": [
    "server"
  ],
  "properties": {
    "id": "b4984382-4776-43ca-8d9d-329eb571f773",
  },
  "actions": [
    {
      "name": "register-device",
      "method": "POST",
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/devices",
      "type": "application/x-www-form-urlencoded",
      "fields": [
        {
          "name": "type",
          "type": "text"
        },
        {
          "name": "id",
          "type": "text"
        },
        {
          "name": "name",
          "type": "text"
        }
      ]
    }
  ],
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773"
    },
    {
      "rel": [
        "monitor"
      ],
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events%3Ftopic=logs"
    }
  ],
  "entities": [
    {
      "class": [
        "device"
      ],
      "properties": {
        "id": "19bd231d-40fd-4e97-a018-91a91d93f61c",
        "type": "led",
        "name": null,
        "state": "off"
      },
      "links": [
        {
          "rel": [
            "self"
          ],
          "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/devices/19bd231d-40fd-4e97-a018-91a91d93f61c"
        },
        {
          "rel": [
            "up",
            "http://rels.zettajs.io/server"
          ],
          "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773"
        }
      ]
    }
  ]
}
```

Above is the next important sample API response. Notice that we have an API representation for our LED now? This representation
is only an abbreviated one though. We need to navigate to the link with rel of `"self"` on the entity in the entities array. We'll navigate
to that link to finally see what we can do with the device.

```json
{
  "class": [
    "device"
  ],
  "properties": {
    "id": "19bd231d-40fd-4e97-a018-91a91d93f61c",
    "type": "led",
    "name": null,
    "state": "on"
  },
  "actions": [
    {
      "name": "turn-off",
      "method": "POST",
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/devices/19bd231d-40fd-4e97-a018-91a91d93f61c",
      "fields": [
        {
          "name": "action",
          "type": "hidden",
          "value": "turn-off"
        }
      ]
    }
  ],
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/devices/19bd231d-40fd-4e97-a018-91a91d93f61c"
    },
    {
      "rel": [
        "up",
        "http://rels.zettajs.io/server"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773"
    },
    {
      "title": "state",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events?topic=led%2F19bd231d-40fd-4e97-a018-91a91d93f61c%2Fstate"
    },
    {
      "title": "logs",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events?topic=led%2F19bd231d-40fd-4e97-a018-91a91d93f61c%2Flogs"
    }
  ]
}
```

Above is the actual full representation of the Zetta device.

+ The `"properties"` of a device are simply bits of data that are important to it.
    + In Zetta everything has a `"state"`, and that particular property helps determine what actions a device can take.
+ The `"actions"` of a device are things that can be done to manipulate it. Here we can use the `"turn-off"` action to turn the LED off.
+ The `"links"` property allows us to navigate to other things that are important about the device.
  + The first kind of link is http based. It allows us to navigate the API
  + The second is a web socket link. This allows us to stream data out of the system easily.

###Browser

The Zetta team has actually created an API browser that will easily consume this API. Open a new tab in your web browser and navigate to
http://browser.zettajs.io/. Here we can interact and crawl the API with a convenient, and well designed user interface.

Simply input your server endpoint http://0.0.0.0:1337/ and you should be automatically directed to your LED!

#2. Sine Wave

Here we'll add our Sine Wave generator. We'll go over how to add an additional device, and what benefits streams have in Zetta.

##Contents

1. Retrieving the Driver
2. Adding Code to the Server
3. API and Browser

###Retrieving the Driver

Again we'll use the npm command to retrieve the driver. Type the following into your command line.

```
$ npm install zetta-sine-wave
```

###Adding Code to the Server

Next we'll add our device to the server. Update your `server.js` file to look like the code below.

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var SineWave = require('zetta-sine-wave');

zetta()
  .use(LED)
  .use(SineWave)
  .listen(1337);
```

After that run your server with the `node server.js` command.

###API and Browser

Again, Zetta has generated an API response for all the devices we want to use. Here is a sample heartbeat sensor API response.

```json
{
  "class": [
    "device"
  ],
  "properties": {
    "id": "c5352e47-7a77-485e-8c0f-065ebd9c6f5e",
    "wave": -0.4999,
    "type": "generator",
    "name": "SineWave"
  },
  "actions": null,
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/devices/c5352e47-7a77-485e-8c0f-065ebd9c6f5e"
    },
    {
      "rel": [
        "up",
        "http://rels.zettajs.io/server"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773"
    },
    {
      "title": "wave",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events?topic=generator%2Fc5352e47-7a77-485e-8c0f-065ebd9c6f5e%2Fwave"
    },
    {
      "title": "logs",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events?topic=generator%2Fc5352e47-7a77-485e-8c0f-065ebd9c6f5e%2Flogs"
    }
  ]
}

```

The sine wave generator should look similar to the LED in the previous step. However, instead of actions it has a web socket link for streaming
sine wave data. This link can be accessed with the web socket link with the title `"wave"`. Now let's open our browser, and take a look at our new device.

After opening the browser you should see that we have our LED like before, and now we have our sine wave generator as well. The browser will also auto subscribe
to any data streams coming from the API. You should see data in real time updating in the browser!

#3. Interactions

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
  var generatorQuery = server.where({type: 'generator'});
  var ledQuery = server.where({type: 'led'});

  server.observe([generatorQuery, ledQuery], function(generator, led){
    generator.streams.wave.on('data', function(message){
      if(message.data > 0) {
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
+ We'll be accessing the `wave` data stream to affect our LED. Every time the wave stream fires a `"data"` event we know data is ready to be consumed.
  + Streams in Zetta follow the standard for how streams are used in Node.js
+ If the stream data is over the numerical value 0, then we'll turn our LED on.
  + The `call()` function is an asynchronous way to interact with a device that has actions available.
    + Call will take a callback function that passes in an error if one occurred.
    + In our sample we call the `turn-on` or `turn-off` actions based on sensor data. If there is an issue we print it out in the callback.

###Adding the app to our server

Next we'll need to let Zetta know to use our app. The `load()` function will accomplish this. Update your server code to look like below to
have Zetta coordinating devices for you.

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var SineWave = require('zetta-sine-wave');

var app = require('./apps/app')

zetta()
  .name('firstname.lastname')
  .link('http://hello-zetta.herokuapp.com/')
  .use(LED)
  .use(SineWave)
  .load(app)
  .listen(1337);
```

Now restart our server. You should have devices being coordinated by Zetta.

#4. Next Steps

Here are some next steps you can take.

+ Setup your own Zetta server in the cloud
  + We provided hello-zetta as a way to demonstrate linking. Check out http://github.com/zettajs/zetta-cloud-sample to deploy your own cloud server to heroku or similar service.
+ Add hardware
  + Our next recipe will iterate on our hello world app to include hardware. Check it out!
+ Create your own mock devices
  + Check out how to write a driver **here**, and get started with your own mock devices.

###Getting Help

If you're going through this project, and run into an issue feel free to use these methods to reach out and contact us!

* matt@apigee.com
* https://groups.google.com/forum/#!forum/zetta-discuss
* https://github.com/zettajs/zetta/issues
* Reference Documentation: http://zettajs.github.io/
