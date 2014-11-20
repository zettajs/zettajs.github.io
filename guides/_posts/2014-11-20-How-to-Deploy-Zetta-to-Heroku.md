---
layout: guide
title: How to Create a Device Driver
description: This guide will show you how to create a device driver.
author: Brian Mulloy
difficulty: beginner
---

# How to Deploy Zetta to Heroku

Deploying Zetta to Heroku is a one-click process. 

1. Click the `Deploy to Heroku` button here: [https://github.com/zettajs/zetta-cloud-sample](https://github.com/zettajs/zetta-cloud-sample)

1. Heroku will prompt you to setup a new Heroku account or log in with your existing account.

1. Pick an app name, like 'my-heroku-username-zetta'.

You will now have a Zetta server instance running in the cloud.

# Link Zetta Servers Together

Linking Zetta servers together requires one line of code. 

1. In the server.js file that runs on your geo-distributed hub add the `link()` function to the zetta config:

  .link('http://my-heroku-username-zetta.herokuapp.com/')

You're server.js file will look like the code below.

```js
var zetta = require('zetta');
var LED = require('zetta-led-mock-driver');
var Photocell = require('zetta-photocell-mock-driver');

var duskToDawnLight = require('./apps/dusk_to_dawn_light');

zetta()
  .use(LED)
  .use(Photocell)
  .use(duskToDawnLight)
  .link('http://my-heroku-username-zetta.herokuapp.com/')
  .listen(1337, function(){
     console.log('Zetta is running at http://127.0.0.1:1337');
});
```
