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

For example, the Zetta driver for an LED for Arduino is named: **`zetta-led-arduino-driver`**.

# Step #2: Clone the Starter Code

Clone the [Zetta starter driver](https://github.com/zettajs/zetta-starter-device-driver) to a new directory called **`zetta-{device}-{platform}-driver`**:

```bash
git clone https://github.com/zettajs/zetta-starter-device-driver zetta-{device}-{platform}-driver
```

> **action**{:.icon} Replace **`{device}`** with the name of the device and **`{platform}`** with the name of the platform for the driver you are building.

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

# Step # 4: Adapt the Starter Code

You now have a working device driver, example server and example app running on your development machine. You can explore the key files and adapt the starter code to your device. 

Key files to explore:

* Scout: `index.js`
* Driver: `starter_device.js`
* Example server: `example/server.js`
* Example app: `example/apps/starter_app.js`