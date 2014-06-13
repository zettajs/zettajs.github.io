---
layout: doc
---

####Class: Zetta.Scout

This is a class you inherit from when writing custom device drivers. Scouts are used to search for devices with external node modules, or protocols.
It's used by `require('zetta').Scout`.


#####Method: init

This method should be implemented by you. This allows you to initialize any resources like bluetooth access, serial ports, or
vendor modules needed to look for devices.

#####Method: discover

This method is called by you when you've found your device. 
