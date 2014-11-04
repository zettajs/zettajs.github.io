---
layout: guide
title: How to Create a Device Driver
description: This guide will show you how to create a device driver.
---

So, you want to create a Zetta device driver? This guide will get you started.

# Step #1: Know Your Device and Platform

Zetta drivers are created for specific devices on specific platforms. The Zetta community uses a naming convention for drivers that incorporates the device and platform names separated by hyphens: **`zetta-{device}-{platform}-driver`**. 

Know the names for:

* **device**
* **platform**

For example, the Zetta driver for an LED on Arduino is named: **`zetta-led-arduino-driver`**.

# Step #2: Clone the Starter Code

Clone the [Zetta starter driver](https://github.com/zettajs/zetta-starter-device-driver) to a new directory called **`zetta-{device}-{platform}-driver`**:

```bash
git clone https://github.com/zettajs/zetta-starter-device-driver zetta-{device}-{platform}-driver
```

> **action**{:.icon} Replace **`{device}`** with the name of the device and **`{platform}`** with the name of the platform for the driver you are making.

# Step #3: Run the Example Server

1. Change to the new driver directory.

   ```bash
   cd zetta-{device}-{platform}-driver
   ```

1. Install default Zetta driver dependencies.

   ```bash
   npm install
   ```

1. Change to example directory.

   ```bash
   cd example
   ```

1. Install default Zetta server dependencies.

   ```bash
   npm install
   ```

1. Run the driver's example server.

   ```bash
   node server.js
   ```

1. Ensure you see expected startup messages in the terminal.

   ```bash
   {timestamp} [scout] Device (starter) {id} was discovered
   {timestamp} [server] Server (server.name) server.name listening on http://127.0.0.1:1337
   {timestamp} [Starter Device-log] DEFAULT: ./app.js is running
   {timestamp} [device] starter transition do   
   ```
   {:.language-bash-noln}
   
1. Ensure you see the **Starter Device** in the Zetta browser and that the the state visualization updates.

   [http://browser.zettajs.io/#/overview?url=http:%2F%2F127.0.0.1:1337](http://browser.zettajs.io/#/overview?url=http:%2F%2F127.0.0.1:1337)

You now have a working device driver, scout, example server and example app running on your development machine. 

# Step #4: Search and Replace the Starter Code

Adapt the starter code to your device.

1. Change directory to project root.

   ```bash
   cd ..
   ```

1. Rename the driver file to the name of your device.

   ```bash
   git mv starter_device.js {device}.js
   ```
   
   > **action**{:.icon} Replace **`{device}`** with the name of the device for the driver you are making. No need to add `zetta` or `driver` to the name of this file.

1. Edit the following files and replace references to `starter` with the device name you are making.

   * Scout: `index.js`
   * Driver: `{device}.js`
   * NPM package: `package.json`
   * README: `README.md`
   * Example server: `example/server.js`
   * Example app: `example/apps/starter_app.js`

1. Restart the example server.

   ```bash
   node example/server.js
   ```
   
1. Ensure you see your **{device}** labeled in the Zetta browser and that the the state visualization updates.

      [http://browser.zettajs.io/#/overview?url=http:%2F%2F127.0.0.1:1337](http://browser.zettajs.io/#/overview?url=http:%2F%2F127.0.0.1:1337)

# Step #5: Update the Git Repo

After renaming the starter device you will likely want to push changes to your own git repo.

1. Change the remote of the git repository.

   ```bash
   git remote set-url origin {your git repo url}
   ```

2. Push changes to the new origin.

   ```bash
   git push origin master
   ```

# Step #6: Build the Driver

Starting with the `{device}.js` driver and `index.js` scout files model the state machine and scout for your device driver.

# Step #7: Publish with NPM

Follow these steps to publish your device driver to NPM: [https://gist.github.com/coolaj86/1318304](https://gist.github.com/coolaj86/1318304)
