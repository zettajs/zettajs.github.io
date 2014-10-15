---
layout: community
title: Home Security
author: Matt Dobson
difficulty: experienced
duration: 1-3 hours
description: >
  Create an Internet-connected, home security system with a microphone, piezo speaker, an LED and a BeagleBone Black.
repo: https://github.com/alanguir/zetta-security-system/
---

# Goal

The goal for this project is to create a simple home security system by assembling a microphone, a piezo speaker and an LED into a Zetta app running on a BeagleBone Black. We will connect the app to the Internet by linking the BeagleBone with a second Zetta server running in the cloud.

![The Connected Microphone](/images/projects/security_system/hardware/led_birdseye.jpg)

![Microphone Hookup Diagram](/images/projects/security_system/hookup_diagram_step_3.png)

> **downloadcloud**{:.icon} Download the [Fritzing](http://fritzing.org) diagram for the finished project: [home_security_system.fzz](/images/projects/security_system/fritzing/home_security_system.fzz).

# Parts

![All Materials](/images/projects/security_system/hardware/empty_low.jpg){:.zoom .full}

<script src="https://www.sparkfun.com/wish_lists/95647.js"></script>

> **cart**{:.icon} [Buy the parts](https://www.sparkfun.com/wish_lists/95647) for the Home Security project from [SparkFun](http://www.sparkfun.com).

# Directions

1. [Setup the BeagleBone](#step-1-setup-the-beaglebone)
1. [Buzz the Buzzer](#step-2-buzz-the-piezo-buzzer)
1. [Soundcheck the Microphone](#step-3-soundcheck-the-microphone)
1. [Secure the Area](#step-4-secure-the-area)
{:.steps}

# Step #1: Setup the BeagleBone

## Connect the BeagleBone

1. Follow the guide on [How to Connect a BeagleBone to the Internet via a PC](/guides/2014/10/03/BeagleBone.html).

## Clone the Starter Code to the BeagleBone

1. Open the browser-based Cloud9 IDE at [http://beaglebone.local:3000](http://beaglebone.local:3000).

1. Click your mouse in the BeagleBone's IDE console.
![Cloud9 Splash Screen](/images/projects/security_system/screens/bash_callout.png){:.zoom}

1. From the Cloud9 IDE console, clone [the starter code](https://github.com/alanguir/zetta-security-system) to your BeagleBone.

   ```bash
   git clone https://github.com/alanguir/zetta-security-system
   ```

   > **info**{:.icon} By default your clone will be stored in the `/var/lib/cloud9/` folder, which is recommended for working with the Cloud9 IDE.

## Install Zetta

1. From the Cloud9 IDE console, `cd` to `zetta-security-system`.

   ```bash
   cd zetta-security-system
   ```

1. From the Cloud9 IDE console, [install Zetta with NPM](/reference/2014/10/12/npm.html).

   ```bash
   npm install
   ```

   > **clock**{:.icon} Running `npm install` on the BeagleBone can take several minutes. Move ahead with the hardware steps during installation.

# Step #2: Buzz the Piezo Buzzer

## Assemble the Buzzer Hardware

![Piezo Hookup Diagram](/images/projects/security_system/hookup_diagram_step_1.png){:.fritzing}

1. Attach the piezo buzzer to the breadboard.

    From              | To  
    :----             |----:
    Buzzer **-** pin  |Breadboard **A3**
    Buzzer **+** pin  |Breadboard **A6**
    {:.wiring}

    > **help**{:.icon} New to solderless breadboards? Read the [How to Use a  Breadboard](/guides/2014/10/07/Breadboard.html) guide.

1. Create a circuit between the BeagleBone and the buzzer.

    From                  | Wire           | To  
    :----                 |:-----:         |----:
    Breadboard **E3**     |**White**       |BeagleBone **P9_14**
    Breadboard **E6**     |**Black**       |Breadboard **-**
    Breadboard **-**      |**Black**       |BeagleBone **P9_01**
    {:.wiring}

    > **help**{:.icon} Are the BeagleBone pin numbers confusing? Read the [BeagleBone](/guides/2014/10/03/BeagleBone.html#pinout) guide.

After assembling the buzzer hardware, your project should look similar to the images below.

![The Connected Piezo Buzzer](/images/projects/security_system/hardware/piezo_birdseye.jpg){:.zoom}
![The Connected Piezo Buzzer](/images/projects/security_system/hardware/piezo_low.jpg){:.zoom}

## Write the Buzzer Software

1. From the Cloud9 IDE console, install the Zetta device driver for the buzzer.

   ```bash
   npm install zetta-buzzer-bonescript-driver --save
   ```

   > **caution**{:.icon} Ensure the BeagleBone Cloud9 IDE console is in the correct working directory when you run `npm install`. The Cloud9 IDE console prompt should be: `root@beaglebone:/var/lib/cloud9/zetta-security-system/#`

1. From the Cloud9 IDE workspace, click on the arrow to the left of the `zetta-security-system` folder. Then double-click on the file `server.js` to open it in the Cloud9 IDE editor.

   ![Saving a file](/images/projects/security_system/screens/serverjs-callout.png)

1. In the `server.js` file, write Zetta code to `require` and `use` the `Buzzer` driver on BeagleBone pin `P9_14` and `listen` on server port `1337`.

   ```javascript
   var zetta = require('zetta');
   var Buzzer = require('zetta-buzzer-bonescript-driver');

   zetta()
     .use(Buzzer, 'P9_14')
     .listen(1337, function(){
      console.log('Zetta is running at http://beaglebone.local:1337');
   });
   ```

1. From the Cloud9 IDE, click `File > Save` to save the changes you made to `server.js`.

1. From the Cloud9 IDE console, run the Zetta server.

   ```bash
   node server.js
   ```

1. When Zetta discovers the buzzer, Zetta will log a message about the device to the Cloud9 IDE console.

   ```bash
   Zetta is running at http://beaglebone.local:1337
   {TIMESTAMP} [scout] Device (buzzer) {GUID} was provisioned from registry
   ```
   > **clock**{:.icon} The BeagleBone can take up to 30 seconds to run the Zetta server before you will see the device discovery log in the console.

## Buzz the Buzzer

1. Open the Zetta Browser:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337](http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337)

1. Ensure your **Buzzer** device is listed.
![Zetta Browser with Piezo Attached](/images/projects/security_system/screens/browser-piezo.png){:.zoom}

1. Click the `beep` button.

1. Ensure that your buzzer buzzed and the device state changed in the Zetta Browser visualization.

   > **help**{:.icon} Didn't hear a beep? Double check your wiring and make sure there were no errors reported in the Cloud9 IDE console.

# Step #3: Soundcheck the Microphone

## Assemble Microphone Hardware

![Microphone Hookup Diagram](/images/projects/security_system/hookup_diagram_step_2.png){:.fritzing}

1. If your microphone does not have headers attached, solder them in place so the microphone can be attached to the breadboard.

   > **help**{:.icon} New to soldering? Read the [How to Solder](/guides/2014/10/13/solder.html) guide.

2. Attach your microphone to the breadboard.

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

After assembling the microphone hardware, your project should look similar to the images below.

![The Connected Microphone](/images/projects/security_system/hardware/microphone_birdseye.jpg){:.fritzing}
![The Connected Microphone](/images/projects/security_system/hardware/microphone_low.jpg){:.fritzing}

# Write Microphone Software

1. From the Cloud9 IDE console, install the Zetta device driver for the microphone.

   ```bash
   npm install zetta-microphone-bonescript-driver --save
   ```

1. In the `server.js` file, write Zetta code to `require` and `use` the `Microphone` driver on BeagleBone pin `P9_36`.

   Add **line 3**:

   ```javascript
   var Microphone = require('zetta-microphone-bonescript-driver');
   ```
   Add **line 7**:

   ```javascript
   .use(Microphone, 'P9_36')
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var Buzzer = require('zetta-buzzer-bonescript-driver');
   var Microphone = require('zetta-microphone-bonescript-driver');

   zetta()
     .use(Buzzer, 'P9_14')
     .use(Microphone, 'P9_36')
     .listen(1337, function(){
     console.log('Zetta is running at http://beaglebone.local:1337');
   });
   ```

1. From the Cloud9 IDE, click `File > Save` to save the changes you made to `server.js`.

1. From the Cloud9 IDE console, restart the Zetta server by pressing `CTRL-c` or `COMMAND-c` and then running `node server.js`

   ```bash
   node server.js
   ```

1. When Zetta discovers the microphone, Zetta will log a message about the device to the Cloud9 IDE console.

   ```bash
   Zetta is running at http://beaglebone.local:1337
   {TIMESTAMP} [scout] Device (buzzer) {GUID} was provisioned from registry.
   {TIMESTAMP} [scout] Device (microphone) {GUID} was discovered
   ```
   {:.language-bash-noln}

   ![Running Your Server](/images/projects/security_system/screens/c9_two_devices.png){:.zoom}

## Soundcheck the Microphone

1. Open the Zetta Browser:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337](http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337)

1. Ensure your **Microphone** device is listed.
   ![Zetta Browser root with Microphone](/images/projects/security_system/screens/browser-microphone.png){:.zoom}

1. In the Zetta Browser, click on the **Microphone** link to open a detailed view of the device.

   ![Zetta Browser root with Microphone](/images/projects/security_system/screens/zetta-browser-microphone-show.png){:.zoom}

1. Make a noise near or gently tap on the microphone.

1. Ensure the values and waveform for the `:volume` characteristic in the Zetta Browser are streaming over time and change as you make noise.

# Step #4: Secure the Area

## Create Security App File and Folder

1. From the Cloud9 IDE console, create the app file and directory.

   ```bash
   mkdir apps
   touch apps/app.js
   ```
   {:.language-bash-noln}

1. From the Cloud9 IDE, double-click on the new `apps/app.js` file to edit it.

## Write  Security App Logic

1. Write the app logic.

   ```javascript
   module.exports = function(server) {
     var buzzerQuery = server.where({type: 'buzzer'});
     var microphoneQuery = server.where({type: 'microphone'});
     server.observe([buzzerQuery, microphoneQuery], function(buzzer, microphone){
       microphone.streams.volume.on('data', function(msg){
         if (buzzer.state === 'off' && msg.data > 30) {
           buzzer.call('turn-on-pulse', function() {});
           setTimeout(function(buzzer) {
               buzzer.call('turn-off', function(err) {})
             }, 3000, buzzer);
         }
       });
     });
   }
   ```

## Use Security App in the Zetta Server

1. From the Cloud9 IDE, edit the `server.js` file. Add Zetta code to `require` and `use` the `app` from the `apps` folder.

   Add **line 5**.

   ```javascript
   var app = require('./apps/app');
   ```

   Add **line 10**.

   ```javascript
   .use(app)
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var Buzzer = require('zetta-buzzer-bonescript-driver');
   var Microphone = require('zetta-microphone-bonescript-driver');

   var app = require('./apps/app');

   zetta()
   .use(Buzzer, 'P9_14')
   .use(Microphone, 'P9_36')
   .use(app)
   .listen(1337, function(){
     console.log('Zetta is running at http://beaglebone.local:1337');
   });
   ```
1. From the Cloud9 IDE, click `File > Save` to save the changes you made to `server.js`.

## Secure the Area

1. From the Cloud9 IDE console, restart the Zetta server by pressing `CTRL-c` or `COMMAND-c` and then running `node server.js`

   ```bash
   node server.js
   ```
1. Make a noise near or gently tap on the microphone.

1. Ensure that the alarm sounds for approximately 3 seconds.

1. Open the Zetta Browser to observe state changes:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337](http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337)
