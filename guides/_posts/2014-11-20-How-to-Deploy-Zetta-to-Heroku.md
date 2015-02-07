---
layout: guide
title: How to Deploy a Zetta Server to Heroku
description: This guide will show you how to deploy a Zetta server to Heroku.
author: Brian Mulloy
difficulty: beginner
---

# How to Deploy a Zetta Server to Heroku

1. Click the `Deploy to Heroku` button on the bottom of the [Zetta Cloud Starter](https://github.com/zettajs/zetta-cloud-sample) GitHub repository.

1. Heroku will prompt you to setup a new Heroku account or log in with your existing account.

1. Pick an app name, like 'myherokuname-zetta'.

You will now have a Zetta server instance running in the cloud.

# Link Zetta Servers Together

Linking Zetta servers together requires one line of code. 

1. In the server.js file that runs on your geo-distributed hub add the `link()` function to the zetta config:

   ```js
   .link('http://myherokuname-zetta.herokuapp.com/')
   ```

1. Below is an example server.js file that inludes linking to a Zetta server running on Heroku.

   ```js
   var zetta = require('zetta');
   var LED = require('zetta-led-mock-driver');
   var Photocell = require('zetta-photocell-mock-driver');

   var duskToDawnLight = require('./apps/dusk_to_dawn_light');

   zetta()
   .use(LED)
   .use(Photocell)
   .use(duskToDawnLight)
   .link('http://myherokuname-zetta.herokuapp.com/')
   .listen(1337, function(){
     console.log('Zetta is running at http://127.0.0.1:1337');
   });
   ```
