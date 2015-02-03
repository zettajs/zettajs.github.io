---
layout: project
title: Car Speed Tracker System
author: Anil Sagar
difficulty: experienced
duration: 1-2 hours
description: >
  Create an Internet-connected, car speed tracker system with a phillips hue bulb, mock car.
repo: https://github.com/zettajs/zetta-home-security/
---

# Directions

1. [Setup Zetta on the Machine](#step-1-setup-zetta-on-the-machine)
1. [Check Car Speed Tracker System](#step-2-check-car-speed)
1. [Link to the Cloud](#step-3-link-to-the-cloud)
1. [Glow Phillips Hue Bulb](#step-4-glow-phillips-hue)
1. [Speed Tracker Application](#step-5-speed-tracker-application)
1. [Run the Speed Tracker Application](#step-6-run-the-spped-tracker-app)
{:.steps}

# Goal

The goal for this project is to create a simple car speed tracker system by assembling a mock car, a phillips hue LED Bulb into a Zetta app running on a PC. We will connect the app to the Internet by linking the laptop with a second Zetta server running in the cloud.

A simple use case we try to demonstrate is if a car speed goes above 100 mile/hour then family at home will be alerted by turning Phillips HUE LED bulb into red in color at home. For Example, Using this app a father knows his teenage son is driving too fast sitting at home.

# Parts

This project requires

1. A PC with an Internet connection and [Node.js](http://nodejs.org/download/).
2. Phillips Hue Bulb & Hub

# Step #1: Setup Zetta on the PC

## Initialize the Project

1. From the PC command line, create the project directory.

```bash
mkdir zetta-speed-tracker
```
