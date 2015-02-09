---
layout: project
title: Car Speed Tracker System
author: Anil Sagar
difficulty: experienced
duration: 1-2 hours
description: >
  Create an Internet-connected, car speed tracker system with a phillips hue bulb, mock car.
repo: https://github.com/anil614sagar/zetta-speed-tracker
cover: /images/projects/car_speed_tracker/phillips_hue.jpg
---

# Directions

1. [Setup Zetta on the Machine](#step-1-setup-zetta-on-the-machine)
1. [Car Sensor System](#step-2-car-sensor-system)
1. [Link to the Cloud](#step-3-link-to-the-cloud)
1. [Setup Phillips Hue Bulb and Hub](#step-4-setup-phillips-hue-bulb-and-hub)
1. [Run the Car Speed Alert App](#step-5-run-the-car-speed-alert-app)
{:.steps}

# Goal

The goal for this project is to create a simple car speed tracker system by assembling a mock car, a phillips hue LED Bulb into a Zetta app running on a PC. We will connect the app to the Internet by linking the laptop with a second Zetta server running in the cloud.

A simple use case we try to demonstrate is if a car speed goes above 100 mile/hour then family at home will be alerted by turning Phillips HUE LED bulb into red in color at home. For Example, Using this app a father knows his teenage son is driving too fast sitting at home.

# Parts

This project requires

1. A PC with an Internet connection and [Node.js](http://nodejs.org/download/).
2. Phillips Hue Bulb & Hub

# Step #1: Setup Zetta on the PC

## Initialize the Project

1. From the PC command line, create the project directory.

   ```bash
   mkdir zetta-speed-tracker
   ```

1. Change to the project directory.

   ```bash
   cd zetta-speed-tracker
   ```

1. Initialize the project by following the `npm init` utility walk-through.

   ```bash
   npm init
   ```

> **action**{:.icon} Press `<ENTER>` multiple times to accept the `npm init` defaults.

## Install Zetta

1. Install Zetta and save it as a dependency to the `package.json` file that was created by `npm init`.

   ```markdown
   npm install zetta --save
   ```

## Write the Zetta Server Code

1. Create the `server.js` file.

   ```bash
   touch server.js
   ```

1. In a text editor, write code in `server.js` to `require` Zetta, give the server a `name` and `listen` on server port `1337`.

   > **info**{:.icon} Consider replacing `FirstName` and `LastName` with your first and last name.

   ```js
   var zetta = require('zetta');

   zetta()
   .name('FirstName-LastName')
   .listen(1337, function(){
   console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```


1. Save the file and run the Zetta server from within the `zetta-speed-tracker` project folder.

   ```bash
   touch server.js
   ```
   Notice the console output indicating the server is running.

   ```bash
   {timestamp} [server] Server (FirstName LastName) FirstName LastName listening on http://127.0.0.1:1337
   Zetta is running at http://127.0.0.1:1337
   ```

## Call the API

1. Open the Zetta API in a web browser: [http://127.0.0.1:1337](http://127.0.0.1:1337).

1. Confirm the API looks like the response below.

   ```json
   { "class":["root"],
    "links":[
      {"rel":["self"],
        "href":"http://127.0.0.1:1337/"},
        { "title":"FirstName LastName","rel":["http://rels.zettajs.io/server"],
          "href":"http://127.0.0.1:1337/servers/FirstName%20LastName"},
          {"rel":["http://rels.zettajs.io/peer-management"],
            "href":"http://127.0.0.1:1337/peer-management"}],
            "actions":[
              {"name":"query-devices","method":"GET",
                "href":"http://127.0.0.1:1337/","type":"application/x-www-form-urlencoded",
                "fields":[{"name":"server","type":"text"},{"name":"ql","type":"text"}]}]}
   ```
   {:.language-json-noln}

   > **info**{:.icon} As we `use` devices in `server.js` they will appear in the web API. For the following steps we'll access the API via the [Zetta Browser](/guides/2014/10/18/Zetta-Browser.html).


# Step #2: Car Sensor System

## Write the Car Sensor System Code

1. Install the mock car sensor driver from `npm`.

   ```bash
   npm install zetta-car-mock-driver --save
   ```

   > **info**{:.icon} Zetta driver names follow the pattern `zetta-[device]-[platform]-driver`. The Car Speed Tracker project uses mock devices so `mock` is considered to be the platform.

1. In the `server.js` file, write code to `require` and `use` the mock `CAR`.

   Add **line 2**:

   ```javascript
   var CAR = require('zetta-car-mock-driver');
   ```

   Add **line 6**:

   ```javascript
   .use(CAR)
   ```

1. Ensure `server.js` looks like the code below.

   ```js
   var zetta = require('zetta');
   var CAR = require('zetta-car-mock-driver');

   zetta()
   .name('FirstName LastName')
   .use(CAR)
   .listen(1337, function(){
     console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

1. Stop and restart the Zetta server by pressing `CTRL-C` then run `node server.js`.

   ```bash
   node server.js
   ```

1. When Zetta discovers the mock CAR, it will log a message about the device.

   ```bash
   {timestamp} [scout] Device (car) {id} was discovered
   ```
   {:.language-bash-noln}

## Operate the CAR from the PC

1. Open the Zetta Browser and point it at the **PC server**:

   [http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337](http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337)

1. Ensure the **CAR** is listed.

   ![Zetta Browser with CAR](/images/projects/car_speed_tracker/browser-car-idle.png){:.zoom}

1. Click the `StartCar` button and ensure the car state changed from `idle` to `started`.

1. Click the `accelerateCar` button and ensure the car state changed from `idle` to `accelerating`. Notice speed increasing gradually.

1. Click the `releaseAccelerator` button and ensure the car state changed from `accelerating` to `cruising`. Notice speed of the car becomes constant.

1. Click the `brakeCar` button and ensure the car state changed from `cruising` to `braking`. Notice speed of the car decreasing gradually.

1. Click the `releaseBrake` button and ensure the car state changed from `braking` to `cruising`. Notice speed of the car becomes constant.

# Step #3: Link to the Cloud

At this point, the CAR API is only available locally. Let's make the CAR API available from the cloud.

## Write the Link Code

1. In the `server.js` file, write code to `link` the Zetta server on the PC to a Zetta server running in the cloud.

   Add **line 7**:

   ```javascript
   .link('http://hello-zetta.herokuapp.com/')
   ```
1. Ensure `server.js` looks like the code below.

   ```js
   var zetta = require('zetta');
   var CAR = require('zetta-car-mock-driver');

   zetta()
   .name('FirstName LastName')
   .use(CAR)
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
   {timestamp} [peer-client] WebSocket to peer established (ws://hello-zetta.herokuapp.com/peers/FirstName LastName)
   {timestamp} [peer-client] Peer connection established (ws://hello-zetta.herokuapp.com/peers/FirstName LastName)
   ```
   {:.language-bash-noln}

   > **info**{:.icon} By `link`ing the Zetta server on the PC to a Zetta server running in the cloud, you can access devices via a web API from anywhere in the world.

## Control the CAR from the Cloud

1. Open the Zetta Browser and point it at the Zetta **cloud server**:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

   > **info**{:.icon} Notice that you are now accessing the CAR on your laptop from a **cloud server** on Heroku.

1. Ensure the **CAR** is listed.

1. Click the `startCar` button for the CAR and ensure the CAR state changed in the Zetta Browser visualization.

   > **world**{:.icon} Now anyone in the world can control the mock CAR on the PC. Try it. Copy the cloud URL and send it to friends so they can control the CAR from afar: [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com).

# Step #4: Setup Phillips Hue Bulb And Hub

1. Power Up the Hub

   ![Phillips Hue Hub](/images/projects/car_speed_tracker/phillips_hub.jpg){:.zoom}

1. Connect LAN Cable to Hub

1. Power Up the Phillips Hue Bulb

   ![Phillips Hue Bulb](/images/projects/car_speed_tracker/phillips_bulb.jpg){:.zoom}

1. Make sure zetta server & phillips hue bulb hub are in same network

## Write Phillips Hue Software

1. Install the Zetta device driver for the phillips hue.

   ```bash
   npm install zetta-hue-driver --save
   ```

1. In the `server.js` file, write code to `require` and `use` the `Hue` driver.

   Add **line 3**:

   ```javascript
   var Hue = require('zetta-hue-driver');
   ```
   Add **line 8**:

   ```javascript
   .use(Hue)
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var CAR = require('zetta-car-mock-driver');
   var Hue = require('zetta-hue-driver');

   zetta()
   .name('Anil Sagar')
   .use(CAR)
   .use(Hue)
   .link('http://hello-zetta.herokuapp.com/')
   .listen(1337, function(){
     console.log('Zetta is running at http://127.0.0.1:1337');
   });

   ```
1. Stop and restart the Zetta server by pressing `CTRL-C` then run `node server.js`.

   ```bash
   node server.js
   ```

1. When Zetta discovers the hue hub & bulbs, it will log a message about the device.

   ```bash
   {timestamp} [scout] Device (huehub) {id} was discovered
   ```
   {:.language-bash-noln}

1. Open the Zetta Browser and point it at the **PC server**:

   [http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337](http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337)

1. Ensure the **Hue Hub** is listed.

   ![Zetta Browser with CAR & Hue](/images/projects/car_speed_tracker/browser-car-hue-idle.png){:.zoom}

1. Click on Register button to register hub and press centre circular button in hue hub device to register hue hub & bulbs with zettajs application.

1. Refresh browser & click on register to see discovered bulbs.

   ![Zetta Browser with CAR, Hue, Bulbs](/images/projects/car_speed_tracker/browser-car-hue-bulbs.png){:.zoom}

1. Since we got only one bulb connected to hub, by trial find out which one by blinking the bulb using Zetta Browser and note down bulb name to build app.

   ![Zetta Browser Blink Bulb ](/images/projects/car_speed_tracker/browser-blink-bulb.png){:.zoom}

## Sense Car Speed with Mock Car Driver

> **info**{:.icon} Streaming data in Zetta is done via WebSockets.

### Zetta Browser

1. Open the Zetta browser and point it at the Zetta cloud server:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

1. In the Zetta Browser, ensure the **car** device is listed.

1. Click on the **car** link to see a detailed view.

   ![Car speed Detail Page](/images/projects/car_speed_tracker/browser_car_show.png){:.zoom}

1. Ensure the values and waveform for the `:speed` characteristic in the Zetta Browser change over time and stream like a exponential graph. Click on Start Car & Accelerate car button to see graph.


# Step #5: Run the Car Speed Alert App

## Write the Car Speed Alert App Code

1. Create an `apps` directory in the `zetta-speed-tracker` directory.

   ```bash
   mkdir apps
   ```

1. Create the `car_speed_alert.js` file.

   ```bash
   touch apps/car_speed_alert.js
   ```

1. Write code in `apps/car_speed_alert.js` to find the `hue bulb` and the `car`, monitor the `car speed` and toggle the `hue bulb` as the `speed` changes.

1. Make sure you change the name of the bulb in below code. Use the bulb name which is powered up.

   ```javascript
   module.exports = function(server) {
     var carQuery = server.where({ type: 'car' });
     var bulbQuery = server.where({type: 'huebulb', name: 'Hue Bulb Hue Downlight 1'});
     server.observe([carQuery, bulbQuery], function(car, bulb){
       car.streams.speed.on('data', function(m) {
         if(m.data > 100) {
           if (bulb.available('turn-on')) {
             bulb.call('color', '#ff0000');
             bulb.call('turn-on');
           }
         } else {
           if (bulb.available('turn-off')) {
             bulb.call('turn-off');
           }
         }
       });
     });}
   ```

## Use the Car Speed Alert App

1. Edit the `server.js` file. Add code to `require` and `use` the `car_speed_alert` app from the `apps` folder.

   Add **line 5**.

   ```javascript
   var carSpeedAlert = require('./apps/car_speed_alert');
   ```

   Add **line 11**.

   ```javascript
   .use(carSpeedAlert)
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var CAR = require('zetta-car-mock-driver');
   var Hue = require('zetta-hue-driver');
   var carSpeedAlert = require('./apps/car_speed_alert');

   zetta()
   .name('Anil Sagar')
   .use(CAR)
   .use(Hue)
   .use(carSpeedAlert)
   .link('http://hello-zetta.herokuapp.com/')
   .listen(1337, function(){
     console.log('Zetta is running at http://127.0.0.1:1337');
   });

   ```

## Run the Car Speed Alert App

1. Stop and restart the Zetta server by pressing `CTRL-C` then run `node server.js`.

   ```bash
   node server.js
   ```

1. Open the Zetta Browser and point it at the Zetta **cloud server**:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

1. Ensure Hub Bulbs are turned Off.

1. Start the Car & Accelearte the car.

1. Ensure the Hue Bulb turns `on` in red in color once the speed crosses 100 mark.

   ![Screenshot of Zetta browser with car speed alert](/images/projects/car_speed_tracker/phillips_car_alert.jpg){:.zoom}

1. Release the Car accelerator & brake the car. Notice speed getting decreased.

1. Ensure the Hue Bulb turns `off` once the speed dips below 100 mark.


# Congratulations!

Congratulations. You built a car speed alert system that is connected to the Internet and programmable from anywhere in the world.
