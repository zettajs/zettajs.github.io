---
layout: reference
title: How Zetta Works
description: 
author: Brian Mulloy
difficulty: beginner
duration: 1 hour
description: Take a look behind the scenes of the 'Hello World' project to understand more deeply how Zetta works.
---

> **info**{:.icon} This reference assumes that the reader has completed the [Hello World project](/projects/2014/10/13/Hello-World.html).


## Call the API

1. Make a HTTP `GET` request to the API on the running node server at [http://127.0.0.1:1337](http://127.0.0.1:1337).

   ```bash
   curl http://127.0.0.1:1337
   ```

   >**info**{:.icon} To make an HTTP request use `curl` in the command line, a web browser or a REST client (like [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo?hl=en-US)) to see the API results.

2. Confirm the API request returns a response like the data below.

   ```json
     { "class":["root"],
       "links":[
         {"rel":["self"],
           "href":"http://127.0.0.1:1337/"},
         { "title":"FirstName-LastName","rel":["http://rels.zettajs.io/server"],
           "href":"http://127.0.0.1:1337/servers/FirstName%20LastName"},
         {"rel":["http://rels.zettajs.io/peer-management"],
           "href":"http://127.0.0.1:1337/peer-management"}],
       "actions":[
         {"name":"query-devices","method":"GET",
           "href":"http://127.0.0.1:1337/","type":"application/x-www-form-urlencoded",
           "fields":[{"name":"server","type":"text"},{"name":"ql","type":"text"}]}]}
   ```
   {:.language-json-noln}

   > **info**{:.icon} As we `use` devices in `server.js` they will appear in the web API.

# Step #2: Blink the LED

## Write the LED Code

1. Install the mock LED driver from `npm`.

   ```bash
   npm install zetta-led-mock-driver --save
   ```

   > **info**{:.icon} Zetta driver names follow the pattern `zetta-[device]-[platform]-driver`. The Hello World project uses mock devices so `mock` is considered to be the platform.

1. In the `server.js` file, write code to `require` and `use` the mock `LED`.

   Add **line 2**:

   ```javascript
   var LED = require('zetta-led-mock-driver');
   ```

   Add **line 6**:

   ```javascript
   .use(LED)
   ```

1. Ensure `server.js` looks like the code below.

   ```js
   var zetta = require('zetta');
   var LED = require('zetta-led-mock-driver');

   zetta()
     .name('FirstName-LastName')
     .use(LED)
     .listen(1337, function(){
        console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

1. Stop and restart the Zetta server by pressing `CTRL-C` then run `node server.js`.

   ```bash
   node server.js
   ```

1. When Zetta discovers the mock LED, it will log a message about the device.

   ```bash
   {timestamp} [scout] Device (led) {id} was discovered
   ```
   {:.language-bash-noln}

## Blink the LED from the PC

1. Open the Zetta Browser and point it at the **PC server**:
   [http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337](http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337)

1. Ensure the **LED** is listed.

   ![Zetta Browser with LED](/images/projects/hello_world/browser_led_off.png){:.zoom}

1. Click the `turn-on` button and ensure the LED state changed from `off` to `on`.

1. Click the `turn-off` button and ensure the LED state changed from `on` to `off`.

# Step #3: Link to the Cloud

At this point, the LED API is only available locally. Let's make the LED API available from the cloud.

## Write the Link Code

1. In the `server.js` file, write code to `link` the Zetta server on the PC to a Zetta server running in the cloud.

   Add **line 7**:

   ```javascript
   .link('http://hello-zetta.herokuapp.com/')
   ```
1. Ensure `server.js` looks like the code below.

   ```js
   var zetta = require('zetta');
   var LED = require('zetta-led-mock-driver');

   zetta()
     .name('FirstName-LastName')
     .use(LED)
     .link('http://hello-zetta.herokuapp.com/')
     .listen(1337, function(){
       console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

1. Stop and restart the Zetta server by pressing `CTRL-C` then run `node server.js`.

   ```bash
   node server.js
   ```

1. Ensure the console log includes notifications that the peer was established.

   ```bash
   {timestamp} [peer-client] WebSocket to peer established (ws://hello-zetta.herokuapp.com/peers/FirstName-LastName)
   {timestamp} [peer-client] Peer connection established (ws://hello-zetta.herokuapp.com/peers/FirstName-LastName)
   ```
   {:.language-bash-noln}

   > **info**{:.icon} By `link`ing the Zetta server on the PC to a Zetta server running in the cloud, you can access devices via a web API from anywhere in the world.

## Blink the LED from the Cloud

1. Open the Zetta Browser and point it at the Zetta **cloud server**:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

   > **info**{:.icon} Notice that you are now accessing the LED on your laptop from a **cloud server** on Heroku.

1. Ensure the **LED** is listed.

1. Click the `turn-on` button for the LED and ensure the LED state changed in the Zetta Browser visualization.

> **world**{:.icon} Now anyone in the world can control the mock LED on the PC. Try it. Copy the cloud URL and send it to friends so they can control the LED from afar: [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com).

# Step #4: Sense Light with Photocell

## Write Photocell Software

1. Install the Zetta device driver for the mock photocell.

   ```bash
   npm install zetta-photocell-mock-driver --save
   ```

1. In the `server.js` file, write code to `require` and `use` the `Photocell` driver. 

   Add **line 3**:

   ```javascript
   var Photocell = require('zetta-photocell-mock-driver');
   ```
   Add **line 8**:

   ```javascript
   .use(Photocell)
   ```

1. Ensure `server.js` looks like the code below.
   
   ```javascript
   var zetta = require('zetta');
   var LED = require('zetta-led-mock-driver');
   var Photocell = require('zetta-photocell-mock-driver');

   zetta()
     .name('FirstName-LastName')
     .use(LED)
     .use(Photocell)
     .listen(1337, function(){
     console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```
1. Stop and restart the Zetta server by pressing `CTRL-C` then run `node server.js`.

   ```bash
   node server.js
   ```

1. When Zetta discovers the mock Photocell, it will log a message about the device.

   ```bash
   {timestamp} [scout] Device (photocell) {id} was discovered
   ```
   {:.language-bash-noln}

## Sense Light with Photocell

> **info**{:.icon} Streaming data in Zetta is done via WebSockets.

### Zetta Browser

1. Open the Zetta browser and point it at the Zetta cloud server:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

1. In the Zetta Browser, ensure the **photocell** device is listed.

1. Click on the **photocell** link to see a detailed view.

   ![Photocell Wave Detail Page](/images/projects/hello_world/browser_photocell_show.png){:.zoom}

1. Ensure the values and waveform for the `:intensity` characteristic in the Zetta Browser change over time and stream like a sine wave.

### Command Line

Zetta uses WebSockets to stream device data. Use a command line tool to subscribe to the WebSockets from the cloud.

1. Install `wscat`

   ```bash
   npm install -g ws
   ```

1. Use the Zetta Browser to determine the URL of the `photocell intensity` WebSocket by clicking on the `photocell` link and searching for `ws:`. The first WebSocket URL you find should be for monitoring the intensity.

1. Connect to the WebSockets stream with the URL. The URL will use your `FirstName`, `LastName` and a device `id`.

   ```bash
   wscat --connect ws://hello-zetta.herokuapp.com/servers/{FirstName%20LastName}/events?topic=photocell%2F{id}%2Fintensity
   ```

# Step #5: Run the Dusk to Dawn Light App

## Write the Dusk to Dawn Light App Code

1. Create an `apps` directory in the `how-zetta-works` directory.

   ```bash
   mkdir apps
   ```

1. Create the `dusk_to_dawn_light.js` file.

   ```bash
   touch apps/dusk_to_dawn_light.js
   ```

1. Write code in `apps/dusk_to_dawn_light.js` to find the `led` and the `photocell`, monitor the `photocell intensity` and toggle the `led` as the `intensity` changes.

   ```javascript
   module.exports = function(server) {
     var photocellQuery = server.where({ type: 'photocell' });
     var ledQuery = server.where({ type: 'led' });
     server.observe([photocellQuery, ledQuery], function(photocell, led){
       photocell.streams.intensity.on('data', function(m) {
         if(m.data < 0.5) {
           if (led.available('turn-on')) {
             led.call('turn-on');
           }
         } else {
           if (led.available('turn-off')) {
             led.call('turn-off');
          }
        }
      });
   });}
   ```

## Use the Dusk to Dawn Light App

1. Edit the `server.js` file. Add code to `require` and `use` the `dusk_to_dawn_light` app from the `apps` folder.

   Add **line 5**.

   ```javascript
   var duskToDawnLight = require('./apps/dusk_to_dawn_light');
   ```

   Add **line 11**.

   ```javascript
   .use(duskToDawnLight)
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var LED = require('zetta-led-mock-driver');
   var Photocell = require('zetta-photocell-mock-driver');

   var duskToDawnLight = require('./apps/dusk_to_dawn_light');

   zetta()
     .name('FirstName-LastName')
     .use(LED)
     .use(Photocell)
     .use(duskToDawnLight)
     .link('http://hello-zetta.herokuapp.com/')
     .listen(1337, function(){
       console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

## Run the Dusk to Dawn Light App

1. Stop and restart the Zetta server by pressing `CTRL-C` then run `node server.js`.

   ```bash
   node server.js
   ```

1. Open the Zetta Browser and point it at the Zetta **cloud server**:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)


4. Ensure the LED turns `on` and `off` based on the `photocell intensity`.

   ![Screenshot of Zetta browser with dusk to dawn lighting system](/images/projects/hello_world/browser_complete_project.png){:.zoom}


# Congratulations!

Congratulations. You built a dusk to dawn lighting system that is connected to the Internet and programmable from anywhere in the world.
