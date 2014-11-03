---
layout: project
title: Hello World
author: Adam Magaluk
difficulty: beginner
duration: 1 hour
description: Create an Internet-connected, dusk-to-dawn lighting system with a mock LED and a mock photo cell.
repo: http://github.com/zettajs/zetta-hello-world
---

# Directions

1. [Setup Zetta on the PC](#step-1-setup-zetta-on-the-pc)
2. [Blink the LED](#step-2-blink-the-led)
3. [Link to the Cloud](#step-3-link-to-the-cloud)
3. [Stream a Sine Wave](#step-3-add-the-sine-wave-generator)
5. [Coordinate Behavior](#step-5-coordinate-behavior)
{:.steps}

# Goal

The goal for this project is to create a dusk-to-dawn light by assembling a mock LED and a mock photo cell into a Zetta app running on a PC. We will connect the app to the Internet by linking the PC with a second Zetta server running in the cloud.

![Screenshot of Zetta browser with dusk to dawn lighting system](/images/projects/hello_world/browser_dusk_to_dawn.png){:.zoom}

# Parts

This project requires a PC with an Internet connection and [Node.js](http://nodejs.org/download/).

# Step #1: Setup Zetta on the PC

## Initialize your Project

1. From the PC command line, create the project directory.

   ```bash
   mkdir zetta-hello-world
   ```

1. Change to the project directory.

   ```bash
   cd zetta-hello-world
   ```

1. Initialize the project by following the `npm init` utility walk-through.

   ```bash
   npm init
   ```

   > **action**{:.icon} Press `<ENTER>` multiple times to accept the `npm init` defaults.

## Install Zetta

1. Install Zetta and save it as a dependency to the `package.json` file that was created by `npm init`.

   ```markdown
   npm install zetta --save
   ```

## Write Zetta Server Code

1. Create the `server.js` file.

   ```
   touch server.js
   ```

1. In a text editor, write code in `server.js` to `require` Zetta, give your server a `name` and `listen` on server port `1337`.

   > **info**{:.icon} Consider replacing `FirstName` and `LastName` with your first and last name.

   ```js
   var zetta = require('zetta');

   zetta()
     .name('FirstName LastName')
     .listen(1337, function(){
        console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

1. Save your file and run the Zetta server from within the `zetta-hello-world` project folder.

   ```bash
   node server.js
   ```
   Notice the console output indicating the server is running.

   ```bash
   Nov-02-2014 22:56:59 [server] Server (FirstName LastName) FirstName LastName listening on http://127.0.0.1:1337
   Zetta is running at http://127.0.0.1:1337
   ```

## Call the API

1. Open the Zetta API in a web browser [http://127.0.0.1:1337](http://127.0.0.1:1337).

2. Confirm the API looks like the response below.

   ```json
     { "class":["root"],
       "links":[
         {"rel":["self"],
           "href":"http://127.0.0.1:1337/"},
         { "title":"FirstName LastName","rel":["http://rels.zettajs.io/server"],
           "href":"http://127.0.0.1:1337/servers/FirstName%20LastName"},
         {"rel":["http://rels.zettajs.io/peer-management"],
           "href":"http://127.0.0.1:1337/peer-management"}],
       "actions":[
         {"name":"query-devices","method":"GET",
           "href":"http://127.0.0.1:1337/","type":"application/x-www-form-urlencoded",
           "fields":[{"name":"server","type":"text"},{"name":"ql","type":"text"}]}]}
   ```
   {:.language-json-noln}

   > **info**{:.icon} As we `use` devices in `server.js` they will appear in the web API. For the following steps we'll access the API via the [Zetta Browser](/guides/2014/10/18/Zetta-Browser.html).

# Step #2: Blink the LED

## Write the LED Code

1. Install the mock LED driver from `npm`.

   ```bash
   npm install zetta-led-mock --save
   ```

   > **info**{:.icon} Zetta driver names follow the pattern `zetta-[device name]-platform`. The Hello World project uses mock devices.

1. In the `server.js` file, write code to `require` and `use` the mock `LED`.

   Add **line 2**:

   ```javascript
   var LED = require('zetta-led-mock');
   ```

   Add **line 6**:

   ```javascript
   .use(LED)
   ```

1. Ensure `server.js` looks like the code below.

   ```js
   var zetta = require('zetta');
   var LED = require('zetta-led-mock');

   zetta()
     .name('FirstName LastName')
     .use(LED)
     .listen(1337, function(){
        console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

1. Stop and restart the Zetta server.

   ```bash
   press <CTRL=C>
   node server.js
   ```

1. When Zetta discovers the mock LED, it will log a message about the device.

   ```bash
   {timestamp} [scout] Device (led) {id} was discovered
   ```
   {:.language-bash-noln}

## Blink the LED from the PC

1. Open the Zetta Browser and point it to the **PC server**:

   [http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337](http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337)

1. Ensure your **LED** is listed.

   ![Zetta Browser with LED](/images/projects/hello_world/browser_led_off.png){:.zoom}

1. Click the `turn-on` button and ensure the LED state changed from `off` to `on`.

1. Click the `turn-off` button and ensure the LED state changed from `on` to `off`.

# Step #3: Link to the Cloud

At this point, your LED API is only available locally. Let's make the LED API available from the cloud.

## Write the Link Code

1. In the `server.js` file, write code to `link` your Zetta server on the PC to a Zetta server running in the cloud.

   Add **line 7**:

   ```javascript
   .link('http://hello-zetta.herokuapp.com/')
   ```
1. Ensure `server.js` looks like code below.

   ```js
   var zetta = require('zetta');
   var LED = require('zetta-led-mock');

   zetta()
   .name('FirstName LastName')
   .use(LED)
   .link('http://hello-zetta.herokuapp.com/')
   .listen(1337, function(){
     console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```

1. Stop and restart the Zetta server.

   ```bash
   press <CTRL=C>
   node server.js
   ```

1. Ensure the peer connection to the cloud is established and the console log includes notifications that  the peer was established.

   ```bash
   {timestamp} [peer-client] WebSocket to peer established (ws://hello-zetta.herokuapp.com/peers/FirstName LastName)
   {timestamp} [peer-client] Peer connection established (ws://hello-zetta.herokuapp.com/peers/FirstName LastName)
   ```
   {:.language-bash-noln}

   > **info**{:.icon} By `link`ing the Zetta server on the PC to a Zetta server running in the cloud, you can access your devices via a web API from anywhere in the world.

## Blink the LED from the Cloud

1. Open the Zetta Browser. Point it to the Zetta **cloud server**.
   [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com)

1. Ensure your **LED** is listed.

1. Click the `turn-on` button for the LED.

1. Ensure the LED state changed in the Zetta Browser visualization.

> **world**{:.icon} Now anyone in the world can control the mock LED on your PC. Try it. Copy the cloud URL and send it to friends so they can control your LEDs from afar: [http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com](http://browser.zettajs.io/#/overview?url=http:%2F%2Fhello-zetta.herokuapp.com).

# Step #4: Stream a Sine Wave

We'll add a Sine Wave Generator as a stand-in for a sensor stream.

## Retrive The Driver

1. Run this code in your command line:
  ```markdown
  npm install zetta-sine-wave --save
  ```

## Add the Sine Wave Driver to your Server

1. Open `server.js`
2. Add another `require()` statement to import the Sine Wave Generator
3. Pass the Sine Wave Generator to Zetta with another `.use()` statement in the init chain.
4. Confirm that `server.js` looks like this after you've added the new code:

```javascript
var zetta = require('zetta');
var LED = require('zetta-led-mock');
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
3. Confirm that Zetta logs two messages, one for each device it finds:

![Log output with both devices connected](/images/projects/hello_world/log_led_sine.png){:.zoom}

> If your server was still running from an earlier step, make sure to shut it down by pressing **CMD+C** before rerunning `node server.js`

## Monitor the values

1. Point the Zetta browser to your local Zetta server node.
  * You may be able to just refresh the Zetta browser window to see both devices
2. Confirm that you see something like this:
  ![Browser with LED and Sine Wave](/images/projects/hello_world/browser_led_sine.png){:.zoom}

3. Now click on the device name `Sine Wave` in the Zetta browser to get a more detailed view of the device.
4. It should display a smooth sine curve!
  ![Sine Wave Detail Page](/images/projects/hello_world/browser_sine_show.png){:.zoom}

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

## Load your app when Zetta runs

After you're done writing your app, you need to make sure it's included in your server file.

1. Open `server.js`
2. Import your app with another `require()` statement
3. include it in the init chain with another `.use()` statement.
4. Your `server.js` file should now match the following code:

```javascript
var zetta = require('zetta');
var LED = require('zetta-led-mock');
var Sine = require('zetta-sine-wave');

var app = require('./apps/app');

zetta()
  .use(LED)
  .use(Sine)
  .use(app)
  .link('http://hello-zetta.herokuapp.com/')
  .listen(1337, function(){
    console.log('Zetta is running at http://127.0.0.1:1337');
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

4. Notice now how the LED turns `on` and `off` in sync with the sinewave!
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
