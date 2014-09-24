---
layout: recipe
---

# Dobson's Thoughts Here:

##Recipe Ideas

###Feedback

- LCD First?
  - Easier to depict the state machine concept clearly
  - Instant gratification? Seeing feedback instantly
- Scope back geolocation?
  - Home and Office
  - Progressive buildup of scale.


###Recipe ideas

- I heard that!
  - LCD + Sound Sensor
- Go Crazy!
  - LCD + Sound Sensor + Robot Arm + etc.
- Pebble Light Switch
  - Pebble + Hue?
- Sphero Remote
  - Pebble + Sphero
- Tessel Ideas
  - Home Security
    - Ambient
    - Camera
    - Sound
  - Smart Lock
    - BLE
    - Servo
  - Smart Garden
    - nrf24 Module
    - Climate Sensor
    - Servo
      - Watering Plants?
  - Geocaching Stuff
    - GPS
    - Cellular?
- Spark Core
  - Open Source Nest
   - Temp Sensor
   - Motion Detector
   - LED Readout
- Generative Art
 - http://labs.ideo.com/2014/06/04/painting-with-code/
 - Using NeoPixels or other outputs with Zetta to create art installations
 - Tuned to music or other noise

####Recipe Example: I Heard That!

- Components
  - Raspberry Pi / Beaglebone / Intel Galileo
  - Arduino (1 or 2?)
  - LCD Screen
    - https://www.sparkfun.com/products/11851
  - Sound Sensor
    - https://www.sparkfun.com/products/12642
- Steps
  -
  - Intro to Scouts and Drivers
    - Write a sound sensor scout
      - Serial
      - Wired to Arduino
    - Write a sound sensor driver
      - State machines
      - Streaming Data
###Basic

- Writing Scouts
  - Enabling discovery
- Writing Drivers
  - What is a state machine?
  - What are transitions?
  - What is a stream?
- Connecting to a device
  - Serial / Firmata
- Looking at the developer tool
  - GUI
- Interacting with the API
- Creating a basic interaction

###Intermediate

- Writing Tests
- Interacting with NPM modules for consumer devices
  - Wemo
  - Hue
  - Sonos
- Using more advanced protocols
  - Bluetooth
  - UDP
  - TCP
  - Zigbee

###Advanced

- Publishing an NPM Module
  - Device Driver
  - Device scout
  - Best practices
- Pairing Custom Firmware with Zetta
- Using more advanced prototyping hardware
  - Arduino Mega?
  - Spark Core
  - Custom AVR Boards
  - ??
- Modeling complex objects in Zetta
  - Swarm robots
  - Kinect
