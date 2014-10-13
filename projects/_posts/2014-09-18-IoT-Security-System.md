---
layout: project
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
1. [Write the Security App](#step-4-write-the-security-app)
1. [Blink the LED](#step-5-blink-the-led)
1. [Next Steps](#next-steps)
1. [Get Help](#get-help)
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

   <pre>[[!!!Put a screenshot here of the IDE with an arrow showing where to click.]]</pre>

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
   So that `server.js` looks like the code below.
   
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

# Step #4: Write the Security App

##Write app.js

1. From the Cloud9 IDE console, create the app file and directory.

    ```bash
    mkdir apps
    touch apps/app.js
    ```
    {:.language-bash-noln}

1. From the Cloud9 IDE, double-click on the new `app.js` file to edit it.

1. Write the export statement for the app to keep it modular.

    ```javascript
    module.exports = function(server) {
      //app goes here
    }
    ```

1. Write our first query. Zetta uses queries to look for devices, or wait for devices to come online that fill all the parameters given. Our first query tells Zetta to retrieve the buzzer for us, the second one retrieves the Microphone sensor.

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var microphoneQuery = server.where({type: 'microphone'});

}
```

4 - The `server` variable is an instance of Zetta. We can use functionality attached to it to search for devices. We can use the method `server.observe()` to waits for devices that fit queries given in the first argument to come online, and then fire a callback.

  * We want the callback function to fire when `"buzzer"` and `"microphone"` devices come online.
  * The function passes in the state machines of the devices in as individual arguments.

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var microphoneQuery = server.where({type: 'microphone'});

  server.observe([buzzerQuery, microphoneQuery], function(buzzer, microphone){
    //do something with the devices after we find them

  });
}
```

5 - Now we can work with our buzzer and microphone inside the `observe()` callback. Our microphone's driver defines it as having streams with volume. We'll listen for a `"data"` event to happen on a `"volume"` *stream*. Once we get that data, we want to test to see if value is above `10`. If it is, call the `"turn-on"` transition on the buzzer.

When we're all done, this is what our `app.js` file should look like:

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var microphoneQuery = server.where({type: 'microphone'});
  server.observe([buzzerQuery, microphoneQuery], function(buzzer, microphone){

    microphone.streams.volume.on('data', function(msg){
      if (msg.data > 20) {
        buzzer.call('turn-on-pulse', function() {});
      } else {
        //buzzer.call('turn-off', function() {});
      }
    });

  });
}
```

# Load Your App When Zetta Runs

After you're done writing your app, you need to make sure it's included in your server file. Update `server.js` to look like so:

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

We added two lines of code. Here's what they do:

Line 5 includes our app. Because it's built like other node modules (remember `module.exports`?), we just have this single additional `require`. This includes our app like a library and makes it available to use later.

```javascript
var app = require('./apps/app');
```

Line 10, the third `.use()` function can determine what type of module you pass into it, and is smart enough to know wheter you're passing it a device driver or an app.

```javascript
.use(app)
```

You must both `require` your `app.js` file, and `use()` it in order for Zetta to execute it at runtime.

# Test Interaction

## Running the Server Node

Save your code, and rerun Zetta with `node server.js`. Now lets head back over to the Zetta browser to see this new interaciton at work. The browser should look just as it did before:

![Zetta Browser root with Microphone](/images/projects/security_system/screens/browser-microphone-2.png){:.zoom}

## Make it Beep! (Again!)

Just like before, pressing the `beep` in the Zetta browser button will cause your piezo buzzer to make sound. Click on the `microphone` device to show the detail view, and make a loud noise (like a clap), or just tap on the top of the microphone. Whenever you see a spike in the graph, you should also hear the piezo buzzer sound.

![Zetta Browser root with Microphone](/images/projects/security_system/screens/browser-microphone-interaction.png){:.zoom}

## What Just Happened?!

We wrote an app to coordinate actions between devices connected to Zetta. The app used Zetta queries to find devices registered to our node, and `server.observe()` to guarantee the devices were available before trying to run logic that included them.

Specifically, we told Zetta to watch the volume `stream` of our microphone, and to trigger `turn-on-pulse` for the piezzo device when the microphone's volume goes above `20`.

# Step #5: Blink the LED

In this next section, we're going to add an LED to our security system. To do this, we'll take you through writing your own driver. Drivers use a state machine model to represent devices in Zetta. Being able to write your own drivers in Zetta will be key to expanding your IoT system to include any devices that you want.

# Assemble Light Hardware

Here's what you should have once you add your microphone:

![Microphone Hookup Diagram](/images/projects/security_system/hookup_diagram_step_3.png){:.fritzing}

1. Add your LED to the breadboard.
  * *Annode* (long leg) on Breadboard **A26**
  * *Cathode* (short leg) on Breadboard **A28**
  * Place AUD on Breadboard **F20**
2. Connect your wires in the following way:

    From                 | Wire                 | To  
    :----                |:-----:               |----: 
    Breadboard **I26**   |Orange                |BeableBone **P9_41**
    Breadboard **C26**   |47&#8486; Resistor    |Breadboard **G26**
    Breadboard **E28**   |Black                 |Breadboard's negative column
    {:.wiring}

Your hardware setup should look like this when you're done:

![The Connected Microphone](/images/projects/security_system/hardware/led_birdseye.jpg){:.fritzing}
![The Connected Microphone](/images/projects/security_system/hardware/led_low.jpg){:.fritzing}


# Write Light Code

Follow along to add code to your security system.

{::comment}

> **list**{:.icon} **Step**
> Don't want to type? Optionally add this section's code automatically by moving to step 4 in your git repo with `git checkout -f step-4`. Moving to step four will loose modifications you've made so far.

{:/comment}

## Setup

We'll want to setup the directory where our driver will be located. Create a `/devices` directory, and within it create another folder called `led`. This folder will contain one file - `index.js`. 

Use the Cloud9 GUI, or run the following terminal commands to create the files and folder that you need:

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
    │   └── app.js
    ├── devices
    │   └── led
    │       └── index.js
    ├── package.json
    └── server.js
</code></pre>

## Write the LED Driver Code

> For a full explanation of the follow code, see our [How Drivers Work](/guides/2014/10/08/How-Drivers-Work.html) guide.

Your final `/devices/led/index.js` file should look like this:

```javascript
var Device = require('zetta').Device;
var util = require('util');
var bone = require('bonescript');

var Led = module.exports = function(pin) {
  Device.call(this);
  this.pin = "P9_41";
};
util.inherits(Led, Device);

Led.prototype.init = function(config) {
  config
    .state('off')
    .type('led')
    .name('LED')
    .when('on', { allow: ['turn-off', 'toggle'] })
    .when('off', { allow: ['turn-on', 'toggle'] })
    .map('turn-on', this.turnOn)
    .map('turn-off', this.turnOff)
    .map('toggle', this.toggle);

  //Everything is off to start
  bone.pinMode(this.pin, bone.OUTPUT);
  bone.digitalWrite(this.pin, 0);
};

Led.prototype.turnOn = function(cb) {
  var self = this;
  bone.digitalWrite(this.pin, 1, function() {
    self.state = 'on';
    cb();
  });
};

Led.prototype.turnOff = function(cb) {
  var self = this;
  bone.digitalWrite(this.pin, 0, function() {
    self.state = 'off';
    cb();
  });
};

Led.prototype.toggle = function(cb) {
  if (this.state === 'on') {
    this.call('turn-off', cb);
  } else {
    this.call('turn-on', cb);
  }
};
```



## Run The Zetta Server

We need to tell Zetta about our custom device. To do that, we require the LED device and pass it into another `.use()` function, similar to the modules we've already used (lines 4 and 11):

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');
var Microphone = require('zetta-microphone-bonescript-driver');
var LED = require('./devices/led');

var app = require('./apps/app');

zetta()
  .use(Buzzer, 'P9_14')
  .use(Microphone, 'P9_36')
  .use(LED, 'P9_41')
  .use(app)
  .listen(1337, function(){
    console.log('Zetta is running at http://beaglebone.local:1337');
  });

```


## Adding to Our App

Our app doesn't change much either. Add another query that looks for a device with type of `"led"` and add it into the currently orchestrated interactions (also lines 4 and 11): 

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var microphoneQuery = server.where({type: 'microphone'});
  var ledQuery = server.where({type: 'led'});

  server.observe([buzzerQuery, microphoneQuery, ledQuery], function(buzzer, microphone, led){

    microphone.streams.volume.on('data', function(msg){
      if (msg.data > 20) {
          buzzer.call('turn-on-pulse', function() {});
          led.call('turn-on', function(){});
        } 
    });

  });
}
```

# Test Interaction

## Running the Server Node

Now's the time to test our fully featured security system. Head back to Cloud9's terminal and run your Zetta server:

    node server.js

> View your app in the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337)

As you can see, the LED is now another device that we can interact with in the Zetta browser. 

![The LED is now visible in the Zetta browser](/images/projects/security_system/screens/browser-led.png){:.zoom}

By now, you should also be able to notice the colored bars near the top of the streen in the Zetta browser. This is called Zetta's "Wampum Belt", and you can read more about that in our [Zetta Browser Guide](/guides/zetta-browser.html#wampum-belt).

## Make it Beep AND Light Up

The LED light has become another part of our security system. We can interact with it now that it is connected and we have a custom driver to handle that interaction. Setting off the alarm as before now triggers both the buzzer *and* the light. Clap (or make some loud noise) near the microphone to set off alarm. 

## What Just Happened?!

We described a state machine for an LED, and added it to our server. We also queried for this custom device in our app, and added it to the list of interactions that get triggered when our sound alarm is triggered. Devices in Zetta are described completely in javascript. This means that there are no configuration files to keep track of - logic can go right into the state machines when you describe them! 

# 6. Next Steps

1. Wire up our Twilio Driver to send a text message when the alarm goes off!
2. Replace the LED with WeMo to control a real light!
3. Build an app to consume your new alarm API!

# 7. Getting Help

If you're going through this project and run into an issue, please feel free to use these methods to reach out and contact us!

* matt@apigee.com
* [https://groups.google.com/forum/#!forum/zetta-discuss]()
* [https://github.com/zettajs/zetta/issues]()
* [Reference Documentation: http://zettajs.github.io/]()
