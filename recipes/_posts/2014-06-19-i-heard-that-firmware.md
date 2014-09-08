---
layout: recipe
---

##Building firmware for the I Heard Dat! App

1. Retrieve the [I heard dat! firmware](http://github.com/zettajs) with the `zetta firmware pull` command. (NOTE: You can also use git for this.)
`zetta firmware pull git://git@github.com:zettajs/i-heard-dat-firmware.git`

Zetta will place this into the `/firmware` directory of your app for you.

```
Cloning into ./firmware/i-heard-dat-firmware
remote: Reusing existing pack: 79, done.
remote: Total 79 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (79/79), done.
Checking connectivity... done.
```

2. Install the arduino IDE from [arduino.cc](http://arduino.cc/en/Main/Software)

3. Install and use [Leo](http://github.com/adammagaluk/leo) to build the arduino firmware.
  * `npm install -g leo`
  * `cd firmware/i-heard-dat-firmware`
  * `leo deploy -b uno -p /dev/tty.usbmodem1411`

After these three steps your firmware should be up to date on your arduino.
