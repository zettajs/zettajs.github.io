---
layout: guide
title: How to Create a Device Driver
description: This guide will show you how to create a device driver.
---

So, you want to create a Zetta device driver? This guide will get you started.

# Step #1: Know Your Device and Platform

Zetta drivers are created for specific devices on specific platforms. The Zetta community uses a naming convention for drivers that incorporates the device and platform names separated by hyphens: **`zetta-{device}-{platform}-driver`**. 

Know the names for the device and platform you are making:

* **device**
* **platform**

For example, the Zetta driver for an LED on Arduino is named: **`zetta-led-arduino-driver`**.

# Step #2: Clone the Starter Code

Clone the [Zetta starter driver](https://github.com/zettajs/zetta-starter-driver) to a new directory called **`zetta-{device}-{platform}-driver`**:

```bash
git clone https://github.com/zettajs/zetta-starter-driver zetta-{device}-{platform}-driver
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
   {timestamp} [Starter-log] DEFAULT: ./app.js is running
   {timestamp} [device] starter transition do   
   ```
   {:.language-bash-noln}
   
1. Ensure you see **Starter** in the Zetta browser and that the the state visualization updates.

   [http://browser.zettajs.io/#/overview?url=http:%2F%2F127.0.0.1:1337](http://browser.zettajs.io/#/overview?url=http:%2F%2F127.0.0.1:1337)

You now have a working device driver, scout, example server and example app running on your development machine. 

# Step #4: Search and Replace the Starter Code

Adapt the starter code to your device.

1. Change directory to project root.

   ```bash
   cd ..
   ```

1. Edit the following files and replace references to `starter` and `Starter` with the device you are making.

   * Scout: `index.js`
   * NPM package: `package.json`
   * README: `README.md`
   * Driver: `starter.js`

1. Rename the driver file to the name of your device.

   ```bash
   git mv starter.js {device}.js
   ```

   > **action**{:.icon} Replace **`{device}`** with the name of the device you are making. For example, if you are creating the driver for an LED, you would execute `git mv starter.js led.js`. There is no need to add `zetta` or `driver` to the name of the driver file in this context.

1. Restart the example server.

   ```bash
   node example/server.js
   ```
   
1. Ensure you see your **{device}** labeled in the Zetta browser and that the the state visualization updates.

      [http://browser.zettajs.io/#/overview?url=http:%2F%2F127.0.0.1:1337](http://browser.zettajs.io/#/overview?url=http:%2F%2F127.0.0.1:1337)

# Step #5: Update the Git Repo

After renaming the starter device you will likely want to push changes to your own git repo.

1. Create a git repository for the new driver on your git repository of choice. Follow the Zetta naming convention: `zetta-{device}-{platform}-driver`.

   > **info**{:.icon} The Zetta team uses [GitHub](https://help.github.com/articles/create-a-repo/) as the source code repository for Zetta.

1. Change the remote of the git repository.

   ```bash
   git remote set-url origin {your git repo url}
   ```
   
   > **info**{:.icon} In the case of GitHub, your `{git repo url}` would look something like `https://github.com/{username}/zetta-{device}-{platform}-driver.git`.

2. Commit changes to the repository.

   ```bash
   git commit -a
   ```

2. Push changes to the new origin.

   ```bash
   git push origin master
   ```

# Step #6: Build the Driver

Starting with the `{device}.js` driver file and the `index.js` scout file, write the code that models your device. There are many Zetta drivers that you can use as a starting point for your device. If you search GitHub for [zetta-\*-driver](https://github.com/search?utf8=%E2%9C%93&q=zetta-*-driver&type=Repositories) you will find all the publicly shared Zetta drivers. You can narrow your search by device type [zetta-led-\*-driver](https://github.com/search?utf8=%E2%9C%93&q=zetta-led-*-driver&type=Repositories) or platform [zetta-\*-edison-driver](https://github.com/search?utf8=%E2%9C%93&q=zetta-*-edison-driver&type=Repositories&ref=searchresults).

# Step #7: Publish with NPM

Follow these steps to publish your device driver to NPM: [https://gist.github.com/coolaj86/1318304](https://gist.github.com/coolaj86/1318304)
