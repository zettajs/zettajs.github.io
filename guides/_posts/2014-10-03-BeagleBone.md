---
layout: guide
title: How to Connect a BeagleBone to the Internet via a PC
description: This guide shows you how to share the Internet connection from a PC to a BeagleBone Black.
---

# Steps

1. [Connect BeagleBone to PC via USB](#Connect-BeagleBone-to-PC-via-USB)
  * [USB Cable](#usb-cable)
  * []
{:.steps}

# 1. Connect BeagleBone to PC

1. Connect the USB cable between the BeagleBone and the PC.

    From                       | Wire                       | To  
    :----                      |:-----:                     |----: 
    BeagleBone USB Mini-B Port |USB Cable                   |PC USB A-Type Port

> **eye**{:.icon} Notice that the BeagleBone's array of blue LEDs will blink and on the PC the BeagleBone will appear as a network device.

![Mac OS X Network Preferences](/images/guides/beaglebone_internet_sharing/network_preferences_osx.png)

1. Go to [http://beaglebone.local/](http://beaglebone.local/).

> **eye**{:.icon} You will see the BeagleBone 101 page served from the BeagleBone. 

# 2. Test Internet Connection from BeagleBone

* Go to [http://beaglebone.local:3000/](http://beaglebone.local:3000/) to open the Cloud 9 IDE

* Try to ping Google from the BeagleBone's Cloud9 console.

```bash
ping google.com
```
The console should return an unknown host error.

```bash
root@beaglebone:/var/lib/cloud9# ping google.com
ping: unknown host google.com
```

* Run dhclient

```bash
dhclient usb0
```
The console should return with a default prompt. It can take as long as 6 minutes or more.

```bash
root@beaglebone:/var/lib/cloud9# dhclient
root@beaglebone:/var/lib/cloud9#
```

* Now try to ping Google again.

```bash
ping google.com
```
The console should return with good ping responses. Hit `CTRL-c` to cancel the ping.

```bash
root@beaglebone:/var/lib/cloud9# ping google.com
PING google.com (74.125.225.6) 56(84) bytes of data.
64 bytes from ord08s12-in-f6.1e100.net (74.125.225.6): icmp_req=1 ttl=54 time=22.2 ms
64 bytes from ord08s12-in-f6.1e100.net (74.125.225.6): icmp_req=2 ttl=54 time=22.4 ms
64 bytes from ord08s12-in-f6.1e100.net (74.125.225.6): icmp_req=3 ttl=54 time=20.6 ms
64 bytes from ord08s12-in-f6.1e100.net (74.125.225.6): icmp_req=4 ttl=54 time=21.5 ms
^C
--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 5719ms
rtt min/avg/max/mdev = 20.615/21.691/22.416/0.713 ms
```

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