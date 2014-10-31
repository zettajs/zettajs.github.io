---
layout: community
title: Home Security
author: Matt Dobson
difficulty: experienced
duration: 1-3 hours
description: >
  Create an Internet-connected, home security system with a microphone, piezo speaker, an LED and a Intel Edison.
repo: https://github.com/zettajs/zetta-security-system-edison
---

# Goal

The goal for this project is to create a simple home security system by assembling a microphone, a piezo speaker and an LED into a Zetta app running on a Intel Edison. We will connect the app to the Internet by linking the Edison with a second Zetta server running in the cloud.

![The Connected Microphone](/images/projects/security_system/hardware/led_birdseye.jpg)

![Microphone Hookup Diagram](/images/projects/security_system/hookup_diagram_step_3.png)

> **downloadcloud**{:.icon} Download the [Fritzing](http://fritzing.org) diagram for the finished project: [home_security_system.fzz](/images/projects/security_system/fritzing/home_security_system.fzz).

# Parts

![All Materials](/images/projects/security_system/hardware/empty_low.jpg){:.zoom .full}

<script src="https://www.sparkfun.com/wish_lists/98550.js"></script>

> **cart**{:.icon} [Buy the parts](https://www.sparkfun.com/wish_lists/98550) for the Home Security project from [SparkFun](http://www.sparkfun.com).

# Directions

1. [Setup the Edison](#step-1-setup-the-edison-and-pc)
1. [Buzz the Buzzer](#step-2-buzz-the-piezo-buzzer)
1. [Soundcheck the Microphone](#step-3-soundcheck-the-microphone)
1. [Secure the Area](#step-4-secure-the-area)
1. [Link to the Internet](#step-5-link-to-the-internet)
{:.steps}

# Step #1: Setup the Edison and PC

## Connect the Edison

Follow the guide on [How to Connect a Edison to the Internet via a PC](https://communities.intel.com/docs/DOC-23148).


## Setting up your PC

1. Make sure you have a code editor on your PC you're comfortable with. Here's a few:

    - [Atom](https://atom.io/)
    - [Sublime Text](http://www.sublimetext.com/)

2. Make sure you have Node.js installed [Install Node.js on your PC](http://nodejs.org/)

3. Install the edison-cli, using your command line.

```bash
npm install -g edison-cli

# or on linux/mac

sudo npm install -g edison-cli
```

## Setup the Security System Project on your PC

Create a directory that we will use to write code in.

```bash
mkdir zetta-security-system
```

Move into the newly created directory.

```bash
cd zetta-security-system
```

## Install Zetta

1. From your PC's command line, [install Zetta with NPM](/reference/2014/10/12/npm.html).

   ```bash
   npm install zetta --save
   ```

   >  Using `--save` flag will add zetta to your project's dependencies.

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

1. Create a circuit between the Edison and the buzzer.

    From                  | Wire           | To  
    :----                 |:-----:         |----:
    Breadboard **E3**     |**White**       |Edison **D3**
    Breadboard **E6**     |**Black**       |Breadboard **-**
    Breadboard **-**      |**Black**       |Edison **GND**
    {:.wiring}

After assembling the buzzer hardware, your project should look similar to the images below.

![The Connected Piezo Buzzer](/images/projects/security_system/hardware/piezo_birdseye.jpg){:.zoom}
![The Connected Piezo Buzzer](/images/projects/security_system/hardware/piezo_low.jpg){:.zoom}

## Write the Buzzer Software

1. From your PC's command line, install the Zetta device driver for the buzzer.

   ```bash
   npm install zetta-buzzer-edison-driver --save
   ```

2. Create a new file called `server.js`

3. In the `server.js` file, write Zetta code to `require` and `use` the `Buzzer` driver on Edison pin `3` and `listen` on server port `1337`.

   ```javascript
   var zetta = require('zetta');
   var Buzzer = require('zetta-buzzer-edison-driver');

   zetta()
     .use(Buzzer, 3)
     .listen(1337, function(){
       console.log('Zetta is running at http://localhost:1337');
     });
   ```

   > You can test your code is written properly by running `node server.js` on your pc.


4. Init the `package.json` file with `server.js` as the main file.

```bash
npm init
```

  Hit enter to all the questions.

## Deploying to the Edison

1. Locate your Edison on the network.

```bash
edison-cli list

You should see an output similar to below:

  Devices Found: 1
  1 - 10.0.1.15
```

  We use the `10.0.1.15` based on the output.

2. Deploy your code.

```bash
edison-cli -H 10.0.1.15 deploy

You should see a build output:

  XDK - IoT App Daemon v0.0.13 - commands: run, list, debug, status

  XDK Message Received: clean

  |================================================================
  |    Intel (R) IoT - NPM Rebuild - (may take several minutes)
  |================================================================

  ...

  |================================================================
  |    NPM REBUILD COMPLETE![ 0 ]   [ 0 ]
  |================================================================

  XDK Message Received: run
  => Stopping App <=
  Application restarted
```

  > **clock**{:.icon} Running `deploy` the first time will take a few minutes to rebuild the native npm modules. Only changes to the `node_modules` will require a rebuild, this is done automatically.


3. Start the application to see the output:

```bash
edison-cli -H 10.0.1.15 start
```

4. When Zetta discovers the buzzer, Zetta will log a message about the device to the `start` command.

   ```bash
   Zetta is running at http://localhost:1337
   {TIMESTAMP} [scout] Device (buzzer) {GUID} was provisioned from registry
   ```

## Buzz the Buzzer

1. Open the Zetta Browser: [http://browser.zettajs.io](http://browser.zettajs.io)

  Enter the address to the Edison `http://10.0.1.15:1337` in the box.


1. Ensure your **Buzzer** device is listed.
![Zetta Browser with Piezo Attached](/images/projects/security_system/screens/browser-piezo.png){:.zoom}

1. Click the `beep` button.

1. Ensure that your buzzer buzzed and the device state changed in the Zetta Browser visualization.

   > **help**{:.icon} Didn't hear a beep? Double check your wiring and make sure there were no errors reported.

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

3. Create a circuit between the Edison and the microphone.

    From                 | Wire                     | To  
    :----                |:-----:                   |----:
    Breadboard **H18**   |**Red**                   |Edison **3.3V**
    Breadboard **H19**   |**2.2k&#8486;** Resistor  |Breadboard **-**
    Breadboard **H20**   |**Green**                 |Edison **A0**
    {:.wiring}

   > **help**{:.icon} Don't know how to read resistor values? Read the [How to Read Resistor Values](/guides/2014/10/13/2014.html) guide.

After assembling the microphone hardware, your project should look similar to the images below.

![The Connected Microphone](/images/projects/security_system/hardware/microphone_birdseye.jpg){:.fritzing}
![The Connected Microphone](/images/projects/security_system/hardware/microphone_low.jpg){:.fritzing}

# Write Microphone Software

1. From the your PC's command line, install the Zetta device driver for the microphone.

   ```bash
   npm install zetta-microphone-edison-driver --save
   ```

1. In the `server.js` file, write Zetta code to `require` and `use` the `Microphone` driver on Edison's analog pin `0`.

   Add **line 3**:

   ```javascript
   var Microphone = require('zetta-microphone-edison-driver');
   ```
   Add **line 7**:

   ```javascript
   .use(Microphone, 0)
   ```

1. Ensure `server.js` looks like the code below.

   ```javascript
   var zetta = require('zetta');
   var Buzzer = require('zetta-buzzer-edison-driver');
   var Microphone = require('zetta-microphone-edison-driver');

   zetta()
     .use(Buzzer, 3)
     .use(Microphone, 0)
     .listen(1337, function(){
       console.log('Zetta is running at http://localhost:1337');
     });
   ```

1. Deploy the new code using the `edison-cli`

   ```bash
   edison-cli -H 10.0.1.15 deploy

   and restart

   edison-cli -H 10.0.1.15 start
   ```

1. When Zetta discovers the microphone, Zetta will log a message about the device to the output.

   ```bash
   Zetta is running at http://localhost:1337
   {TIMESTAMP} [scout] Device (buzzer) {GUID} was provisioned from registry.
   {TIMESTAMP} [scout] Device (microphone) {GUID} was discovered
   ```
   {:.language-bash-noln}

## Soundcheck the Microphone

1. Open the Zetta Browser and ensure your **Microphone** device is listed.
   ![Zetta Browser root with Microphone](/images/projects/security_system/screens/browser-microphone.png){:.zoom}

1. In the Zetta Browser, click on the **Microphone** link to open a detailed view of the device.

   ![Zetta Browser root with Microphone](/images/projects/security_system/screens/zetta-browser-microphone-show.png){:.zoom}

1. Make a noise near or gently tap on the microphone.

1. Ensure the values and waveform for the `:volume` characteristic in the Zetta Browser are streaming over time and change as you make noise.

# Step #4: Secure the Area

## Create Security App File and Folder

1. From your PC's command line, create the app file and directory.

   ```bash
   mkdir apps
   touch apps/app.js
   ```
   {:.language-bash-noln}

## Write  Security App Logic

1. Write the app logic in `apps/app.js`.

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({ type: 'buzzer' });
  var microphoneQuery = server.where({ type: 'microphone' });

  server.observe([buzzerQuery, microphoneQuery], function(buzzer, microphone){
    microphone.streams.volume.on('data', function(msg){
      if (msg.data > 600) {
        buzzer.call('turn-on-pulse', function(){});
      } else {
        buzzer.call('turn-off', function(){});
      }
    });
  });
}
```

## Use Security App in the Zetta Server

1. Edit the `server.js` file. Add Zetta code to `require` and `use` the `app` from the `apps` folder.

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
   var Buzzer = require('zetta-buzzer-edison-driver');
   var Microphone = require('zetta-microphone-edison-driver');

   var app = require('./apps/app');

   zetta()
   .use(Buzzer, 3)
   .use(Microphone, 0)
   .use(app)
   .listen(1337, function(){
     console.log('Zetta is running at http://localhost:1337');
   });
   ```

## Secure the Area

1. Deploy the new code using the `edison-cli`

   ```bash
   edison-cli -H 10.0.1.15 deploy

   and restart

   edison-cli -H 10.0.1.15 start
   ```

1. Make a noise near or gently tap on the microphone.

1. Ensure that the alarm beeps when you make a loud noise.

1. Open the Zetta Browser to observe state changes:

# Step #5: Link to the Internet

## Create link between two Zetta nodes

1. Ensure `server.js` looks like the code below.

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-edison-driver');
var Microphone = require('zetta-microphone-edison-driver');

var app = require('./apps/app');

zetta()
  .use(Buzzer, 3)
  .use(Microphone, 0)
  .use(app)
  .link('http://hello-zetta.herokuapp.com/')
  .listen(1337, function(){
    console.log('Zetta is running at http://localhost:1337');
  });
```

1. Deploy the new code using the `edison-cli`

   ```bash
   edison-cli -H 10.0.1.15 deploy

   and restart

   edison-cli -H 10.0.1.15 start
   ```

## Investigate a new Zetta server

1. Open the Zetta Browser from a new location.

  [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

2. Observe the state changes occurring, and interact with the system from the open internet.

# Step #6: Blink the LED

## Assemble Light Hardware

![Microphone Hookup Diagram](/images/projects/security_system/hookup_diagram_step_3.png){:.fritzing}

1. Add your LED to the breadboard.
  * *Annode* (long leg) on Breadboard **A26**
  * *Cathode* (short leg) on Breadboard **A28**
  * Place AUD on Breadboard **F20**
2. Connect your wires in the following way:

    From                 | Wire                 | To  
    :----                |:-----:               |----:
    Breadboard **I26**   |Orange                |Edison **D13**
    Breadboard **C26**   |47&#8486; Resistor    |Breadboard **G26**
    Breadboard **E28**   |Black                 |Breadboard's negative column
    {:.wiring}

Your hardware setup should look like this when you're done:

![The Connected Microphone](/images/projects/security_system/hardware/led_birdseye.jpg){:.fritzing}
![The Connected Microphone](/images/projects/security_system/hardware/led_low.jpg){:.fritzing}

# Write Light Code

## Create Device File and Folder

We'll want to setup the directory where our driver will be located. Create a `/devices` directory, and within it create another folder called `led`. This folder will contain one file - `index.js`.

Use your PC's command line and run the following terminal commands to create the files and folder that you need:

```bash
mkdir devices
mkdir devices/led
```

```bash
touch devices/led/index.js
```

You should end up with a file structure that looks like so:

<pre><code class="bash-noln">
└── zetta-security-system
    ├── apps
    │   └── app.js
    ├── devices
    │   └── led
    │       └── index.js
    ├── package.json
    └── server.js
</code></pre>

## Write the LED Driver Code

1. Install `zetta-device` module, run:

```bash
npm install zetta-device --save
```

1. Install `mraa-js` module used to talk to the Edison's pins, run:

```bash
npm install mraa-js --save
```

1. Ensure `index.js` looks like the code below.

```javascript
var Device = require('zetta-device');
var util = require('util');
var mraa = require('mraa-js');

var LED = module.exports = function(pin) {
  Device.call(this);
  this.pin = pin;
  this._led = new mraa.Gpio(this.pin);
};
util.inherits(LED, Device);

LED.prototype.init = function(config) {
  config
    .type('led')
    .state('off')
    .name('led ' + this.pin)
    .when('off', { allow: ['turn-on'] })
    .when('on', { allow: ['turn-off'] })
    .map('turn-on', this.turnOn)
    .map('turn-off', this.turnOff);

  this._led.dir(mraa.DIR_OUT);
};

LED.prototype.turnOn = function(cb) {
  this._led.write(1);
  this.state = 'on';
  cb();
};

LED.prototype.turnOff = function(cb) {
  this._led.write(0);
  this.state = 'off';
  cb();
};

```

## Run The Zetta Server

1. Ensure `server.js` looks like the code below.

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-edison-driver');
var Microphone = require('zetta-microphone-edison-driver');
var LED = require('./devices/led');

var app = require('./apps/app');

zetta()
  .use(Buzzer, 3)
  .use(Microphone, 0)
  .use(LED, 13)
  .use(app)
  .listen(1337, function(){
    console.log('Zetta is running at http://localhost:1337');
  });

```


## Adding to Our App

1. Ensure `app.js` looks like the code below.

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({ type: 'buzzer' });
  var microphoneQuery = server.where({ type: 'microphone' });
  var ledQuery = server.where({ type: 'led' });

  server.observe([buzzerQuery, microphoneQuery, ledQuery], function(buzzer, microphone, led){
    microphone.streams.volume.on('data', function(msg){
      if (buzzer.state === 'off' && msg.data > 600) {
        buzzer.call('turn-on-pulse', function(){});
        led.call('turn-on', function(){});

        setTimeout(function() {
          buzzer.call('turn-off', function(){});
        }, 3000);
      }
    });
  });
}

```

## Test Interaction

1. Deploy the new code using the `edison-cli`

   ```bash
   edison-cli -H 10.0.1.15 deploy

   and restart

   edison-cli -H 10.0.1.15 start
   ```

1. Make a noise near or gently tap on the microphone.

1. Ensure that the alarm sounds for approximately 3 seconds, and the LED turns on.

1. Open the Zetta Browser to observe state changes:

   [http://browser.zettajs.io/#/overview?url=http:%2F%2hello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)
