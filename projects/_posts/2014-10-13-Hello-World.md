---
layout: project
title: Hello World
author: Adam Magaluk
difficulty: beginner
duration: 1 hour
description: >
  This recipe will guide you through building
  the hello world project for Zetta. In it,
  we'll cover Zetta's basic concepts. This
  tutorial is good for those looking to see
  zetta for the first time.
repo: http://github.com/zettajs/zetta-hello-world
---

# Goal
This project is meant to get you up and running with the essential concepts in Zetta. It is a sample Zetta app with two devices - A mock LED and a Sine Wave Generator.

![Screenshot of zetta browser w/ finished system](/images/projects/hello_world/browser_complete_project.png){:.zoom}

# Parts

This project is all software. You will need a computer with Node.js and npm installed.

> **question**{:.icon} Need help installing nodejs? Read our [Getting Started With Zetta](/guides/getting-started-with-zetta.html) Guide.

# Directions

1. [Initialize Your Project](#step-1-initialize-your-project)
2. [Blink the \[mock\] LED](#step-2-blink-the-mock-led)
3. [Stream a Sine Wave](#step-3-add-the-sine-wave-generator)
4. [Link to a Remote Zetta Instance](#step-4-link-to-a-remote-zetta-instance)
5. [Coordinate Behavior](#step-5-coordinate-behavior)
{:.steps}

# Step #1: Initialize Your Project

## Create Your Folder Structure

1. Run this code in your command line:

```bash
mkdir zetta-hello-world
cd zetta-hello-world
npm init
```

Those commands will:

* Create a new folder for you project
* Navigate to that folder
* Initialize node.js boilerplate
  * Follow the prompts that `npm init` generates to create a `package.json` file.

## Install Zetta

1. Run this code in your command line:

```markdown
npm install zetta --save
```

## Stub Out the Server File

1. Create the `server.js` file a the top of of the `zetta-hello-world` directory. The Zetta server will run from this file.

```
touch server.js
```

## Confirm Setup

1. Your should now have the following structure:

<pre><code class="bash-noln">zetta-hello-world
    ├── node_modules
    ├── package.json
    └── server.js
</code></pre>

# Step #2: Blink the \[mock\] LED

We're going to add a mock LED to our project, then blink it. This will show us how to interact with devices in Zetta without actually needing physical devices.

## Retrieving The Driver

1. Install the driver from `npm`:

```md
npm install zetta-mock-led --save
```

## Setup The Zetta Server

1. Open `server.js` in your code editor of choice 
2. Add the following code to create your Zetta server node:

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');

zetta()
  .use(LED)
  .listen(1337, function(){
    console.log('Zetta is running at http://127.0.0.1:1337');
  });
```

## Run the server

1. Run this code in your command line:

```
node server.js
```

Zetta will start up and locate our software LED.

2. Confirm that your console shows something like this:

![Example Log Output](/images/projects/hello_world/log_led.png){:.zoom}

The log takes the form of:

```bash
TIMESTAMP [scout] Device (led) SOME-GUID was provisioned from registry
Zetta is running at http://127.0.0.1:1337
```
Where:

* TIMESTAMP will be the time the log was generated
* SOME-GUID will be a 32 digit globally unique id.

## Blink [mock] LED in the Zetta Browser

1. Open the Zetta Browser:
[http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337](http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337)
![Zetta Browser with LED](/images/projects/hello_world/browser_led_off.png){:.zoom}

2. Ensure your **LED** Device is listed
3. Click the `turn-on` button
  You should see the LED state change from `off` to `on`
  ![Zetta Browser with LED On](/images/projects/hello_world/browser_led_on_callout.png){:.zoom}


# Step #3: Stream a Sine Wave

We'll add a Sine Wave Generator as a stand-in for a sensor stream.

## 3.1 Retrive The Driver

1. Run this code in your command line:
  ```markdown
  npm install zetta-sine-wave --save
  ```

## Tell the Zetta Server About It

1. Add another `require()` statement to import the Sine Wave Generator
2. Pass the Sine Wave Generator to Zetta with another `.use()` statement in the init chain.
3. Confirm that `server.js` looks like this after you've added the new code:

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var Sine = require('zetta-sine-wave');

zetta()
  .use(LED)
  .use(Sine)
  .listen(1337, function(){
    console.log('Zetta is running at http://127.0.0.1:1337');
  });
```

## Rerun the Server Node

1. Save changes to `server.js` 
2. Restart your server by running this in your command line:
  ```
  node server.js
  ```
3. Confirm that zetta logs two messages, one for each device it finds:

![Log output with both devices connected](/images/projects/hello_world/log_led_sine.png){:.zoom}

> If your server was still running from an earlier step, make sure to shut it down by pressing **CMD+C** before rerunning `node server.js`

## Monitor the values

1. Point the zetta browser to your local Zetta server node. 
  * You may be able to just refresh the Zetta browser window to see both devices
2. Confirm that you see something like this: 
  ![Browser with LED and Sine Wave](/images/projects/hello_world/browser_led_sine.png){:.zoom}

3. Now click on the device name `Sine Wave` in the zetta browser to get a more detailed view of the device. 
4. It should display a smooth sine curve!
  ![Sine Wave Detail Page](/images/projects/hello_world/browser_sine_show.png){:.zoom}

# Step #4: Link to a Remote Zetta Instance

Next we'll link our Zetta instance to the cloud. This creates a connection to the open internet and allows us to make API calls to our laptop. To create a true system in the Internet of Things we'll need linking that allows access across the internet.

## Visit a Hosted Zetta Instance

We have an instance of zetta running on **heroku** for you to play with at [http://hello-zetta.herokuapp.com](http://hello-zetta.herokuapp.com). 

1. Visit the remote Zetta instance in the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com%2F).
2. Take note of what you see here - this is the *before* state

> **question**{:.icon} Want to setup your own hosted node? Read our [Setting up Zetta in the Cloud](/guides/zetta-in-the-cloud.html) guide.

## Add Link Code

1. Open `server.js` 
2. Link our local Zetta instance to one in the cloud by including the `.link()` method in the Zetta init chain 
3. Point the link to the remote url by passing `http://hello-zetta.herokuapp.com` as the function's only argument
4. Confirm that your `server.js` file looks like the following:

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var Sine = require('zetta-sine-wave');

zetta()
  .use(LED)
  .use(Sine)
  .link('http://hello-zetta.herokuapp.com/')
  .listen(1337, function(){
    console.log('Zetta is running at http://beaglebone.local:1337');
  });

```

> Make sure you've saved changes to `server.js`

## Revisit the Hosted Instance

1. Rerun your server by typing `node server.js` in your command line
2. Go back to the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com%2F)
  * You can just reload the page if it's still open. 
3. You should now be able to see your local server listed as a `peer`, with your local devices available for interaction. Examples:
  * **Before Linking:** 
![Browser Showing Local Server](/images/projects/hello_world/browser_local_callout.png){:.zoom}
  * **After Linking:**
![Browser Showing Remote Peer](/images/projects/hello_world/browser_remote_callout.png){:.zoom}

4. Things you can try now that your local Zetta API is available over the web:
  * Access the zetta browser on a mobile device with it's wifi turned off to prove your local devices are visible over the web
  * Ask a friend to load the browser from a different location and watch as they trigger your local device transitions

# Step #5: Coordinate Behavior

Apps in Zetta allow us to orchestrate interactions between devices. 

## Create App Directory & File

1. Run this code in your command line:

```
mkdir apps
touch apps/app.js
```

## Author App Code

1. Edit `apps/app.js` so it looks like this:
```javascript
module.exports = function(server) {
  var waveQuery = server.where({ type: 'generator' });
  var ledQuery = server.where({ type: 'led' });
  server.observe([waveQuery, ledQuery], function(wave, led){

    wave.streams.wave.on('data', function(m) {
      if(m.data > 0) {
        if (led.available('turn-on')) {
          led.call('turn-on');
        }
      } else {
        if (led.available('turn-off')) {
          led.call('turn-off');
        }
      }
    });

  });
}
```
  > Make sure you save changes to `app.js` before going further 

2. A quick tour of this code:

  * `module.exports` keeps our app modular and separated from the rest of our code.
  * device queries are built from SQL-like statements in `server.where()`
  * We wait for all devices to come online by passing those query results into `server.observe()`
  * We listen to `data` from our `wave` `stream`, and modify the `led` `state machine`.

3. Dig deeper into our docs to get details about [Device Queries](/docs/queries.html.html), the [Zetta app server variable](/docs/server.html), [Streams](/docs/streams.html), and [State Machines](/docs/state_machines.html).

## Load your app when zetta runs

After you're done writing your app, you need to make sure it's included in your server file.

1. Open `server.js`
2. Import your app with another `require()` statement
3. include it in the init chain with another `.use()` statement.
4. Your `server.js` should to match the following code:

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var Sine = require('zetta-sine-wave');

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
> Make sure to save changes to `server.js` before continuing

## Test the app

1. Rerun Zetta with
  ```
  node server.js
  ```
2. Head back over to the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com%2F) to see this new interaction at work.

3. The browser should look similar to before:
  ![Browser Showing App at Work](/images/projects/hello_world/browser_complete_project.png){:.zoom}
  
4. Notice now how the LED turns `on` and `off` in sync with the sinewave, 
5. You can see this interaction both locally and from the remote Zetta instance.

# Next Steps

1. Create a mock device of your own. See how we use javascript to represent devices.
2. Create a mock sensor of your own. See how we set up streaming values.
3. Replace our pure software LED with a hardware LED.

# Getting Help

If you're going through this project, and run into an issue feel free to use these methods to reach out and contact us!

* [matt@apigee.com](mailto:matt@apigee.com)
* [https://groups.google.com/forum/#!forum/zetta-discuss]()
* [https://github.com/zettajs/zetta/issues]()
* [Reference Documentation: http://zettajs.github.io/]()
