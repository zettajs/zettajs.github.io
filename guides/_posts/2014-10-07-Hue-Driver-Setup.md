---
layout: guide
title: Getting started with zetta-hue-driver
description: >
  This guide will take you through the steps 
  of getting started with Phillips Hue on Zetta
published: false
---

Philips hue is a personal wireless lighting system...

# Installing the code

```
git clone https://github.com/zettajs/zetta-hue-driver.git
```

# Register your hub

As a security measure, you must register your hub in order for the zetta-hue-driver to find your connected bulbs.

To do this:

  * push the link button on top of your hue hub
    * the same physical button you pushed when you linked your hub to your mobile app or web account
  * trigger the regiser action in the zetta api.
    * You'll have 10-20 seconds to do this before the api times out.