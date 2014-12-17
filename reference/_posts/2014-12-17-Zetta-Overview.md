# Zetta Overview

Zetta is an API first platform for the Internet of Things. This is a general overview of core concepts that are important to a Zetta developer. 

## Contents

1. Core Concepts
  - Server
  - Drivers
  - Scouts
  - Apps
  - Server Extensions
2. Zetta Deployment
3. Zetta API

## Core Concepts

![Core Concepts Diagram](/images/reference/zetta-core-concepts.png)

### Server

The Zetta server is the highest level of abstraction in Zetta. The Zetta server contains Drivers, Scouts, Apps, and Server Extensions. A Zetta server will typically run on a hardware hub such as a BeagleBone Black, Intel Edison, or Raspberry Pi. The server itself coordinates interactions between all of the contained components to communicate with devices, and generate HTTP APIs that an API consumer can interact with. 

### Linking

Zetta servers allow for establishing a secure tunneled link between two servers. This connection takes care of network configurations, and firewalls that make cloud connected IoT solutions difficult to maintain. 

### Drivers

Zetta drivers are state machine representations of devices. Drivers are primarily responsible for modeling devices, and interacting with the device on the physical level. These device models are then taken, and used to generate HTTP and JS APIs for use in Zetta.

### Scouts

Zetta scouts serve as a discovery mechanism for devices that may be on the network, or require system resources to speak a specific protocol. Scouts will search for devices on a particular protocol, and report back to Zetta when they've been found. Scouts can also use identifying information about devices (e.g. a devices MAC address) to identify whether or not Zetta has interacted with the device before, and ensure any relevant data or security credentials are maintained when interacting with that device an additional time. 

### Apps

Apps are interactions between devices written in javascript. Zetta allows developers to create local interactions based on sensor streams, or changes in devices. These apps will function regardless of inter-Zetta connectivity, and allow for quick response times to certain events in the system.

### Server Extensions

Zetta follows a pluggable model for extending functionality. Most of these will be server extensions. Server extensions will deal with API management, defining addtional APIs, or even adding security to your API.

### Registry

The registry is a persistence layer for Zetta. It's a small database that lives in the server context, and holds information about devices connected to the server itself.

## Zetta Deployment

A typical Zetta deployment will look something like below.

1.  One Zetta server will live on a hardware hub. This hub is typically something like a BeagleBone Black, Intel Edison, or Raspberry Pi.
  - The Zetta hub will connect to devices. Zetta will mediate from HTTP to the particular protocols used in a deployment.
2.  Another Zetta server will live in the cloud. This server will use the exact same node package as Zetta on the hub.
  - The Zetta server on the hardware hub will connect to the server in the cloud.
3. Zetta will then expose an API to any consumers at the cloud endpoint.


![Zetta Deployment](/images/reference/zetta-deployment.png)

## Where do my APIs live?

APIs are on each instance of a Zetta server. Zetta uses hypermedia to expose a walkable set of links for navigating the API from a response, and affordances for streaming and interacting with devices. We conform to the [Siren](http://sirenspec.org/)

1. Querying for devices on a particular server
2. Setting up links between servers
3. Interacting with Devices
4. Streaming sensor data with websockets
5. Registering hubless devices
