---
layout: project
title: Home Security with Edison
author: Adam Magaluk
difficulty: experienced
duration: 1-3 hours
description: >
  Create an Internet-connected, home security system with a microphone, piezo speaker, LED, LightBlue Bean and an Intel Edison.
repo: https://github.com/zettajs/zetta-security-system-edison
tags: 
- Intel Edison
- LightBlue Bean
---

# Directions

1. [Setup the Edison and PC](#step-1-setup-the-edison-and-pc)
1. [Blink The LED](#step-2-blink-the-led)
1. [Link to the Internet](#step-3-link-to-the-internet)
1. [Buzz the Buzzer](#step-4-buzz-the-buzzer)
1. [Soundcheck the Microphone](#step-5-soundcheck-the-microphone)
1. [Detect Acceleration](#step-6-detect-acceleration)
1. [Secure the Area](#step-7-secure-the-area)
{:.steps}

# Goal

The goal for this project is to create a simple home security system by assembling a microphone, a piezo speaker and an LED into a Zetta app running on an Intel Edison. We will also use Bluetooth low energy (BLE) to communicate with a LightBlue Bean's on-board temperature and accelerometer sensors plus an additional LED. We will connect the app to the Internet by linking the Edison with a second Zetta server running in the cloud.

![Final Project](/images/projects/security_system_edison/hookup_diagram_step_4.png)

> **downloadcloud**{:.icon} Download the [Fritzing](http://fritzing.org) diagram for the finished project: [home_security_system.fzz](/images/projects/security_system_edison/fritzing/home_security_system.fzz).

# Parts

<script src="https://www.sparkfun.com/wish_lists/98550.js"></script>

> **cart**{:.icon} [Buy the parts](https://www.sparkfun.com/wish_lists/98550) for the Home Security project from [SparkFun](http://www.sparkfun.com).

# Step #1: Setup the Edison and PC

## Connect the Edison

Follow the guide on [How to Connect an Edison to the Internet via a PC](https://communities.intel.com/docs/DOC-23148).


## Setting up the PC

1. Ensure you have a code editor on the PC.

   > **help**{:.icon} Need a code editor? Try [Atom](https://atom.io/) or [Sublime Text](http://www.sublimetext.com/).

1. Ensure you have [node.js](http://nodejs.org/) installed on the PC.

   > **help**{:.icon} Need to install node.js? Click the INSTALL button at [node.js](http://nodejs.org/).

1. From the PC terminal, install the edison-cli from the the command line.

   ```bash
   npm install -g edison-cli
   ```

   > **help**{:.icon} Problem with installation? Try `sudo npm install -g edison-cli`.

## Clone the Starter Code to the PC


1. From the PC terminal, clone [the Zetta starter project](https://github.com/zettajs/zetta-starter-project) to a new `zetta-home-security` directory.

   ```bash
   git clone https://github.com/zettajs/zetta-starter-project zetta-home-security
   ```

   > **help**{:.icon} Problem with `git clone`? Try downloading the zip file from [https://github.com/zettajs/zetta-starter-project](https://github.com/zettajs/zetta-starter-project)

## Install Zetta

1. From the PC terminal, `cd` to `zetta-home-security`.

   ```bash
   cd zetta-home-security
   ```

1. From the PC terminal, install Zetta with [NPM](/reference/2014/10/12/npm.html).

   ```bash
   npm install
   ```
   
## Write Zetta Server Code

1. Write code in `server.js` to `require` Zetta, give the server a `name` and `listen` on server port `1337`.

   > **info**{:.icon} Choose a name for the server. Consider using your first and last name.

   ```javascript
   var zetta = require('zetta');

   zetta()
     .name('FirstName-LastName')
     .listen(1337, function(){
        console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

## Connect PC to Intel Edison

1. Connect the PC to the Intel Edison development board via a USB cable.

    From                  | Wire           | To  
    :----                 |:-----:         |----:
    PC **USB A-Female**   |**USB**         |Edison **USB Micro J16**
    {:.wiring}

> **clock**{:.icon} Upon connecting the Edison to the PC, a few minutes will elapse before the Edison is visible on the local WiFi network.

## Run the Zetta Server

1. Run the server on the PC.

   ```bash
   node server.js
   ```
   Notice the console output indicating the server is running.

   ```bash
   Nov-20-2014 22:56:39 [server] Server (FirstName-LastName) FirstName-LastName listening on http://127.0.0.1:1337
   Zetta is running at http://127.0.0.1:1337
   ```

   Upon ensuring the server will run on the PC, stop the PC server.

1. Locate the Edison on the network.

   ```bash
   edison-cli list
   ```

1. Ensure the command line output looks like the results below.

   ```bash
   Edison Devices Found: 1
   1 - {ip address}
   ```
   {:.language-bash-noln}

   Remember the `{ip address}` to use in the commands that follow.

1. Run the Zetta server on the Edison

   ```bash
   edison-cli -H {ip address} deploy
   ```

   Ensure the console begins with output like this:

   ```bash
   XDK - IoT App Dameon v0.0.13 - commands: run, list, debug, status

   XDK Message Received: clean

   |================================================================
   |    Intel (R) IoT - NPM Rebuild - (may take several minutes)
   |================================================================
   ```

   And ends with output like this:

   ```bash
   => Stopping App <=
   Application restarted
   Nov-21-2014 04:01:32 [server] Server (FirstName-LastName) FirstName-LastName listening on http://127.0.0.1:1337
   Zetta is running at http://127.0.0.1:1337
   ```

## Call the Zetta API

1. Call Zetta's web API.
  
   * On Windows, copy and paste the URL below into a web browser:

   ```bash
   http://{ip address}:1337
   ```

   * On UNIX and Mac, run curl:

   ```bash
   curl http://{ip address}:1337
   ```

1. Ensure the API response is similar to the response below.

   ```json
   {
     "actions": [
       {
         "fields": [
           {
             "name": "server",
             "type": "text"
           },
           {
             "name": "ql",
             "type": "text"
           }
         ],
         "href": "http://10.1.10.53:1337/",
         "method": "GET",
         "name": "query-devices",
         "type": "application/x-www-form-urlencoded"
       }
     ],
     "class": [
       "root"
     ],
     "links": [
       {
         "href": "http://10.1.10.53:1337/",
         "rel": [
           "self"
         ]
       },
       {
         "href": "http://10.1.10.53:1337/servers/FirstName-LastName",
         "rel": [
           "http://rels.zettajs.io/server"
         ],
         "title": "FirstName-LastName"
       },
       {
         "href": "http://10.1.10.53:1337/peer-management",
         "rel": [
           "http://rels.zettajs.io/peer-management"
         ]
       }
     ]
   }
   ```
   {:.language-json-noln}

   > **info**{:.icon} As we `use` devices in `server.js` they will appear in the web API. For the following steps we'll access the API via the [Zetta Browser](/guides/2014/10/18/Zetta-Browser.html).

# Step #2: Blink the LED

## Write the LED Code

1. Ensure the working directory is `zetta-home-security`. Install the Zetta device driver for Edison LED.

   ```bash
   npm install zetta-led-edison-driver --save
   ```

1. In the `server.js` file, write code to `require` and `use` the Edison on-board `LED`: 13.

   Add **line 2**:

   ```javascript
   var LED = require('zetta-led-edison-driver');
   ```
   Add **line 6**:

   ```javascript
   .use(LED, 13)
   ```

1. Ensure `server.js` looks like the code below.
   
   ```javascript
   var zetta = require('zetta');
   var LED = require('zetta-led-edison-driver');

   zetta()
    .name('FirstName-LastName')
    .use(LED, 13)
    .listen(1337, function(){
      console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

1. Stop and restart the Zetta server.

   ```bash
   edison-cli -H {ip address} deploy
   ```

1. When Zetta discovers the LED, it will log a message about the device to the console.

   ```bash
   {timestamp} [scout] Device (led) {id} was discovered
   ```
   {:.language-bash-noln}

## Blink the LED on the Edison

1. Open the Zetta Browser. Point it to the **Edison server**.

   [http://browser.zettajs.io](http://browser.zettajs.io)

1. Ensure the **LED** device is listed.

1. Click the `turn-on` button for the LED.

1. Ensure the LED on the Edison turned on and that the device state changed in the Zetta Browser visualization.

# Step #3: Link to the Internet

## Create a Link between Two Zetta Servers

At this point, the LED API is only available locally. Let's make the LED API available on the Internet.

1. Open the `server.js` file. Write code to `link` your Zetta server on the Edison to a Zetta server running in the cloud.

   Add **line 7**:

   ```javascript
   .link('http://hello-zetta.herokuapp.com/')
   ```
   
1. Ensure `server.js` looks like the code below.
   
   ```javascript
   var zetta = require('zetta');
   var LED = require('zetta-led-edison-driver');

   zetta()
     .name('FirstName-LastName')
     .use(LED, 13)
     .link('http://hello-zetta.herokuapp.com/')
     .listen(1337, function(){
       console.log('Zetta is running at http://{ip address}:1337');
   });
   ```

1. Stop and restart the Zetta server.

   ```bash
   edison-cli -H {ip address} deploy
   ```

1. Ensure the peer connection to the cloud is established and the console log includes notifications that  the peer was established.

   ```bash
   {timestamp} [peer-client] WebSocket to peer established (ws://hello-zetta.herokuapp.com/peers/FirstName-LastName)
   {timestamp} [peer-client] Peer connection established (ws://hello-zetta.herokuapp.com/peers/FirstName-LastName)
   ```
   {:.language-bash-noln}

   > **info**{:.icon} By `link`ing your Zetta server on the Edison to a Zetta server running in the cloud, you can access the devices via a web API from anywhere in the world.

## Blink the LEDs from the Cloud

1. Open the Zetta Browser. Point it to the **cloud server**.
   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

1. Ensure the server and **LED** device are listed.

1. Click the `turn-on` button for the LED.

1. Ensure the LEDs on the Edison turned on and that the device state changed in the Zetta Browser visualization.

   > **world**{:.icon} Now anyone in the world can control the LEDs on the Edison. Try it. Copy the cloud URL and send it to friends so they can control your LEDs from afar: [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com).


# Step #4: Buzz the Buzzer

## Assemble the Buzzer Hardware

![Piezo Hookup Diagram](/images/projects/security_system_edison/hookup_diagram_step_1.png){:.fritzing}

1. Attach the piezo buzzer to the breadboard.

    From              | To
    :----             |----:
    Buzzer **+** pin  |Breadboard **A6**
    Buzzer **-** pin  |Breadboard **A3**
    {:.wiring}

    > **help**{:.icon} New to solderless breadboards? Read the [How to Use a Breadboard](/guides/2014/10/07/Breadboard.html) guide.

1. Create a circuit between the Edison and the buzzer.

    From                  | Wire           | To  
    :----                 |:-----:         |----:
    Breadboard **E3**     |**Green**       |Edison **DIGITAL ~3**
    Breadboard **E6**     |**Black**       |Breadboard **-**
    Breadboard **-**      |**Black**       |Edison **GND**
    {:.wiring}

## Write the Buzzer Software

1. From the PC's command line, install the Zetta device driver for the buzzer.

   ```bash
   npm install zetta-buzzer-edison-driver --save
   ```

3. In the `server.js` file, add code to `require` and `use` the `Buzzer` driver on Edison pin `3`.

   Add **line 3**:
   
   ```js
   var Buzzer = require('zetta-buzzer-edison-driver');
   ```

   Add **line 7**:
   
   ```js
   .use(Buzzer, 3)
   ```

1. Ensure `server.js` looks like the code below.

   ```js
   var zetta = require('zetta');
   var LED = require('zetta-led-edison-driver');
   var Buzzer = require('zetta-buzzer-edison-driver');

   zetta()
     .name('FirstName-LastName')
     .use(LED, 13)
     .use(Buzzer, 3)
     .link('http://hello-zetta.herokuapp.com/')
     .listen(1337, function(){
        console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ````

1. Deploy and run the Zetta server and buzzer code.

   ```bash
   edison-cli -H {ip address} deploy
   ```

1. Ensure that a message about the buzzer device is displayed in the console and looks like the output below.

   ```bash
   {TIMESTAMP} [scout] Device (buzzer) {id} was discovered
   ```

## Buzz the Buzzer

1. Open the Zetta Browser [http://browser.zettajs.io](http://browser.zettajs.io). Point it to the Edison `http://{ip address}:1337`.

1. Ensure the **Buzzer** device is listed.
![Zetta Browser with Piezo Attached](/images/projects/security_system_edison/screens/browser-piezo.png){:.zoom}

1. Click the `beep` button.

1. Ensure that the buzzer buzzed and the device state changed in the Zetta Browser visualization.

   > **help**{:.icon} Didn't hear a beep? Double check the wiring and make sure there were no errors reported.

# Step #5: Soundcheck the Microphone

## Assemble Microphone Hardware

![Microphone Hookup Diagram](/images/projects/security_system_edison/hookup_diagram_step_2.png){:.fritzing}

1. If the microphone does not have headers attached, solder them in place so the microphone can be attached to the breadboard.

   > **help**{:.icon} New to soldering? Read the [How to Solder](/guides/2014/10/13/solder.html) guide.

2. Attach the microphone to the breadboard.

    From                  | To  
    :----                 |----:
    Microphone **VCC**    |Breadboard **F18**
    Microphone **GND**    |Breadboard **F19**
    Microphone **AUD**    |Breadboard **F20**
    {:.wiring}

3. Create a circuit between the Edison and the microphone.

    From                 | Wire                     | To  
    :----                |:-----:                   |----:
    Breadboard **H18**   |**Red**                   |Edison **3.3V**
    Breadboard **H19**   |**2.2k&#8486;** Resistor  |Breadboard **-**
    Breadboard **H20**   |**Green**                 |Edison **A0**
    {:.wiring}

   > **help**{:.icon} Don't know how to read resistor values? Read the [How to Read Resistor Values](/guides/2014/10/13/2014.html) guide.


## Write Microphone Software

1. From the PC's command line, install the Zetta device driver for the microphone.

   ```bash
   npm install zetta-microphone-edison-driver --save
   ```

1. In the `server.js` file, write Zetta code to `require` and `use` the `Microphone` driver on Edison's analog pin `0`.

   Add **line 4**:

   ```javascript
   var Microphone = require('zetta-microphone-edison-driver');
   ```
   Add **line 10**:

   ```javascript
   .use(Microphone, 0)
   ```

1. Ensure `server.js` looks like the code below.

   ```js
   var zetta = require('zetta');
   var LED = require('zetta-led-edison-driver');
   var Buzzer = require('zetta-buzzer-edison-driver');
   var Microphone = require('zetta-microphone-edison-driver');

   zetta()
     .name('FirstName-LastName')
     .use(LED, 13)
     .use(Buzzer, 3)
     .use(Microphone, 0)
     .link('http://hello-zetta.herokuapp.com/')
     .listen(1337, function(){
        console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

1. Deploy the new code using the `edison-cli`

   ```bash
   edison-cli -H {ip address} deploy
   ```

1. When Zetta discovers the microphone, Zetta will log a message about the device to the output.

   ```bash
   {TIMESTAMP} [scout] Device (microphone) {id} was discovered
   ```
   {:.language-bash-noln}

## Soundcheck the Microphone

1. Open the Zetta Browser and ensure the **Microphone** device is listed.
   ![Zetta Browser root with Microphone](/images/projects/security_system_edison/screens/browser-microphone.png){:.zoom}

1. In the Zetta Browser, click on the **Microphone** link to open a detailed view of the device.

   ![Zetta Browser root with Microphone](/images/projects/security_system_edison/screens/zetta-browser-microphone-show.png){:.zoom}

1. Make a noise near or gently tap on the microphone.

1. Ensure the values and waveform for the `:volume` characteristic in the Zetta Browser are streaming over time and change as you make noise.

# Step #6 Detect Acceleration


## Assemble the LightBlue Bean Hardware

1. Ensure sure the LightBlue Bean has its battery plugged in.

![Bean Hookup Diagram](/images/projects/security_system_edison/hookup_diagram_step_3.png){:.fritzing}

## Write the Acceleration Detector Software

1. From the PC's command line, install the Zetta device driver for the Bean.
   * for WINDOWS:

     ```bash
     npm install -f zetta-bean-driver --save
     ```

   * for LINUX & MAC:

     ```bash
     npm install zetta-bean-driver --save
     ```

1. In the `server.js` file, write Zetta code to `require` and `use` the `Bean` driver.

   Add **line 5**:

   ```javascript
   var Bean = require('zetta-bean-driver');
   ```

   Add **line 12**:

   ```javascript
   .use(Bean, 'BeanName')
   ```

   > **info**{:.icon} `BeanName` is the name of the Bean. A common pattern is to name Beans sequentially like Bean1, Bean2 and so on. Naming Beans is helpful when there are multiple Beans on the same local network.

1. Ensure `server.js` looks like the code below.

   ```js
   var zetta = require('zetta');
   var LED = require('zetta-led-edison-driver');
   var Buzzer = require('zetta-buzzer-edison-driver');
   var Microphone = require('zetta-microphone-edison-driver');
   var Bean = require('zetta-bean-driver');

   zetta()
     .name('FirstName-LastName')
     .use(LED, 13)
     .use(Buzzer, 3)
     .use(Microphone, 0)
     .use(Bean, 'Bean35')
     .link('http://hello-zetta.herokuapp.com/')
     .listen(1337, function(){
        console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

1. Deploy the new code using the `edison-cli`

   ```bash
   edison-cli -H {ip address} deploy
   ```

1. Ensure the `ble-bean` is discovered by conferring with the console output.

   ```bash
   {date} [scout] Device (ble-bean) {id} was discovered
   ```

## Detect Acceleration

1. Open the Zetta Browser and ensure the **BeanName** device is listed.

1. In the Zetta Browser, click on the **BeanName** link to open a detailed view of the device.

1. Pick up the Bean and rotate it around its three axes.

1. Ensure the values and waveforms for the `:accelerationX`, `:accelerationY` and `:accelerationZ` characteristics in the Zetta Browser are streaming over time and change as you move the Bean.

# Step #7: Secure the Area

## Write Acceleration Alarm Code

1. Create an `apps` directory and an `acceleration_alarm` file.

   ```bash
   touch apps/acceleration_alarm.js
   ```
1. Write the app logic for detecting acceleration in `apps/acceleration_alarm.js`.

   ```javascript
   module.exports = function(server) {
     var ledQuery = server.where({ type: 'led' });
     var buzzerQuery = server.where({ type: 'buzzer' });
     var accelerationQuery = server.where({ type: 'ble-bean' });

     server.observe([ledQuery, buzzerQuery, accelerationQuery], function(led, buzzer, acceleration){
       acceleration.streams.accelerationZ.on('data', function(msg){
         if (msg.data < -0.5) {
           buzzer.call('turn-on-pulse', function(){});
           led.call('turn-on-pulse', function(){});
           setTimeout(function() {
             buzzer.call('turn-off', function(){});
             led.call('turn-off', function(){});
           }, 3000);
         }
       });
     });
   }
   ```

## Write Sound Alarm Code

1. Create a `sound_alarm` file.

   ```bash
   touch apps/sound_alarm.js
   ```
1. Write the app logic for detecting sound in `apps/sound_alarm.js`.

   ```javascript
   module.exports = function(server) {
     var ledQuery = server.where({ type: 'led' });
     var buzzerQuery = server.where({ type: 'buzzer' });
     var microphoneQuery = server.where({ type: 'microphone' });

     server.observe([ledQuery, buzzerQuery, microphoneQuery], function(led, buzzer, microphone){
       microphone.streams.volume.on('data', function(msg){
         if (msg.data > 600) {
           buzzer.call('turn-on-pulse', function(){});
           led.call('turn-on-pulse', function(){});
           setTimeout(function() {
             buzzer.call('turn-off', function(){});
             led.call('turn-off', function(){});
           }, 3000);
         }
       });
     });
   }
   ```

## Use Sound and Acceleration Alarm Apps in the Zetta Server

1. Edit the `server.js` file. Add Zetta code to `require` and `use` the app.

   Add **lines 6 and 7**.

   ```javascript
   var soundAlarm = require('./apps/sound_alarm');
   var accelerationAlarm = require('./apps/acceleration_alarm');
   ```
   {:.language-js-noln}

   Add **line 15 and 16**.

   ```javascript
   .use(soundAlarm)
   .use(accelerationAlarm)
   ```
   {:.language-js-noln}

1. Ensure `server.js` looks like the code below.

   ```js
   var zetta = require('zetta');
   var LED = require('zetta-led-edison-driver');
   var Buzzer = require('zetta-buzzer-edison-driver');
   var Microphone = require('zetta-microphone-edison-driver');
   var Bean = require('zetta-bean-driver');
   var soundAlarm = require('./apps/sound_alarm');
   var accelerationAlarm = require('./apps/acceleration_alarm');

   zetta()
     .name('FirstName-LastName')
     .use(LED, 13)
     .use(Buzzer, 3)
     .use(Microphone, 0)
     .use(Bean, 'Bean35')
     .use(soundAlarm)
     .use(accelerationAlarm)
     .link('http://hello-zetta.herokuapp.com/')
     .listen(1337, function(){
        console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

## Secure the Area

1. Deploy the new code using the `edison-cli`

   ```bash
   edison-cli -H {ip address} deploy
   ```

1. Make a noise near or gently tap on the microphone.

1. Ensure that the alarm beeps and the LED flashes open making the noise.

1. Turn the Bean upside down for a moment and then flip it right side up.

1. Ensure that the alarm beeps and the LED flashes as you turn the Bean upside down.

1. Observer state changes in the Zetta browser.
