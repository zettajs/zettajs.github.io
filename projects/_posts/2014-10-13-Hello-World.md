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

## Folder Structure

1. Create a new folder for you project
    ```
    mkdir zetta-hello-world
    ```
2. Navigate to that folder
    ```
    cd zetta-hello-world
    ```
3. Initialize your node app
    ```
    npm init
    ```
    Follow the prompts that this command generates. This will create a `package.json` file.

## Install Zetta

```markdown
npm install zetta --save
```

## Stub Out Server

Create the `server.js` file a the top of of the `zetta-hello-world` directory. The Zetta server will run from this file.

```
touch server.js
```

## Confirm Setup

Your should now have the following structure:

<pre><code class="bash-noln">zetta-hello-world
    ├── node_modules
    ├── package.json
    └── server.js
</code></pre>

# Step #2: Blink the \[mock\] LED

We're going to add a mock LED to our project, then blink it. This will show us how to interact with devices in Zetta without actually needing physical devices.

## 1. Retrieving The Driver

Install the driver from `npm`:

```md
npm install zetta-mock-led --save
```

## 2. Setup The Zetta Server

Open `server.js` in your code editor of choice and add the following code to create your Zetta server node:

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');

zetta()
  .use(LED)
  .listen(1337, function(){
    console.log('Zetta is running at http://127.0.0.1:1337');
  });
```

## 3. Run the server

Back on the command line, run this:

```
node server.js
```

Zetta will start up and locate our software LED.

Your console should now look something like this:

![Example Log Output](/images/projects/hello_world/log_led.png){:.zoom}

```bash
TIMESTAMP [scout] Device (led) SOME-GUID was provisioned from registry
Zetta is running at http://127.0.0.1:1337
```

  * TIMESTAMP will be the time the log was generated
  * SOME-GUID will be a 32 digit globally unique id.

## 4. Blink [mock] LED in the Zetta Browser

1. Open the Zetta Browser:

[http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337](http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337)

![Zetta Browser with LED](/images/projects/hello_world/browser_led_off.png){:.zoom}

2. Ensure your **LED** Device is listed
3. Click the `turn-on` button
  You should see the LED state change from `off` to `on`
  ![Zetta Browser with LED On](/images/projects/hello_world/browser_led_on_callout.png){:.zoom}


# Step #3: Stream a Sine Wave

We'll add a Sine Wave Generator as a stand-in for a sensor stream.

## 1. Retrive The Driver

Back in your terminal, run this command:

```markdown
npm install zetta-sine-wave --save
```

## 2. Tell the Zetta Server About It

1. Add another `require()` statement to import the Sine Wave Generator
2. Pass the Sine Wave Generator to Zetta with another `.use()` statement in the init chain.

Your `server.js` file should look like this after you've added the new code:

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

## 3. Rerun the Server Node

Save changes to `server.js` and start your server by running this in your terminal:

    node server.js

> If your server was still running from before, make sure to shut it down by pressing **CMD+C** before retyping the command above

This time zetta will log two messages, one for each device it finds:

![Log output with both devices connected](/images/projects/hello_world/log_led_sine.png){:.zoom}


## 4. Monitor the values

Once again, we need to point the zetta browser to the zetta server node that's running on your computer. You should just be able to refresh the zetta browser window to see both devices - like this:

![Browser with LED and Sine Wave](/images/projects/hello_world/browser_led_sine.png){:.zoom}


Now click on the device name `Sine Wave` in the zetta browser to get a more detailed view of the device. It should display a smooth Sine curve!

![Sine Wave Detail Page](/images/projects/hello_world/browser_sine_show.png){:.zoom}

# Step #4: Link to a Remote Zetta Instance

Next we'll link our Zetta instance to the cloud. This creates a connection to the open internet and allows us to make API calls to our laptop. To create a true system in the Internet of Things we'll need linking that allows access across the internet.

## 1. Visit a Hosted Zetta Instance

We have an instance of zetta running on heroku for you to play with at [http://hello-zetta.herokuapp.com](http://hello-zetta.herokuapp.com). View it in the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com%2F).

There isn't too much going on yet here, but we can link your local server to the remote instance so that your local Zetta devices are available over the internet.

> Want to setup your own hosted node? Read our [Setting up Zetta in the Cloud](/guides/zetta-in-the-cloud.html) guide.

## 2. Add Link Code

Modify `server.js` to link our local Zetta instance to one in the cloud by including the `.link()` method in your zetta init chain and pointing it to `http://hello-zetta.herokuapp.com`, like this:

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

## 3. Revisit the Hosted Instance

Go back to the [Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com%2F), or just reload the page if it's still open. You should now be able to see your local server listed as a `peer`, with your local devices available for interaction.  

![Browser Showing Local Server](/images/projects/hello_world/browser_local_callout.png){:.zoom}

![Browser Showing Remote  Peer](/images/projects/hello_world/browser_remote_callout.png){:.zoom}

Things to try:

* Access the zetta browser on a mobile device with it's wifi turned off to prove your local devices are visible over the web
 * Ask a friend load the browser from a different location and watch as they trigger your local device transitions

# Step #5: Coordinate Behavior

Apps in zetta allow us to orchestrate interactions between devices. To create one, create an `apps` directory, and put a new file in that folder:

## 1. Create App Directory & File

```
mkdir apps
touch apps/app.js
```

## 2. Author App Code

Edit `app.js` so it looks like this:

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
A quick tour of this code:

  * `module.exports` keeps our app modular and separated from the rest of our code.
  * device queries are built from SQL-like statements in `server.where()`
  * We wait for all devices to come online by passing those query results into `server.observe()`
  * We listen to `data` from our `wave` `stream`, and modify the `led` `state machine`.

> Dig deeper into our docs to get details about [Device Queries](/docs/queries.html.html), the [Zetta app server variable](/docs/server.html), [Streams](/docs/streams.html), and [State Machines](/docs/state_machines.html).

## 3. Load your app when zetta runs

After you're done writing your app, you need to make sure it's included in your server file.

* Import your app with another `require()` statement
* include it in the init chain with another `.use()` statement.

Edit your `server.js` should to match the following code:

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

## 4. Test the app

Save your code, and rerun zetta with `node server.js`. Now lets head back over to the zetta browser to see this new interaction at work.

[Zetta Browser](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com%2F)

The browser should look just as it did before:

![Browser Showing App at Work](/images/projects/hello_world/browser_complete_project.png){:.zoom}


Notice now how the LED turns `on` and `off` in sync with the sinewave, and how you can see this interaction both locally and from the remote Zetta node.

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
