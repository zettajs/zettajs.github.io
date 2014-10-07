---
layout: recipe
title: Hello World
author: Adam Magaluk
difficulty: beginner
duration: 1 hour
description: >
  This recipe will guide you through building
  the hello world project for Zetta. In it,
  we'll cover a few basic concepts in zetta. This
  tutorial is good for those looking to see
  zetta for the first time.
repo: http://github.com/zettajs/zetta-hello-world
---

> This recipe is hands on - it requires writing software.

# Recipe Steps

1. Setup
  * [Materials](#materials)
  * [Install Node](#install-node)
  * [Following Along](#following-along)
  * [Download the starter code](#download-the-starter-code)
  * [Install Zetta](#install-zetta)
2. [Add the LED](#add-the-led)
  * [LED code](#led-code)
  * [Interaction](#interaction-1)
3. [Add the Sine Wave Generator](#sine-wave-generator)
  * [Sine Wave Generator Code](#generator-code)
  * [Interaction](#interaction-2)
4. [Link Zetta](#link)
  * [Link code](#link-code)
  * [Interaction](#interaction-3)
5. [Creating the app](#interactions)
  * [Creating app code](#app-code)
  * [Interaction](#interaction-4)
6. [Next Steps](#next-steps)
7. [Getting Help](#getting-help)
{:.steps}

# Materials

The only thing needed is a computer with Node.js and npm installed.

# Install Node

Before we get started you'll need to download and install Node.js. It can be found at http://nodejs.org/.
The standard installation of Node.js comes with npm as well.

# Download the starter code

Clone [this example repo](https://github.com/zettajs/zetta-hello-world/) to your computer.

```md
git clone https://github.com/zettajs/zetta-hello-world.git
```

# Following Along

The repo you just cloned has tagged commits that allow you to automatically get your code to the same point as it would have been after following each recipe section.

Navigate to the folder for the repo you just cloned

```md
cd zetta-hello-world
```

Advance to **step-0**

```md
git checkout -f step-0
```
{:/comment}


# Install Zetta

Zetta is listed as a dependency in your `package.json` file. Running the following command will retrieve all the packages specified in `package.json` and install them on your computer. At this point you will be installing Zetta itself.

```md
npm install
```

# Add the LED

First we'll add a mock LED to our project. This will show us how to interact with devices in Zetta without actually needing devices.

# LED Code

Follow along to add code to your project.

{::comment}

> **list**{:.icon} **Step**
> Don't want to type? Optionally add this section's code automatically by moving to step 1 in your git repo with `git checkout -f step-1`. Moving to step one will loose modifications you've made so far.

{:/comment}

## Retrieving The Driver

Drivers in Zetta are distributed through the Node Package Manager - NPM. We'll be building a driver from scratch later in this recipe, but for now let's just pull this one off the shelf. In your terminal, run this command:

```md
npm install zetta-mock-led --save
```

> Note the `--save` switch at the end of the command

The driver you just downloaded represents an led in software. It's a state machine that is comprised of the `on`, `off` states. When `on` it will turn the led on, and when `off` it will turn the led off. The changes in state are represented by transitions. Transitions are functions in Zetta that are called when the state of an object changes. Our led has `turn-on`, and `turn-off` as transitions.

> **DID YOU KNOW?**
> Every module you'll use in this tutorial is open source. This one can be found here https://github.com/zettajs/zetta-mock-led.


## Setup The Zetta Server

Now it's time to actually create a Zetta server node, and tell it to use the driver we just downloaded. Open up `./zetta-hello-world/server.js` and add the following code:

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');

zetta()
  .use(LED)
  .listen(1337, function(){
    console.log('Zetta is running at http://127.0.0.1:1337');
  });

```

### What is this code doing?

* `var zetta = require('zetta');` requires the Zetta package. It contains all the functionality needed to configure an IoT app.
* `var LED = require('zetta-mock...` The second line requires the driver for the LED.
* `zetta()` initializes an instance of zetta for use in your code.
* `.use()` tells zetta that we want to use an LED.
* `.listen()` tells zetta that we want our API server to listen at port `1337`, and includes an optional callback.

## Running the Server Node

Save changes to `server.js` and start your server by running the following in your terminal:

```md
node server.js
```

Zetta will start up and successfully locate our pure software LED. Your console should look something like this:

```bash
Zetta is running at http://127.0.0.1:1337
TIMESTAMP [scout] Device (led) SOME-GUID was provisioned from registry
```

  * TIMESTAMP will be the time the log was generated
  * SOME-GUID will be a 32 digit globally unique id.

# Interactions

## Turn it on!

Now let's turn our LED on! To do this, we'll point the zetta browser to the zetta server node that's running on your computer.

> View your app in the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2F127.0.0.1:1337)

It only takes a few seconds to connect. Once you do, you will see something like this:

**NEED SS**

Click the __turn-on__ button to make your buzzer beep!

In Zetta every device gets an API automatically generated for it. Our API will represents the device in it's current state and the actions that can be taken on it. We use a special hypermedia type known as [Siren](http://sirenspec.org/) to represent devices and servers. You can see a response from your API now by clicking on "led" in the zetta browser, and scrolling down to the API section.

## The LED's API

You can dig in a little deeper to the zetta browser by clicking on the name of a device. In this case, click on the word "Led". You'll be taken to a detail page that looks something like this:

**NEED SS**

This view has lots of extra details about our LED, including it's full API! Scroll down in the zetta browser to see the API request & response that generated the detail page!

> Learn more about zetta's device API by reading the [Device API Tour](/guides/device-api-tour) guide

## What just happened?!

We just got zetta up and running! We installed a device in software, and controlled it's behavior with the zetta browser which uses the API zetta constructed for us.

# Add the Sine Wave Generator

Now we'll add a Sine Wave Generator to our project. This will act like a mock sensor with that will act a little more predictably than a random number gneerator.

# Sine Wave Generator Code

Follow along to add code to your security system.

{::comment}

> **list**{:.icon} **Step**
> Don't want to type? Optionally add this section's code automatically by moving to step 2 in your git repo with `git checkout -f step-2`. Moving to step two will loose modifications you've made so far.

{:/comment}

## Retrieving The Driver

In your terminal, run this command:

    zetta-security-system/$ npm install zetta-sine-wave-driver --save

> Note the `--save` switch at the end of the command

## The Zetta Server

Modify `server.js` to look like this:

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var Sine = require('zetta-sine-wave-driver');

zetta()
  .use(LED)
  .use(Sine)
  .listen(1337, function(){
    console.log('Zetta is running at http://beaglebone.local:1337');
  });

```

### What is this code doing?

We added two lines to our `server.js` file.

```javascript
var Sine = require('zetta-sine-wave-driver');
```

This includes the driver we just installed so that it's available to zetta.

```javascript
.use(Sine)
```
This instructs zetta to use the `Sine` driver.


# Interaction

## Running the Server Node

Save changes to `server.js` and start your server by running this in your terminal:

    node server.js

> If your server was still running from before, make sure to shut it down by pressing **CMD+C** before retyping the command above

This time zetta will log two messages, one for each device it connects to:

** NEED SS **

## Monitor the values

Once again, we need to point the zetta browser to the zetta server node that's running on your computer. You should just be able to refresh the zetta browser window to see more device - like this:

** NEED SS **

Now click on the device name `Sine Wave` in the zetta browser to get a more detailed view of the device. It should display a smooth Sine curve!

** NEED SS **

## What just happened?!

We connected another device to our project. This one, a sine wave generator, produces streaming data. This causes us to see a different type of visualization in the zetta browser, and changes its API to reference a websocket monitor.

# Link Zetta

Next we'll link our Zetta instance to the cloud. This creates a connection to the open internet and allows us to make API calls to our laptop.

# Link Code

## The Zetta Server

Modify `server.js` to look like this:

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var Sine = require('zetta-sine-wave-driver');

zetta()
  .use(LED)
  .use(Sine)
  .link('http://hello-zetta.herokuapp.com/')
  .listen(1337, function(){
    console.log('Zetta is running at http://beaglebone.local:1337');
  });

```

### What is this code doing?

We added one line to our `server.js` file.

```javascript
  .link('http://hello-zetta.herokuapp.com/')
```

This links our Zetta instance to one in the cloud. The one above is hosted on heroku.

# Interaction

Now we can interact with our API on the open internet like we did locally.

> View your app in the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com%2F)

## What just happened?!

We just successfully connected Zetta to the cloud and interacted with it. To create a true system in the Internet of Things we'll need linking to allow access across the internet.

# Creating the app

1 - Apps in zetta allow us to orchestrate interactions between devices. To create one, make a new file in your project's `apps` folder:

    touch apps/app.js

Now open our app.js file in your editor so we can edit it, and add functionality.

2 - The first component of our app is an export statement. This is so that we can keep our apps modular and separated from the rest of our code. Edit `app.js` so it looks like this:

```javascript
module.exports = function(server) {
  //app goes here
}
```

3 - Next, we create our first query. Zetta uses queries to look for devices, or wait for devices to come online that fill all the parameters given. Our first query tells Zetta to retrieve the led for us, the second one retrieves the Sine Wave generator.

```javascript
module.exports = function(server) {
  var waveQuery = server.where({ type: 'generator' });
  var ledQuery = server.where({ type: 'led' });

}
```

4 - The `server` variable is an instance of Zetta. We can use functionality attached to it to search for devices. We can use the method `server.observe()` to waits for devices that fit queries given in the first argument to come online, and then fire a callback.

  * We want the callback function to fire when `"generator"` and `"ledz"` devices come online.
  * The function passes in the state machines of the devices in as individual arguments.

```javascript
module.exports = function(server) {
  var waveQuery = server.where({ type: 'generator' });
  var ledQuery = server.where({ type: 'led' });

  server.observe([waveQuery, ledQuery], function(wave, led){
    //do something with the devices after we find them

  });
}
```

5 - Now we can work with our buzzer and microphone inside the `observe()` callback. Our microphone's driver defines it as having streams with volume. We'll listen for a `"data"` event to happen on a `"volume"` *stream*. Once we get that data, we want to test to see if value is above `10`. If it is, call the `"turn-on"` transition on the buzzer.

When we're all done, this is what our `app.js` file should look like:

```javascript
module.exports = function(server) {
  var waveQuery = server.where({ type: 'generator' });
  var ledQuery = server.where({ type: 'led' });
  server.observe([waveQuery, ledQuery], function(wave, led){

    wave.streams.wave.on('data', function(m) {
      if(m.data > 0) {
        led.call('turn-on');
      } else {
        led.call('turn-off');
      }
    });

  });
}
```

# Load your app when zetta runs

After you're done writing your app, you need to make sure it's included in your server file. Update `server.js` to look like so:

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var Sine = require('zetta-sine-wave-driver');

var app = require('./apps/app');

zetta()
  .use(LED)
  .use(Sine)
  .use(app)
  .link('http://hello-zetta.herokuapp.com/')
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

The `.use()` function can determine what type of module you pass into it, and is smart enough to know whether you're passing it a device driver or an app. You must both `require` your `app.js` file, and `use` it in order for zetta to use it at runtime.

# Interaction

## Running the Server Node

Save your code, and rerun zetta with `node server.js`. Now lets head back over to the zetta browser to see this new interaction at work. The browser should look just as it did before:

** NEED SS **


## What just happened?!

We wrote an app to coordinate actions between devices connected to zetta. The app used zetta queries to find devices registered to our node, and `server.observe()` to guarantee the devices were available before trying to run logic that included them.


# Next Steps

1. Create a mock device of your own. See how we use javascript to represent devices.
2. Create a mock sensor of your own. See how we set up streaming values.
3. Replace our pure software LED with a hardware LED.

# Getting Help

If you're going through this project, and run into an issue feel free to use these methods to reach out and contact us!

* matt@apigee.com
* [https://groups.google.com/forum/#!forum/zetta-discuss]()
* [https://github.com/zettajs/zetta/issues]()
* [Reference Documentation: http://zettajs.github.io/]()
