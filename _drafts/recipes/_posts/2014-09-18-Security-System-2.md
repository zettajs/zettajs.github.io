#The Piezo Element

The piezo element is a key piece of our IoT security system. It will let out a loud buzz that will function as our sound component to the alarm.
This element will get us going with the basics of Zetta. This step will have us dealing with `npm` and `drivers` in Zetta.
Drivers are a key component of Zetta, and will be the building blocks of your IoT app. They represent real world devices in software,
and follow a state machine model. Drivers are distributed and used in the form of Node.js packages on NPM.


##Contents

1. Circuit
2. Retrieving Driver
3. Adding code to Server
4. API and Browser

###Circuit

Here is a simple fritzing diagram of what your circuit will look like on the BeagleBone Black.

![Hookup Diagram](img/hookup_diagram_step_1.png)

###Retrieving Driver

Drivers in Zetta are distributed through NPM the Node Package Manager. It's a tool that is automatically distributed
with node.js and makes dependency management a breeze. To retrieve our package you'll want to use the command line and
type `npm install zetta-buzzer-bonescript-driver`. This will automatically fetch the package off NPM and ensure all
dependencies are met.

The driver you just downloaded represents a piezo element in software. It's state machine is comprised of the `on`, `off` states. When `on` it will
turn the buzzer on, and when `off` it will turn the buzzer off. The changes in state are represented by transitions. Transitions are functions in
Zetta that are called when the state of an object changes. Our piezo element has `on`, `off`, and `beep` as transitions. `on` and `off` change to
their corresponding states, and `beep` will swap the state between `on` and `off` creating an alarm effect.

**TIP**: Ensure you install while on the BeagleBone operating system. The package
installation will fail if you use your native OS.

**TIP**: Every module you'll use in this tutorial is open source. This one can be found here https://github.com/zettajs/zetta-buzzer-bonescript-driver.

###Adding code to Server

Now it's time to actually wire up our Zetta driver into the server node. Below is a snippet we'll go through line by line.

```javascript
var zetta = require('zetta');
var Buzzer = require('zetta-buzzer-bonescript-driver');

zetta()
  .use(Buzzer, 'P9_14')
  .listen(1337)
```

* The first line requires the Zetta package. This contains all the functionality needed to wire up an IoT app.
* The second line requires the driver for the piezo element.
* The third line initializes an instance of zetta for use in your code.
* The fourth line tells zetta that we want to use a piezo element hooked up to our BeagleBone Black.
* The fifth line tells zetta that we want our API server to listen at port `1337`

###API and Browser

In Zetta every device gets an API automatically generated for it. Our API will represent the device in it's current state,
and the actions that can be taken on it. We use a special hypermedia type known as [Siren](http://sirenspec.org/) to represent
our entities. Below is what a sample API response for your piezo module should look like.


```json
{
  "class": [
    "device"
  ],
  "properties": {
    "id": "18662cab-92b2-42d3-9e5e-1c0422da81f6",
    "pin": "P9_14",
    "type": "buzzer",
    "name": "Buzzer",
    "state": "off"
  },
  "actions": [
    {
      "name": "beep",
      "method": "POST",
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/18662cab-92b2-42d3-9e5e-1c0422da81f6",
      "fields": [
        {
          "name": "action",
          "type": "hidden",
          "value": "beep"
        }
      ]
    },
    {
      "name": "turn-on",
      "method": "POST",
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/18662cab-92b2-42d3-9e5e-1c0422da81f6",
      "fields": [
        {
          "name": "action",
          "type": "hidden",
          "value": "turn-on"
        }
      ]
    }
  ],
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/devices/18662cab-92b2-42d3-9e5e-1c0422da81f6"
    },
    {
      "title": "beaglebone",
      "rel": [
        "up",
        "http://rels.zettajs.io/server"
      ],
      "href": "http://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19"
    },
    {
      "title": "state",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/events?topic=buzzer%2F18662cab-92b2-42d3-9e5e-1c0422da81f6%2Fstate"
    },
    {
      "title": "logs",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://zetta-cloud-2.herokuapp.com/servers/38f645ed-73da-4742-8f20-c46317a48c19/events?topic=buzzer%2F18662cab-92b2-42d3-9e5e-1c0422da81f6%2Flogs"
    }
  ]
}
```

A device in zetta has three different pieces of information attached to it in the API.

* `properties` are information on the object. Most of this is user defined.
  * `type` is defined by the driver. It lets Zetta know what kind of device is represented in the API.
  * `id` is a unique identifier that Zetta generates for you.
  * `name` is a unique identifier that can be determined by you in the driver. For now we hard coded it to `"Buzzer"`.
* `actions` are the specific actions that can be taken on the object. We outline any parameters needed, and what kind of HTTP call must be made to trigger the action.
* `links` are different pieces of context around the object. They can be websocket links leading to sensor readings or links back to the parent server of where the object lives.
