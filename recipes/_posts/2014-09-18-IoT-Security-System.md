---
layout: recipe
title: Home Security
author: Matt Dobson
difficulty: experienced
---   

This recipe will guide you through building an IoT Security system using Zetta. In it, we'll cover all the basic concepts of zetta. It's for someone getting their hands dirty with zetta for the first time, or someone looking for a basic implementation of zetta to start hacking on. We won't be replacing any professional security systems just yet, but it's a start.

> This recipe is hands on - it requires writing software and working with hardware. 

> **clockwise**{:.icon} Estimated time to complete is 1-3 hours. 

# Materials

These are the materials we use in this tutorial. You can order the complete kit from sparkfun: 

> [**cart**{:.icon} Order the Complete Kit](https://www.sparkfun.com/wish_lists/95647) 

You can also substitute your own parts if you're feeling adventurous. 

Here's the parts list:  

<script src="https://www.sparkfun.com/wish_lists/95647.js"></script>

# Setup
    
## Get started on beaglebone

This project uses the Beaglebone Black Rev C. Before you can get started with your home security system, you need to make sure your Beaglebone is working and connected. 

  > Get your Beaglebone up and running
  > [http://beagleboard.org/getting-started](http://beagleboard.org/getting-started)  
  
Once your board has connected, connect to it and launch it's Cloud9 IDE

## Download the starter code

Clone [this example repo](https://github.com/alanguir/zetta-security-system/) to your beaglebone from the terminal in the Cloud9 IDE - we'll be adding to it for the rest of the tutorial

```bash
root@beaglebone:/var/lib/cloud9/$ git clone https://github.com/alanguir/zetta-security-system.git
```

  > **TIP**
  > Make sure you run all commands in the beaglebone's terminal in your browser from the Cloud9 IDE. Do not do this from your regular terminal on your computer. 
  
  > You can optionally follow along without copying this recipe's code by stepping through this repos git history. Run `git checkout -f step-0` to get started down that path, otherwise just follow along. 

{::comment }
###Share your internet connection

Turn on internet sharing for your system, and share it with the B3

Run these commands: 

```bash

root@beaglebone:/var/lib/cloud9# dhclient usb0

```

ping to test

change docs so console.log uses beaglebone.local

may need to use `npm cache clean`
{:/comment}

### Install Zetta 

Navigate to the folder for the repo you just cloned

```bash
/$ cd zetta-security-system
```

Now, run this command 

    zetta-security-system/$ npm install
    
This will retrieve all the packages specified in `package.json`, and install them on your beaglebone. 

> **TIP**
> Running `npm install` can take several minutes due to the low speed of the beaglebone's built in flash memory. It's OK to move ahead with connecting hardware while you wait for this to complete. 

*Congratulations!* We just installed a shell zetta app. You could run it now, but it won't do much yet. Follow the rest of this recipe to add the code you'll need to get it working.

# Recipe Steps
   
1. [Add the Piezo Buzzer](#add-the-piezo-buzzer)
   This element will get us going with the basics of Zetta. This step will have us dealing with `npm` and `drivers`.
2. [Add the microphone](#add-the-microphone)
   This will detect sound of possible intruders, and serve as a characterisitic that we can use to trigger our alarm.
3. [Creating the Security App](#creating-the-security-app)
   Coordinating interactions between the buzzer and the microphone
4. [Turn On The Lights](#turn-on-the-lights)
   Drivers use a state machine model to represent devices in Zetta.
5. [Next Steps](#next-steps)
6. [Getting Help](#getting-help)
{:.steps}
   
#1. Add the Piezo Buzzer

The piezo element is for making noise, and will function as the sound component of our alarm. The buzzer will get us going with the basics of Zetta. This step will have us dealing with `npm` and `drivers` in Zetta. Drivers are a key component of Zetta, and are the building blocks of your IoT app. They represent real world devices in software and follow a state machine model. Drivers are distributed and used in the form of Node.js packages on NPM.

##Hardware
    
We need to attach our buzzer to our beaglebone so zetta can control it. Pins on the Beaglebone Black come in two banks, P8 and P9. Each bank has 46 pins. Here's a pinout diagram: 

![Beaglebone Pinout](http://insigntech.files.wordpress.com/2013/09/bbb_pinouts.jpg){:.zoom}

We'll be using bank P9. Notice that that row of pins along the inner edge of the board are evenly numbered (2, 4, 6, 8 etc...), while the exterior row is odd (1, 3, 5, 7...). Only the first and last pins of each row come with printend numbers - this helps you determine which row is even and odd but also means that you just have to count pins to get to the right one. 

Connect your hardware like this: 

![Piezo Hookup Diagram](/images/recipes/security_system/hookup_diagram_step_1.png){:.fritzing}

  * Add your piezo buzzer to the breadboard.
  * Connect the breadboard's **-** (negative) row to pin **P9-01** on the _beaglebone_.
  * Connect the piezo buzzer's **-** (negative) lead to the **-** row of the _breadboard_.
  * Connect the piezo buzzer's **+** (positive) lead to pin **P9-14** on the _beaglebone_.

Your hardware setup should look like this when you're done: 

![The Connected Piezo Buzzer](/images/recipes/security_system/piezo_layout_01.jpg){:.zoom}
![The Connected Piezo Buzzer](/images/recipes/security_system/piezo_layout_02.jpg){:.zoom}

> **TIP**
> The Beaglebone pinout can be confusing. Using it requires that you to count pins. 
> Check your wiring if you're having connectivity issues later on - chances are you're connected something to the wrong pin. 

## Code

Follow along to add code to your security system. 

> Don't want to type? All this section's code has been added for you if move to step 1 in your git repo with `git checkout -f step-1`. Moving to step one will loose modifications you've made so far. 

### Retrieving The Driver
  
Drivers in Zetta are distributed through the Node Package Manager - NPM. We'll be building a driver from scratch later in this recipe, but for now let's just pull this one off the shelf. In the Cloud9 IDE on yor Beaglebone, run this command: 

    zetta-security-system/$ npm install zetta-buzzer-bonescript-driver --save
    
> Note the `--save` switch at the end of the command    
    
> **TIP**
> Make sure you're in the right project folder on the beaglebone when you try to run this command. The Cloud9 command prompt should look like this after you type in the command: 
> `root@beaglebone:/var/lib/cloud9/zetta-security-system/$ npm install zetta-buzzer-bonescript-driver --save`
  
The driver you just downloaded represents a piezo buzzer in software. It's a state machine that is comprised of the `on`, `off` states. When `on` it will turn the buzzer on, and when `off` it will turn the buzzer off. The changes in state are represented by transitions. Transitions are functions in Zetta that are called when the state of an object changes. Our piezo element has `on`, `off`, and `beep` as transitions. `on` and `off` change to their corresponding states, and `beep` will swap the state from `off` to `on` and back again.

> **TIP**
> Every module you'll use in this tutorial is open source. This one can be found here https://github.com/zettajs/zetta-buzzer-bonescript-driver.

### The Zetta Server

Now it's time to actually create a Zetta server node, and tell it to use the driver we just downloaded. Open up `server.js` and add the following code: 

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');

zetta()
  .use(Buzzer, 'P9_14')
  .listen(1337, function(){
    console.log('Zetta is running at http://beaglebone.local:1337');
  });
  
```

#### What is this code doing?

* The first line requires the Zetta package. This contains all the functionality needed to wire up an IoT app.
* The second line requires the driver for the piezo element.
* The third line initializes an instance of zetta for use in your code.
* The fourth line tells zetta that we want to use a piezo element hooked up to our BeagleBone Black.
* The fifth line tells zetta that we want our API server to listen at port `1337`

#### Running the Server Node

Save changes to `server.js` and start your server by running this in your Cloud9 console: 

    /$ node server.js
    
Zetta will log out this message when it successfully connects to the piezo buzzer: 

![Running Your Server](/images/recipes/security_system/zetta-piezo-terminal.png){:.zoom}

> **TIP**
> It can take up to 20 seconds for the beaglebone to load and run the zetta node. You'll know you're ready once you see "Zetta is running on..." show up in your console. 



In Zetta every device gets an API automatically generated for it. Our API will represent the device in it's current state, and the actions that can be taken on it. We use a special hypermedia type known as [Siren](http://sirenspec.org/) to represent our entities. You should be getting a response from your API now by visiting the url that shows up in your Cloud9 console.

##Interaction
   
###Make it Beep!

Now the moment you've been waiting for...buzzing that buzzer! To do this, we'll point the zetta browser to the zetta server node that's now running on the beaglebone black. 

> View your app in the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fbeaglebone.local:1337)
  
It usually only takes a few seconds to connect. Once you do, you should see something like this: 

![Zetta Browser with Piezo Attached](/images/recipes/security_system/zetta-browser-piezo.png){:.zoom}

Click the __beep__ button to make your buzzer beep!

> If you don't hear any beeping, double check your wiring and make sure there were no errors when you started up zetta!

##What just happened?!

*Congratulations!* We just got zetta up and running! We installed a device in software, physically connected it, and controlled it's behavior through the API zetta constructed for it. Not too shabby for 4 terminal commands and 5 lines of javascript. The Internet of Things is bending to your will already. 

#2. Add the microphone

Next up is our microphone sensor. This will detect the sound of possible intruders, and serve as another characterisitic that we can use to trigger our alarm. In this section connect another device, and learn how to view it's streaming data in the zetta browser. 

##Hardware

Here's what you should have once you add your microphone: 

![Microphone Hookup Diagram](/images/recipes/security_system/hookup_diagram_step_2.png){:.fritzing}

  * Add your microphone to your breadboard
  * Connect the microphone's **VCC** pin to pin **P9-32** on the _beaglebone_.
  * Connect the microphone's **GND** pin to the breadboard's **-** (negative) row with a 2.2k&#8486; resistor
  * Connect the microphone's **AUD** pin to pin **P9-36** on the _beaglebone_.

Your hardware setup should look something like this when you're done: 

![The Connected Microphone](/images/recipes/security_system/piezo_mic-layout_01.jpg){:.fritzing}
![The Connected Microphone](/images/recipes/security_system/piezo_mic-layout_02.jpg){:.fritzing}


## Code

Follow along to add code to your security system. 

> Don't want to type? All this section's code has been added for you if move to step 2 in your git repo with `git checkout -f step-2`. Moving to step one will loose modifications you've made so far. 

### Retrieving The Driver

In the Cloud9 IDE on yor Beaglebone, run this command: 

    zetta-security-system/$ npm install zetta-microphone-bonescript-driver --save
    
> Note the `--save` switch at the end of the command    
    
> **TIP**
> Make sure you're in the right project folder on the beaglebone when you try to run this command. The Cloud9 command prompt should look like this after you type in the command: 
> `root@beaglebone:/var/lib/cloud9/zetta-security-system/$ npm install zetta-microphone-bonescript-driver --save`
  
### The Zetta Server

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

#### What is this code doing?

We added two lines to our `server.js` file. 

```javascript
var Microphone = require('zetta-microphone-bonescript-driver');
```

This includes the driver we just installed so that it's available to zetta.

```javascript
.use(Microphone, 'P9_36')
```
This instructs zetta to use the `Microphone` driver, and to look for a device that uses that driver on pin `P9_36`.

#### Running the Server Node

Save changes to `server.js` and start your server by running this in your Cloud9 console: 

    /$ node server.js
    
> If your server was still running from before, make sure to shut it down by pressing **CMD+C** before retyping the command above

This time zetta will log two messages, one for each device it connects to: 

![Running Your Server](/images/recipes/security_system/zetta-piezo-microphone-terminal.png){:.zoom}

> **TIP**
> It can take up to 20 seconds for the beaglebone to load and run the zetta node. You'll know you're ready once you see "Zetta is running on..." show up in your console. 

##Interaction

###Monitor the values

Once again, we need to point the zetta browser to the zetta server node that's running on the beaglebone. You should just be able to refresh the zetta browser window to see more device - like this: 

![Zetta Browser root with Microphone](/images/recipes/security_system/zetta-browser-piezo-microphone.png){:.zoom}

Now click on the device name `Microphone` in the zetta browser to get a more detailed view of the device. Try making noise or tapping on the microphone to see the waveform change in real time. 

![Zetta Browser root with Microphone](/images/recipes/security_system/zetta-browser-microphone-show.png){:.zoom}

##What just happened?!

We connected another device to our growing security system. This one, a microphone, produces streaming data. This causes us to see a different type of visualization in the zetta browser, and changes its API to reference a websocket monitor. 

#3. Creating the Security App

In this section you'll learn about creating an app in Zetta. You'll also learn about streaming sensor data values, and taking advantage of those readings in your Zetta app.

##Hardware

No new hardware in this section - we're going to create an interaction between the existing Microphone and Piezo Buzzer hardware that we setup in the previous two sections. 

## Code

Follow along to add code to your security system. 

> Don't want to type? All this section's code has been added for you if move to step 3 in your git repo with `git checkout -f step-3`. Moving to step one will loose modifications you've made so far. 

> **TIP** 
> You may have to refresh the file tree in the Cloud9 IDE to see the `apps` folder creating by checking out step-3. You can do that by Right/CTRL clicking on the file pane and selecting  `Refresh` from the contextual menu. 

###Creating your first app

1 - Apps in zetta allow us to orchestrate interactions between devices. To create one, make a new file in your project's `apps` folder:

    /$ touch apps/app.js

Now double-click on the new `app.js` file in your Cloud9 IDE so we can edit it and add functionality. 

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
 
5 - Now we can work with our buzzer and microphone inside the `observe` callback. Our microphone's driver defines it as having streams with volume. We'll listen for a `"data"` event to happen on a `"volume"` *stream*. Once we get get that data, we want to test to see if value is above `10`. If it is, call the `"turn-on"` transition on the buzzer. 

When we're all done, this is what our `app.js` file should look like:

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var microphoneQuery = server.where({type: 'microphone'});
  server.observe([buzzerQuery, microphoneQuery], function(buzzer, microphone){

      microphone.streams.volume.on('data', function(msg){
        if (msg.data > 10) {
          buzzer.call('turn-on', function() {});
        } else {
          buzzer.call('turn-off', function() {});
        }
      });

    });
}
```

### Load your app when zetta runs

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

```javascript
var app = require('./apps/app');
```

This includes our app. Because it's built like other node modules (remember `module.exports`?), we just have this single. This includes our app like a library and makes it available to use later. 

```javascript
.use(app)
```

The `.use()` function can determine what type of module you pass into it, and is smart enough to know wheter you're passing it a device driver or an app. You must both `require` your `app.js` file, and `use` it in order for zetta to use it at runtime. 

#### Running the Server Node

Save your code, and rerun zetta with `node server.js`. Now lets head back over to the zetta browser to see this new interaciton at work. The browser should look just as it did before: 

![Zetta Browser root with Microphone](/images/recipes/security_system/zetta-browser-piezo-microphone.png){:.zoom}

##Interaction

###Make it Beep! (Again!)

Just like before, pressing the `beep` button will cause your piezo buzzer to make sound. Click on the `microphone` device to show the detail view, and make a loud noise (like a clap), or just tap on the top of the microphone. Whenever you see a spike in the graph, you should also hear the piezo buzzer sound. 

##What just happened?!

We wrote an app to coordinate actions between devices connected to zetta. The app used zetta queries to find devices registered to our node, and `server.observe()` to guarantee the devices were available before trying to run logic that included them. 

#4. Turn on the Lights

In this next section, we're going to add an LED to our security system. To do this, we'll take you through writing your own driver. Drivers use a state machine model to represent devices in Zetta. Being able to write your own drivers in Zetta will be key to expanding your IoT system to include any devices that you want.

##Hardware

Here's what you should have once you add your microphone: 

![Microphone Hookup Diagram](/images/recipes/security_system/hookup_diagram_step_3.png){:.fritzing}

  * Add your microphone to your breadboard
  * Connect the microphone's **VCC** pin to pin **P9-32** on the _beaglebone_.
  * Connect the microphone's **GND** pin to the breadboard's **-** (negative) row with a 2.2k&#8486; resistor
  * Connect the microphone's **AUD** pin to pin **P9-36** on the _beaglebone_.

Your hardware setup should look something like this when you're done: 

![The Connected Microphone](/images/recipes/security_system/security_plus_led_01.jpg){:.fritzing}
![The Connected Microphone](/images/recipes/security_system/security_plus_led_02.jpg){:.fritzing}


## Code

Follow along to add code to your security system. 

> Don't want to type? All this section's code has been added for you if move to step 4 in your git repo with `git checkout -f step-4`. Moving to step one will loose modifications you've made so far.  

###Setup
   
We'll want to setup the directory where our driver will be located. In your project you should already have a `/devices` directory. In there create a folder called `led`. This folder will contain one file - `index.js`. You should end up with a file structure that looks like so:

```bash
└── zetta-security-system
    ├── apps
    │   └── app.js
    ├── devices
    │   └── led
    │       └── index.js
    ├── package.json
    └── server.js
```

Use the GUI, or run the following commands to creat the files and folder that you need

    /$ mkdir devices/led
    /$ touch devices/led/index.js

### Writing The Driver

Now we'll create our state machine for use in Zetta. Our LED state machine will be basic. Drawing it out with state machine notation helps. It should look a little like this:

![LED State Machine](/images/recipes/security_system/state_machine.png){:.zoom}

As you can see from the diagram. When our LED is `off` it can only transition to the `on` state, and conversely when the state is `on` it can only transition to `off`.

Our driver will have 4 major parts

  * Dependencies
  * The constructor function
  * An init function to define our state machine
  * Transition functions

#### Dependencies

First we'll require all the necessary libraries we'll need

  * We'll need the Device class to create our driver
  * We'll need the util module for inheritance functionality
  * We'll need bonescript for actually interacting with hardware on the beaglebone
  
Add this to your empty `/devices/led/index.js` file:

```javascript
var Device = require('zetta-device');
var util = require('util');
var bone = require('bonescript');
```

#### The constructor function

Now we'll setup the constructor for our LED. Here you set parameters and initialize different things about the device.

  * We setup to inherit from the Device class to get functionality for API generation.  

Continue by adding this code to your `/devices/led/index.js` file:

```javascript
var Led = module.exports = function(pin) {
  Device.call(this);
  this.pin = pin || 'P9_41';
};

util.inherits(Led, Device);
```

> **TIP**
> `this.pin` uses the pin you specify in `server.js`, or uses the default of **P9_41**

#### An init function to define our state machine

Next we'll implement the init function. This is where you'll implement your state machine.
  
* `state` sets the initial state of your device. We're starting in the **off** state
* `type` sets what the type of the device is. In our case it's `led`.
* `name` sets a human readable name for our device. It's an optional parameter.
* `when` sets up what transitions are available based on the state of the device.
  * `when` our device is in state `"on"` it can only use the `"turn-off"` and `"toggle"` transitions
  * `when` our device is in state `"off"` it can only use the `"on"` and `"toggle"` transitions
* `map` will setup the functions that will be called for particular transitions. Whenever a transition occurs the function it is mapped to will be called.
  * when the `"on"` transition is called we will call the `turnOn` function of this particular class
  * when the `"off"` transition is called we will call the `turnOff` function of this particular class
  * when the `"toggle"` transition is called we will call the `function` function of this particular class
    
Continue by adding this code to your `/devices/led/index.js` file:

```javascript
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
```

> **TIP**
> Any setup you have to do for your device should go inside it's init function, not the constructor

#### Transition functions

Finish up by adding the transition functions. 

* `turnOn` will actually turn on the LED on the BeagleBone. It is provided a callback that you should call once the transition has completed.
* `turnOff` will actually turn off the LED on the BeagleBone. It is provided a callback that you should call once the transition has completed.
* `toggle` will change the led to **off** if it is currently **on**, or **on** if it is currently **off**. It is provided a callback that you should call once the transition has completed.

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

### The Zetta Server

We need to tell zetta about our custom device. To do that, we require the scout module and pass it in with the `use` function. Similar to the modules we've already used.

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


### Adding to our app

Our app doesn't change much either. Add another query that looks for a device with type of `"led"` and add it into the currently orchestrated interactions.

```javascript
module.exports = function(server) {
  var buzzerQuery = server.where({type: 'buzzer'});
  var microphoneQuery = server.where({type: 'microphone'});
  var ledQuery = server.where({type: 'led'});

  server.observe([buzzerQuery, microphoneQuery, ledQuery], function(buzzer, microphone, led){

    microphone.streams.volume.on('data', function(msg){
      if (msg.data > 10) {
          buzzer.call('turn-on', function() {});
          led.call('turn-on', function(){});
        } else {
          buzzer.call('turn-off', function() {});
          led.call('turn-off', function(){});
        }
    });

  });
}
```

#### Running the Server Node

Now's the time to test our fully featured security system. Head back to Cloud9's terminal and run your zetta server:

    /$ node server.js

##What just happened?!

Devices in zetta are described completely in javascript. This means that there are no configuration files to keep track of - logic can go right into the state machines when you describe them! 

#Next Steps

1. Wire up our Twilio Driver to send a text message when the movement is detected!
2. Replace the LED with WeMo to control a real light!
3. Build an app to consume your new API!

#Getting Help

If you're going through this project, and run into an issue feel free to use these methods to reach out and contact us!

* matt@apigee.com
* [https://groups.google.com/forum/#!forum/zetta-discuss]()
* [https://github.com/zettajs/zetta/issues]()
* [Reference Documentation: http://zettajs.github.io/]()