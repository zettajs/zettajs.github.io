---
layout: doc
---

####Class: Zetta.Driver

This is a zetta device modeled in software. With zetta you can create state machines for all of your devices that conditionally allow functionality to be exposed based on the `state` property.
You should inherit from this class and implement the init function `require('zetta').Driver`.

#####Property: state

This is the current state of your device modeled in software.

#####Method: init

This method should be implemented by you. This method allows you to setup your state machine, and any streams coming from the device.

#####Method: when

This method will conditionally set available transitions for your state machine based on the `state` property.

#####Method: map

This method allows you to map transitions to functions in javascript.

#####Method: stream

This method will create a stream of data exposed from the API. The function will be passed a callback with a writable stream.

#####Method: call

This method will call a transition on your state machine.
