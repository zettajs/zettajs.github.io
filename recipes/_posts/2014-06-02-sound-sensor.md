---
layout: recipe
---

## Overview

In this recipe, we will setup a sound detector, create an API for it and show how to include it in an app.

We will also explore how to develop, test, stage and deploy the sensor into production in multiple, geo-distributed locations.

### Preparation Time Estimates

* Hardware Preparation Time: 30 minutes
* Software Development Time: 15 minutes

## Hardware

### Parts List
* Development Computer
* [Sound Detector](https://www.sparkfun.com/products/12642)
* [Arduino Uno](http://arduino.cc/en/Main/ArduinoBoardUno)
* [Breadboard]()
* Wires
* *more*

### Setup

1. Connect the sensor to the breadboard
    1. foo
    1. bar
1. Connect the breadboard to the Arduino
    1. foo
    1. bar
1. Connect the Arduino to your computer
    1. foo
    1. bar
1. *more*

## Software

### Zetta Projects Overview

Zetta projects typically include apps and devices. The file structure looks like this:

```
+ /soundSensor
  + app.js
  + /drivers
  + /scouts
  + /envs
    + /dev
    + /test
    + /stage
    + /production
```

### Install Zetta

Install Zetta and prerequisites, see [Zetta Installation Recipe]().

### Write Device Driver

* Generate a new device driver 

```
zetta generate ...
```

Call the driver .... In zetta the naming convention for a device driver is ... .

* Write this code

{% gist mdobson/81043bf7ff6fce4d6d4d %}

Notice the variable names for the sensor value is  and for the  it is .... The conventional way to name a driver is....

### Write Device Scout

* Generate a new device scout

```
zetta generate ...
```

Call the scout .... In zetta the naming convention for a scout is ... .

* Write this code

{% gist kevinswiber/007894e244d6e5440df8 %}

Notice the variable names for the sensor value is .... The conventional way to name a driver is....

### Write an App

In order to test the device, we will want to create an app for it.

```
zetta generate ...
```

Call the app ... In zetta the naming convention for apps is ... .

* Write this code

```
js
```

Notice the variable names for .... The conventional way to name ....

## API

In Zetta, web APIs are an inherent part of every project. So now that we have a device and an app we also have an API.

### Run Zetta

Run Zetta

```
node app.js
```

### Explore Web API

Explore the Zetta API

```
{}
```

## Lifecycle: Dev, Test, Deploy, Production

When things get real with sensors in production, it's important to consider the entire development cycle.

Zetta is designed to support dev, test, stage and production environments.

```
+ /soundSensor
  + /envs
    + /dev
    + /test
    + /stage
    + /production
```

## Multiple Geo-Locations

Zetta is designed to connect devices across multiple geo-locations. In this example, we will imagine deploying sound sensors in four locations:

* Detroit, USA
* San Jose, USA
* Bangalore, India
* London, UK

We follow the steps above to get the sensor hardware setup and configured in each location.

Identify the locations...

```
js
```

Deploy to all locations:

```
zetta ...
```

Deploy to one location:

```
zetta ...
```


## Next Steps

### Write an App

Write an app, see [I Heard That App]().

## Summary