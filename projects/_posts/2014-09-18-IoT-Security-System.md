---
layout: project
title: Home Security with Beaglebone
author: Matt Dobson
difficulty: experienced
duration: 1-3 hours
description: >
  Create an Internet-connected, home security system with a microphone, piezo speaker, an LED and a BeagleBone Black.
repo: https://github.com/zettajs/zetta-home-security/
cover: /images/projects/security_system/hardware/microphone_4.jpg
tags:
- BeagleBone Black
- Home Security
- Zetta Basics
---

# Directions

1. [Setup Zetta on the BeagleBone](#step-1-setup-zetta-on-the-beaglebone)
1. [Blink the LEDs](#step-2-blink-the-leds)
1. [Link to the Internet](#step-3-link-to-the-internet)
1. [Buzz the Buzzer](#step-4-buzz-the-buzzer)
1. [Soundcheck the Microphone](#step-5-soundcheck-the-microphone)
1. [Run the Security App](#step-6-run-the-security-app)
{:.steps}

# Goal

The goal for this project is to create a simple home security system by assembling a microphone, a piezo speaker and an LED into a Zetta app running on a BeagleBone Black. We will connect the app to the Internet by linking the BeagleBone with a second Zetta server running in the cloud.

![The Connected Microphone](/images/projects/security_system/hardware/led_birdseye.jpg)

![Microphone Hookup Diagram](/images/projects/security_system/hookup_diagram_step_3.png)

> **downloadcloud**{:.icon} Download the [Fritzing](http://fritzing.org) diagram for the finished project: [home_security_system.fzz](/images/projects/security_system/fritzing/home_security_system.fzz).

# Parts

![All Materials](/images/projects/security_system/hardware/empty_low.jpg){:.zoom .full}

<script src="https://www.sparkfun.com/wish_lists/95647.js"></script>

> **cart**{:.icon} [Buy the parts](https://www.sparkfun.com/wish_lists/95647) for the Home Security project from [SparkFun](http://www.sparkfun.com).

# Step #1: Setup Zetta on the BeagleBone

## Connect the BeagleBone

1. Follow the guide on [How to Connect a BeagleBone to the Internet via a PC](/guides/2014/10/03/BeagleBone.html).

## Clone the Starter Code to the BeagleBone

1. Open the browser-based Cloud9 IDE at [http://beaglebone.local:3000](http://beaglebone.local:3000).

1. Click the mouse in the BeagleBone's IDE console.
![Cloud9 Splash Screen](/images/projects/security_system/screens/bash_callout.png){:.zoom}

1. From the Cloud9 IDE console, clone [the Zetta starter project](https://github.com/zettajs/zetta-starter-project) to a new `home-security` directory on the BeagleBone.

   ```bash
   git clone https://github.com/zettajs/zetta-starter-project home-security
   ```

   > **help**{:.icon} Are you seeing `error: Couldn't resolve host 'github.com'`? Be sure to run `dhclient` on the BeagleBone, restart the browser and don't be shy about rebooting the BeagleBone and the PC. Read [How to Connect a BeagleBone to the Internet via a PC](/guides/2014/10/03/BeagleBone.html) for more details.

## Install Zetta

1. From the Cloud9 IDE console, `cd` to `home-security`.

   ```bash
   cd home-security
   ```

1. From the Cloud9 IDE console, install Zetta with [NPM](/reference/2014/10/12/npm.html).

   ```bash
   npm install
   ```

   > **clock**{:.icon} Running `npm install` on the BeagleBone can take several minutes.  

## Write Zetta Server Code

1. From the Cloud9 IDE workspace, click on the arrow to the left of the `home-security` folder. Then double-click on the file `server.js` to open it in the Cloud9 IDE editor.

   ![Saving a file](/images/projects/security_system/screens/serverjs-callout.png)

1. In the `server.js` file, write code to `require` Zetta, give the server a `name` and `listen` on server port `1337`.

   > **info**{:.icon} Choose a name for the server. Consider using your first and last name.

   ```javascript
   var zetta = require('zetta');

   zetta()
     .name('FirstName LastName')
     .listen(1337, function(){
        console.log('Zetta is running at http://beaglebone.local:1337');
   });
   ```

1. From the Cloud9 IDE, click `File > Save` to save the changes you made to `server.js`.

1. From the Cloud9 IDE console, run the Zetta server.

   ```bash
   node server.js
   ```
   Notice the console output indicating the server is running.

   ```bash
   Apr-23-2014 18:14:23 [server] Server (beaglebone) beaglebone listening on http://127.0.0.1:1337
   Zetta is running at http://beaglebone.local:1337
   ```

## Call the API

1. In the Cloud9 IDE, open a new terminal tab.

   ![New terminal tab](/images/projects/security_system/screens/terminal-tab.png)

1. In the Cloud9 IDE console, call Zetta's web API.

   ```bash
   curl http://beaglebone.local:1337 | python -m json.tool
   ```

   ```json
   { "actions": [{
       "fields": [
         { "name": "server", "type": "text"},
         { "name": "ql", "type": "text"}],
       "href": "http://beaglebone.local:1337/",
       "method": "POST",
       "name": "query-devices",
       "type": "application/x-www-form-urlencoded"}],
     "class": ["root"],
     "links": [
       {"href": "http://beaglebone.local:1337/", "rel": ["self"]},
       {"href": "http://beaglebone.local:1337/servers/FirstName%20LastName",
         "rel": ["http://rels.zettajs.io/server"], "title": "FirstName LastName"},
       {"href": "http://beaglebone.local:1337/peer-management",
         "rel": ["http://rels.zettajs.io/peer-management"]}]}
   ```
   {:.language-json-noln}

   > **info**{:.icon} As we `use` devices in `server.js` they will appear in the web API. For the following steps we'll access the API via the [Zetta Browser](/guides/2014/10/07/Zetta-Browser.html). However,  the `curl` command is a helpful way to use the API from the command line.

# Step #2: Blink the LEDs

## Write the LED Code

1. In the Cloud9 IDE console, ensure the working directory is `home-security`. Install the Zetta device driver for BeagleBone LEDs.

   ```bash
   npm install zetta-led-bonescript-driver --save
   ```

1. In the `server.js` file, write code to `require` and `use` the BeagleBone user `LEDs`: 'USR0', 'USR1', 'USR2' and 'USR3'.

   Add **line 2**:

   ```javascript
   var LED = require('zetta-led-bonescript-driver');
   ```
   Add **line 6**:

   ```javascript
   .use(LED, 'USR0', 'USR1', 'USR2', 'USR3')
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var LED = require('zetta-led-bonescript-driver');

   zetta()
    .name('FirstName LastName')
    .use(LED, 'USR0', 'USR1', 'USR2', 'USR3')
    .listen(1337, function(){
      console.log('Zetta is running at http://beaglebone.local:1337');
   });
   ```

1. From the Cloud9 IDE, click `File > Save` to save the changes you made to `server.js`.

1. In the Cloud9 IDE, stop (`CTRL-c` or `COMMAND-c`) and restart the Zetta server.

   ```bash
   node server.js
   ```

1. When Zetta discovers the LEDs, it will log messages about the devices to the Cloud9 IDE console.

   ```bash
   {timestamp} [scout] Device (led) {id} was discovered
   {timestamp} [scout] Device (led) {id} was discovered
   {timestamp} [scout] Device (led) {id} was discovered
   {timestamp} [scout] Device (led) {id} was discovered
   ```
   {:.language-bash-noln}

## Blink the LEDs from the BeagleBone

1. Open the Zetta Browser. Point it to the **BeagleBone server**.
   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337](http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337)

1. Ensure the **LED** devices are listed.

   ![Zetta Browser with LEDs](/images/projects/security_system/screens/browser-leds.png){:.zoom}

1. Click the `turn-on` button for the various LEDs.

1. Ensure the LEDs on the BeagleBone turned on and that the device state changed in the Zetta Browser visualization.

# Step #3: Link to the Internet

At this point, the LED API is only available locally. Let's make the LED API available from the cloud.

1. In the Cloud9 IDE console, open the `server.js` file. Write code to `link` the Zetta server on the BeagleBone to a Zetta server running in the cloud.

   Add **line 7**:

   ```javascript
   .link('http://hello-zetta.herokuapp.com/')
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var LED = require('zetta-led-bonescript-driver');

   zetta()
     .name('FirstName LastName')
     .use(LED, 'USR0', 'USR1', 'USR2', 'USR3')
     .link('http://hello-zetta.herokuapp.com/')
     .listen(1337, function(){
       console.log('Zetta is running at http://beaglebone.local:1337');
   });
   ```

1. From the Cloud9 IDE, click `File > Save` to save the changes you made to `server.js`.

1. From the Cloud9 IDE console, stop (`CTRL-c` or `COMMAND-c`) and restart the Zetta server.

   ```bash
   node server.js
   ```

1. Ensure the peer connection to the cloud is established and the console log includes notifications that  the peer was established.

   ```bash
   {timestamp} [peer-client] WebSocket to peer established (ws://hello-zetta.herokuapp.com/peers/beaglebone)
   {timestamp} [peer-client] Peer connection established (ws://hello-zetta.herokuapp.com/peers/beaglebone)
   ```
   {:.language-bash-noln}

> **info**{:.icon} By `link`ing the Zetta server on the BeagleBone to a Zetta server running in the cloud, you can access the devices via a web API from anywhere in the world.

## Blink the LEDs from the Cloud

1. Open the Zetta Browser. Point it to the **cloud server**.
   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

1. Ensure the **LED** devices are listed.

1. Click the `turn-on` button for the various LEDs.

1. Ensure the LEDs on the BeagleBone turned on and that the device state changed in the Zetta Browser visualization.

> **world**{:.icon} Now anyone in the world can control the LEDs on the BeagleBone. Try it. Copy the cloud URL and send it to friends so they can control the LEDs from afar: [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com).

# Step #4: Buzz the Buzzer

## Assemble the Buzzer Hardware

![Piezo Hookup Diagram](/images/projects/security_system/hookup_diagram_step_1.png){:.fritzing}

1. Attach the piezo buzzer to the breadboard.

    From              | To  
    :----             |----:
    Buzzer **-** pin  |Breadboard **A3**
    Buzzer **+** pin  |Breadboard **A6**
    {:.wiring}

    > **help**{:.icon} New to solderless breadboards? Read the [Adafruit Guide To Excellent Soldering](https://learn.adafruit.com/adafruit-guide-excellent-soldering/tools).

1. Create a circuit between the BeagleBone and the buzzer.

    From                  | Wire           | To  
    :----                 |:-----:         |----:
    Breadboard **E3**     |**White**       |BeagleBone **P9_14**
    Breadboard **E6**     |**Black**       |Breadboard **-**
    Breadboard **-**      |**Black**       |BeagleBone **P9_01**
    {:.wiring}

    > **help**{:.icon} Are the BeagleBone pin numbers confusing? Read the [BeagleBone](/guides/2014/10/03/BeagleBone.html#pinout) guide.

After assembling the buzzer hardware, the project should look similar to the images below.

![The Connected Piezo Buzzer](/images/projects/security_system/hardware/piezo_birdseye.jpg){:.zoom}
![The Connected Piezo Buzzer](/images/projects/security_system/hardware/piezo_low.jpg){:.zoom}

## Write the Buzzer Code

1. From the Cloud9 IDE console, install the Zetta device driver for the buzzer.

   ```bash
   npm install zetta-buzzer-bonescript-driver --save
   ```

   > **caution**{:.icon} Ensure the BeagleBone Cloud9 IDE console is in the correct working directory when you run `npm install`. The Cloud9 IDE console prompt should be: `root@beaglebone:/var/lib/cloud9/home-security/#`

1. In the `server.js` file, write code to `require` and `use` the `Buzzer` on pin 'P9_14'.

   Add **line 3**:

   ```javascript
   var Buzzer = require('zetta-buzzer-bonescript-driver');
   ```

   Add **line 8**:

   ```javascript
   .use(Buzzer, 'P9_14')
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var LED = require('zetta-led-bonescript-driver');
   var Buzzer = require('zetta-buzzer-bonescript-driver');

   zetta()
    .name('FirstName LastName')
    .use(LED, 'USR0', 'USR1', 'USR2', 'USR3')
    .use(Buzzer, 'P9_14')
    .link('http://hello-zetta.herokuapp.com/')
    .listen(1337, function(){
      console.log('Zetta is running at http://beaglebone.local:1337');
   });
   ```

1. From the Cloud9 IDE, click `File > Save` to save the changes you made to `server.js`.

1. In the Cloud9 IDE, switch to the first console tab. Stop (`CTRL-c` or `COMMAND-c`) and restart the Zetta server.

   ```bash
   node server.js
   ```

1. When Zetta discovers the buzzer, it will log a message about the device to the Cloud9 IDE console.

   ```bash
   {timestamp} [scout] Device (buzzer) {id} was discovered
   ```
   {:.language-bash-noln}


## Buzz the Buzzer

1. Open the Zetta Browser:

   [http://browser.zettajs.io/#/overview?url=http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

1. Ensure the **Buzzer** device is listed.
![Zetta Browser with Piezo Attached](/images/projects/security_system/screens/browser-piezo.png){:.zoom}

1. Click the `beep` button.

1. Ensure the buzzer buzzed and the device state changed in the Zetta Browser visualization.

   > **help**{:.icon} Didn't hear a beep? Double check the wiring and make sure there were no errors reported in the Cloud9 IDE console.

# Step #5: Soundcheck the Microphone

## Assemble Microphone Hardware

![Microphone Hookup Diagram](/images/projects/security_system/hookup_diagram_step_2.png){:.fritzing}

1. If the microphone does not have headers attached, solder them in place so the microphone can be attached to the breadboard.

   > **help**{:.icon} New to soldering? Read the [How to Solder](/guides/2014/10/13/solder.html) guide.

2. Attach the microphone to the breadboard.

    From                  | To  
    :----                 |----:
    Microphone **VCC**    |Breadboard **F18**
    Microphone **GND**    |Breadboard **F19**
    Microphone **AUD**    |Breadboard **F20**
    {:.wiring}

3. Create a circuit between the BeagleBone and the microphone.

    From                 | Wire                     | To  
    :----                |:-----:                   |----:
    Breadboard **H18**   |**Red**                   |BeableBone **P9_32**
    Breadboard **H19**   |**2.2k&#8486;** Resistor  |Breadboard **-**
    Breadboard **H20**   |**Green**                 |BeableBone **P9_36**
    {:.wiring}

   > **help**{:.icon} Don't know how to read resistor values? Read the [How to Read Resistor Values](/guides/2014/10/13/2014.html) guide.

After assembling the microphone hardware, the project should look similar to the images below.

![The Connected Microphone](/images/projects/security_system/hardware/microphone_birdseye.jpg){:.fritzing}
![The Connected Microphone](/images/projects/security_system/hardware/microphone_low.jpg){:.fritzing}

## Write Microphone Software

1. From the Cloud9 IDE console, install the Zetta device driver for the microphone.

   ```bash
   npm install zetta-microphone-bonescript-driver --save
   ```

1. In the `server.js` file, write code to `require` and `use` the `Microphone` driver on BeagleBone pin `P9_36`.

   Add **line 4**:

   ```javascript
   var Microphone = require('zetta-microphone-bonescript-driver');
   ```
   Add **line 10**:

   ```javascript
   .use(Microphone, 'P9_36')
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var LED = require('zetta-led-bonescript-driver');
   var Buzzer = require('zetta-buzzer-bonescript-driver');
   var Microphone = require('zetta-microphone-bonescript-driver');

   zetta()
     .name('FirstName LastName')
     .use(LED, 'USR0', 'USR1', 'USR2', 'USR3')
     .use(Buzzer, 'P9_14')
     .use(Microphone, 'P9_36')
     .link('http://hello-zetta.herokuapp.com/')
     .listen(1337, function(){
       console.log('Zetta is running at http://beaglebone.local:1337');
   });
   ```

1. From the Cloud9 IDE, click `File > Save` to save the changes you made to `server.js`.

1. From the Cloud9 IDE console, stop (`CTRL-c` or `COMMAND-c`) and restart the Zetta server.

   ```bash
   node server.js
   ```

1. When Zetta discovers the microphone, Zetta will log a message about the device to the Cloud9 IDE console.

   ```bash
   {TIMESTAMP} [scout] Device (microphone) {id} was discovered
   ```
   {:.language-bash-noln}

   ![Running the Server](/images/projects/security_system/screens/c9_two_devices.png){:.zoom}

## Soundcheck the Microphone

1. Open the Zetta Browser:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

1. Ensure the **Microphone** device is listed.
   ![Zetta Browser root with Microphone](/images/projects/security_system/screens/browser-microphone.png){:.zoom}

1. In the Zetta Browser, click on the **Microphone** link to open a detailed view of the device.

   ![Zetta Browser root with Microphone](/images/projects/security_system/screens/zetta-browser-microphone-show.png){:.zoom}

1. Make a noise near or gently tap on the microphone.

1. Ensure the values and waveform for the `:volume` characteristic in the Zetta Browser are streaming over time and change as you make noise.

# Step #6: Run the Security App

## Write Security App Code

1. From the Cloud9 IDE console, create the app file and directory.

   ```bash
   touch apps/app.js
   ```
   {:.language-bash-noln}

1. From the Cloud9 IDE, double-click on the new `apps/app.js` file to edit it.

1. Write the app logic.

   ```javascript
   module.exports = function(server) {

     var ledQuery = server.where({type: 'led'});
     var buzzerQuery = server.where({type: 'buzzer'});
     var microphoneQuery = server.where({type: 'microphone'});

     server.observe([ledQuery,buzzerQuery, microphoneQuery], function(led, buzzer, microphone){
       microphone.streams.volume.on('data', function(msg){
         if (buzzer.state === 'off' && msg.data > 30) {
           led.call('turn-on-pulse', function() {});
           buzzer.call('turn-on-pulse', function() {});
           setTimeout(function(buzzer) {
             buzzer.call('turn-off', function(err) {})
             led.call('turn-off', function(err) {})
           }, 3000, buzzer);
         }
       });
     });
   }
   ```

## Use Security App

1. From the Cloud9 IDE, edit the `server.js` file. Add code to `require` and `use` the `app` from the `apps` folder.

   Add **line 5**.

   ```javascript
   var app = require('./apps/app');
   ```

   Add **line 12**.

   ```javascript
   .use(app)
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var LED = require('zetta-led-bonescript-driver');
   var Buzzer = require('zetta-buzzer-bonescript-driver');
   var Microphone = require('zetta-microphone-bonescript-driver');
   var app = require('./apps/app');

   zetta()
     .name('FirstName LastName')
     .use(LED, 'USR0', 'USR1', 'USR2', 'USR3')
     .use(Buzzer, 'P9_14')
     .use(Microphone, 'P9_36')
     .use(app)
     .link('http://hello-zetta.herokuapp.com/')
     .listen(1337, function(){
       console.log('Zetta is running at http://beaglebone.local:1337');
   });
   ```
1. From the Cloud9 IDE, click `File > Save` to save the changes you made to `server.js`.

## Run the Security App

1. From the Cloud9 IDE console, restart the Zetta server by pressing `CTRL-c` or `COMMAND-c` and then running `node server.js`

   ```bash
   node server.js
   ```
1. Make a noise near or gently tap on the microphone.

1. Ensure the alarm sounds for approximately 3 seconds.

1. Open the Zetta Browser to observe state changes:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

# Congratulations!

Congratulations. You built a home-security system that is connected to the Internet and programmable from anywhere in the world.
