---
layout: project
title: Home Security
author: Matt Dobson
difficulty: experienced
duration: 1-3 hours
description: >
  Create an API-enabled, home security system with a sound detector, piezo speaker, an LED and a BeagleBone Black.
repo: https://github.com/alanguir/zetta-security-system/
---

# Ingredients

![All Materials](/images/projects/security_system/hardware/empty_low.jpg){:.zoom .full}

<script src="https://www.sparkfun.com/wish_lists/95647.js"></script>

> [**cart**{:.icon} Buy the Home Security Kit from SparkFun](https://www.sparkfun.com/wish_lists/95647)

# Directions

1. [Setup the BeagleBone](#step-1-setup-the-beaglebone)
1. [Buzz the Piezo Buzzer](#step-2-buzz-the-piezo-buzzer)
1. [Soundcheck the Microphone](#step-3-soundcheck-the-microphone)
1. [Write the Security App](#step-4-write-the-security-app)
1. [Blink the LED](#step-5-blink-the-led)
1. [Next Steps](#next-steps)
1. [Get Help](#get-help)
{:.steps}

# Step #1: Setup the BeagleBone

## Connect the BeagleBone

1. Follow the guide on [How to Connect a BeagleBone to the Internet via a PC](/guides/2014/10/03/BeagleBone.html).
1. Open the browser-based Cloud9 IDE at [http://beaglebone.local:3000](http://beaglebone.local:3000).
1. Click your mouse in the BeagleBone's IDE console.
![Cloud9 Splash Screen](/images/projects/security_system/screens/bash_callout.png){:.zoom}

1. Ping Google from within the Cloud9 IDE console to ensure the BeagleBone is connected to the Internet.

   ```bash
   ping google.com
   ```

   You should see a successful ping.

   ```
   PING google.com (74.125.225.0): 56 data bytes
   64 bytes from 74.125.225.0: icmp_seq=0 ttl=55 time=93.360 ms
   64 bytes from 74.125.225.0: icmp_seq=1 ttl=55 time=40.258 ms
   ```
   {:.language-bash-noln}

> **caution**{:.icon} All console commands are to be executed on the BeagleBone via the Cloud9 IDE. A common mistake is to issue the commands on your PC terminal, which won't get the project working on the BeagleBone and should be avoided.

> **help**{:.icon} Can't ping Google? Refer again to the [BeagleBone guide](/guides/2014/10/03/BeagleBone.html) or [ask for help](/community/#discussion).

## Clone the Starter Code to the BeagleBone

1. From within the Cloud9 IDE console, clone [the starter code](https://github.com/zettajs/zetta-security-system/) to your BeagleBone.

   ```bash
   git clone https://github.com/zetta/zetta-security-system.git
   ```

> **info**{:.icon} By default your clone will be stored in the `/var/lib/cloud9/` folder, which is recommended for working with the Cloud9 IDE.

## Install Zetta

1. From within the Cloud9 IDE console, `cd` to `zetta-security-system`.

   ```bash
   cd zetta-security-system
   ```

1. From within the Cloud9 IDE console, [install Zetta with NPM](/reference/2014/10/12/npm.html).

   ```bash
   npm install
   ```

> **clock**{:.icon} Running `npm install` on the BeagleBone can take several minutes. Move ahead with the hardware steps during installation.

# Step #2: Buzz the Piezo Buzzer

The Piezo Buzzer is for making noise, and will function as the sound component of our alarm. The buzzer will get us going with the basics of Zetta. 

# Assemble Piezo Buzzer Hardware

We need to attach our buzzer to our BeagleBone so Zetta can control it. Connect your hardware like this:

![Piezo Hookup Diagram](/images/projects/security_system/hookup_diagram_step_1.png){:.fritzing}

If you use fritzing, you can download the full [Fritzing Diagram](/images/projects/security_system/fritzing/hookup_diagram.fzz) to reference throughout this project. 

> New to using a solderless breadboard? Get up to speed by reading our [How to Breadboard](/guides/2014/10/07/Breadboard.html) guide.

1. Add your piezo buzzer to the breadboard.
  * put positive pin on A3 of breadboard
  * put negative pin on A6 of breadboard
  
2. Connect your wires in the following way:

    From                  | Wire       | To  
    :----                 |:-----:     |----: 
    Breadboard **E3**     |White       |BeableBone **P9_14**
    Breadboard **E6**     |Black       |Breadboard Neg Rail
    Breadboard Neg Rail   |Black       |BeableBone **P9_01**
    {:.wiring}


Your hardware setup should look like this when you're done:

![The Connected Piezo Buzzer](/images/projects/security_system/hardware/piezo_birdseye.jpg){:.zoom}
![The Connected Piezo Buzzer](/images/projects/security_system/hardware/piezo_low.jpg){:.zoom}

> **TIP**
> The BeagleBone pinout can be confusing. See our [BeableBone guide](/guides/2014/10/03/BeagleBone.html) for a pinout diagram and other help with connecting hardware to it.

# Write Piezo Buzzer Code

Follow along to add code to your security system.

{::comment}

> **list**{:.icon} **Step**
> Don't want to type? Optionally add this section's code automatically by moving to step 1 in your git repo with `git checkout -f step-1`. Moving to step one will loose modifications you've made so far.

{:/comment}

## Retrieving The Driver

Drivers in Zetta are distributed through the Node Package Manager - NPM. We'll be building a driver from scratch later in this project, but for now let's just pull this one off the shelf. In the Cloud9 IDE on yor BeagleBone, run this command:

```md
npm install zetta-buzzer-bonescript-driver --save
```

> Note the `--save` switch at the end of the command

> **TIP**
> Make sure you're in the right project folder on the BeagleBone when you try to run this command. The Cloud9 command prompt should look like this :
> `root@beaglebone:/var/lib/cloud9/zetta-security-system/#`

The driver you just downloaded represents a piezo buzzer in software. It's a state machine that is comprised of the `on`, `off` states. When `on` it will turn the buzzer on, and when `off` it will turn the buzzer off. The changes in state are represented by transitions. Transitions are functions in Zetta that are called when the state of an object changes. Our piezo element has `on`, `off`, and `beep` as transitions. `on` and `off` change to their corresponding states, and `beep` will swap the state from `off` to `on` and back again.

> **DID YOU KNOW?**
> Every module you'll use in this tutorial is open source. This one can be found here https://github.com/zettajs/zetta-buzzer-bonescript-driver.

## Setup The Zetta Server

Now it's time to actually create a Zetta server node, and tell it to use the driver we just downloaded. Open up `/var/lib/cloud9/zetta-security-system/server.js` and add the following code:

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');

zetta()
  .use(Buzzer, 'P9_14')
  .listen(1337, function(){
    console.log('Zetta is running at http://beaglebone.local:1337');
  });

```

### What is This Code Doing?

* `var zetta = require('zetta');` requires the Zetta package. It contains all the functionality needed to configure an IoT app.
* `var Buzzer = require('zetta-buzz...` The second line requires the driver for the piezo element.
* `zetta()` initializes an instance of zetta for use in your code.
* `.use()` tells zetta that we want to use a piezo element hooked up to our BeagleBone Black.
* `.listen()` tells zetta that we want our API server to listen at port `1337`, and includes an optional callback.

## Running the Server Node

Save changes to `server.js` and start your server by running the following in your Cloud9 console:

```md
node server.js
```

When Zetta successfully connects to the piezo buzzer, you will see a log message that looks something like this:

```bash
Zetta is running at http://beaglebone.local:1337
TIMESTAMP [scout] Device (buzzer) SOME-GUID was provisioned from registry
```

  * TIMESTAMP will be the time the log was generated
  * SOME-GUID will be a 32 digit globally uniqe id.

![The terminal after running server.js for the first time](/images/projects/security_system/screens/running_zetta.png){:.zoom}

> **TIP**
> It can take up to 20 seconds for the BeagleBone to load and run the Zetta node. You'll know you're ready once you see Zetta's log messages showing up in your Cloud9 console.

# Test Interaction

## Make it Beep!

Now the moment you've been waiting for...buzzing that buzzer! To do this, we'll point the Zetta browser to the Zetta server node that's running on the BeagleBone.

> View your app in the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337)

It only takes a few seconds to connect. Once you do, you will see something like this:

![Zetta Browser with Piezo Attached](/images/projects/security_system/screens/browser-piezo.png){:.zoom}

> Not connecting? See our [Zetta Browser Guide](/guides/zetta-browser.html)

Click the __beep__ button to make your buzzer beep!

> If you don't hear any beeping, double check your wiring and make sure there were no errors when you started up Zetta!

## The Buzzer's API

In Zetta every device gets an API automatically generated for it. Our API represents the device in it's current state and the actions that can be taken on it. We use a special hypermedia type known as [Siren](http://sirenspec.org/) to represent devices and servers. You can see a response from your API now by clicking on "buzzer" in the Zetta browser.

![Piezo Buzzer Detail Page](/images/projects/security_system/screens/browser-piezo-show.png){:.zoom}

This view has lots of extra details about our Pieze Buzzer, including it's full API response. Scroll down in the Zetta browser to see the API request & response that generated this very detail page.

> Learn more about Zetta's device API by reading the [Device API Tour](/guides/device-api-tour) guide

## What Just Happened?!

We just got Zetta up and running! We installed a device in software, physically connected it, and controlled it's behavior with the Zetta browser - which uses the API Zetta constructed for us. Not too shabby for 4 terminal commands and 5 lines of javascript. The Internet of Things is bending to your will already.

# Step #3: Soundcheck the Microphone

Next up is our microphone sensor. This will detect the sound of possible intruders, and serve as another characterisitic that we can use to trigger our alarm. In this section connect another device, and learn how to view it's streaming data in the Zetta browser.

# Assemble Microphone Hardware

Here's what you should have once you add your microphone:

![Microphone Hookup Diagram](/images/projects/security_system/hookup_diagram_step_2.png){:.fritzing}
  
1. If your microphone does not have headers attached, solder them in place so the microphone can be added to the breadboard
2. Add your microphone to the breadboard.
  * Place VCC on Breadboard **F18**
  * Place GND on Breadboard **F19**
  * Place AUD on Breadboard **F20**
3. Connect your wires in the following way:

    From                 | Wire                 | To  
    :----                |:-----:               |----: 
    Breadboard **H18**   |Red                   |BeableBone **P9_32**
    Breadboard **J19**   |2.2k&#8486; Resistor  |Breadboard Neg Rail
    Breadboard **H20**   |Green                 |BeableBone **P9_36**
    {:.wiring}

Your hardware setup should look something like this when you're done:

![The Connected Microphone](/images/projects/security_system/hardware/microphone_birdseye.jpg){:.fritzing}
![The Connected Microphone](/images/projects/security_system/hardware/microphone_low.jpg){:.fritzing}


# Write Microphone Code

Follow along to add code to your security system.

{::comment}

> **list**{:.icon} **Step**
> Don't want to type? Optionally add this section's code automatically by moving to step 2 in your git repo with `git checkout -f step-2`. Moving to step two will loose modifications you've made so far.

{:/comment}

## Retrieving The Driver

In the Cloud9 IDE on yor BeagleBone, run this command:

```md
npm install zetta-microphone-bonescript-driver --save
```

> Note the `--save` switch at the end of the command. This will add `Zetta-microphone-bonescript-driver` to your dependancy list in `package.json`

> **TIP**
> Make sure you're in the right project folder on the BeagleBone when you try to run this command. The Cloud9 command prompt should look like this after you type in the command:
> `root@beaglebone:/var/lib/cloud9/zetta-security-system/$ npm install zetta-microphone-bonescript-driver --save`

## Run The Zetta Server

Modify `server.js` to look like this:

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

### What is This Code Doing?

We added two lines to our `server.js` file.

```javascript
var Microphone = require('zetta-microphone-bonescript-driver');
```

This includes the driver we just installed so that it's available to Zetta.

```javascript
.use(Microphone, 'P9_36')
```
This instructs Zetta to use the `Microphone` driver, and to look for a device that uses that driver on pin `P9_36`.


# Test Interaction

## Running the Server Node

Save changes to `server.js` and start your server by running this in your Cloud9 console:

    node server.js

> If your server was still running from before, make sure to shut it down by pressing **CMD+C** before retyping the command above

This time Zetta will log two messages, one for each device that connects:

![Running Your Server](/images/projects/security_system/screens/c9_two_devices.png){:.zoom}

> **TIP**
> It can take up to 20 seconds for the BeagleBone to load and run the Zetta node. You'll know you're ready once you see "Zetta is running on..." show up in your console.

## Monitor the Values

Once again, we need to point the Zetta browser to the Zetta server node that's running on the BeagleBone.

> View your app in the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337)

![Zetta Browser root with Microphone](/images/projects/security_system/screens/browser-microphone.png){:.zoom}

Now click on the device name `Microphone` in the Zetta browser to get a more detailed view of the device. Try making noise or tapping on the microphone to see the waveform change in real time.

![Zetta Browser root with Microphone](/images/projects/security_system/screens/zetta-browser-microphone-show.png){:.zoom}

## What Just Happened?!

We connected another device to our growing security system. This one, a microphone, produces streaming data. This causes us to see a different type of visualization in the Zetta browser, and changes its API to reference a websocket monitor.

# Step #4: Write the Security App

In this section you'll learn about creating an app in Zetta. You'll also learn about streaming sensor data values, and taking advantage of those readings in your Zetta app. No new hardware in this section - we're going to write code that creates an interaction between the existing Microphone and Piezo Buzzer hardware that we setup in the previous two sections.

# Security App Code

Follow along to add code to your security system.

{::comment}

> **list**{:.icon} **Step**
> Don't want to type? Optionally add this section's code automatically by moving to step 3 in your git repo with `git checkout -f step-3`. Moving to step three will loose modifications you've made so far.

{:/comment}

##Creating the App

1 - Apps in Zetta allow us to orchestrate interactions between devices. To create one, make a new file in your project's `apps` folder:

    mkdir apps
    touch apps/app.js

Now double-click on the new `app.js` file in your Cloud9 IDE so we can edit it and add functionality.

{::comment}

> **TIP**
> You may have to refresh the file tree in the Cloud9 IDE to see the `apps` folder creating by checking out step-3. You can do that by Right/CTRL clicking on the file pane and selecting  `Refresh` from the contextual menu.

{:/comment}

2 - The first component of our app is an export statement. This is so that we can keep our apps modular and separated from the rest of our code. Edit `app.js` so it looks like this:

```javascript
module.exports = function(server) {
  //app goes here
}
```

3 - Next, we create our first query. Zetta uses queries to look for devices, or wait for devices to come online that fill all the parameters given. Our first query tells Zetta to retrieve the buzzer for us, the second one retrieves the Microphone sensor.

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

```md
mkdir devices
mkdir devices/led
```

```md
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
