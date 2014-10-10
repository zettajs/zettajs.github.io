---
layout: guide
title: How to Setup a BeagleBone Black for Internet Sharing
description: This guide shows you how to connect your BeagleBone to a personal computer and enable Internet sharing from your computer to the BeagleBone.
---

# Steps

1. [Connect BeagleBone to PC via USB](#Connect-BeagleBone-to-PC-via-USB)
  * [USB Cable](#usb-cable)
  * []
{:.steps}

# 1. Connect BeagleBone to PC

1. Connect the USB cable between the BeagleBone's Mini-B port and the PC's USB A-Type port.

    From                       | Wire                       | To  
    :----                      |:-----:                     |----: 
    BeagleBone USB Mini-B Port |USB Cable                   |PC USB A-Type Port


> Notice: The BeagleBone's array of blue LEDs will blink.

# Original


> This article could use your help.

See the official BeagleBone documentation while following this guide. 

> [http://beagleboard.org/getting-started](http://beagleboard.org/getting-started)  

# Get Setup

If you can connect to your BeagleBone by visiting [http://beaglebone.local]() then everything is going ok. If you have to use it's IP address, then internet shaing is disabled.

##Share your internet connection

Turn on internet sharing for your system, and share it with the B3

//Mac instructions go here

//windows instructions go here

## Powercycle

Powercycle the BeagleBone (Eject, unplug, plug it back in)

## DH Client

Run this from your Cloud9 IDE command prompt: 

```bash
root@beaglebone:/var/lib/cloud9# dhclient usb0
```
## Test

Try visiting [http://beaglebone.local]() again. If you can connect, you're good to go. If not, there's one more step.

## One last thing

Eject and unplug the BeagleBone then **restart your computer**. Plug the board back in *after* your system is back up, then try the [http://beaglebone.local]() link again. 

## Still not working? 

  * Links
  * to outside
  * resource


# Accurate Date & Time

Ever notice that your zetta logs have a timestamp from some other point in the past? Run this terminal command to get your BeagleBone's OS synced up with the current time, where `[server]` is the appropriate time server from [http://www.pool.ntp.org/]()

```
sudo ntpdate -s pool.ntp.org
```

Then [set your timezone](http://www.cyberciti.biz/faq/howto-linux-unix-change-setup-timezone-tz-variable/) using: 

```
dpkg-reconfigure tzdata
```

And just follow the promps. 

# Pinout

Pins on the BeagleBone Black come in two banks, P8 and P9. Each bank has 46 pins. Here's a pinout diagram: 

![BeagleBone Pinout](http://insigntech.files.wordpress.com/2013/09/bbb_pinouts.jpg){:.zoom}

Taking bank P9 for example, notice that that row of pins along the inner edge of the board are evenly numbered (2, 4, 6, 8 etc...), while the exterior row is odd (1, 3, 5, 7...). Only the first and last pins of each row come with printend numbers - this helps you determine which row is even and odd but also means that you just have to count pins to get to the right one. 