#The LED

Here we'll add our LED. We'll go over what the first steps are in getting started with Zetta.

##Contents

1. Retrieving the Driver
2. Adding Code to the Server
3. API
4. Browser

###Retrieving the Driver

Firstly, we'll need to retrieve the driver for our mock LED. Zetta uses npm to manage dependencies,
and module distribution. To get started open your command line and navigate to your project. Then type:

```
$ npm install zetta-mock-led
```

The above line will retrieve the driver for you off the npm registry, and place it in your `node_modules/` folder.

###Adding Code to the Server

Next we'll initialize our device and load it into Zetta. Here is what you need to write in your `server.js` file.

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');

zetta()
  .use(LED)
  .listen(1337);
```

+ The first line will load the zetta module into the script.
+ The second line will load the mock LED module into the script.
+ The third line will initialize Zetta and make sure everything is wired up properly.
+ The fourth line calls the `use()` function. This function tells Zetta that we'd like to use a device.
+ The fifth line tells Zetta what port the API server should listen on.

Now let's go back to our command line and type

```
$ node server.js
```

The above command will start your server, and expose and API for your mock LED.

###API

With Zetta everything is API first. Whenever you use a device in the platform an HTTP API is generated for you. Navigate
your browser to http://0.0.0.0:1337/ to see what the API will look like. Below is a sample API response.

```json
{
  "class": [
    "root"
  ],
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://0.0.0.0:1337/"
    },
    {
      "rel": [
        "http://rels.zettajs.io/server"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773"
    },
    {
      "rel": [
        "http://rels.zettajs.io/peer-management"
      ],
      "href": "http://0.0.0.0:1337/peer-management"
    }
  ]
}
```

Above is a sample response for the root of your API. Zetta harnesses Siren hypermedia for an expressive, and robust
API model that allows for more contextual information to be passed between client and server. Navigate to the link
with rel `"http://rels.zettajs.io/server"`. Zetta organizes everything by server, and this is the link to the server you just created.

```json
{
  "class": [
    "server"
  ],
  "properties": {
    "id": "b4984382-4776-43ca-8d9d-329eb571f773",
  },
  "actions": [
    {
      "name": "register-device",
      "method": "POST",
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/devices",
      "type": "application/x-www-form-urlencoded",
      "fields": [
        {
          "name": "type",
          "type": "text"
        },
        {
          "name": "id",
          "type": "text"
        },
        {
          "name": "name",
          "type": "text"
        }
      ]
    }
  ],
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773"
    },
    {
      "rel": [
        "monitor"
      ],
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events%3Ftopic=logs"
    }
  ],
  "entities": [
    {
      "class": [
        "device"
      ],
      "properties": {
        "id": "19bd231d-40fd-4e97-a018-91a91d93f61c",
        "type": "led",
        "name": null,
        "state": "off"
      },
      "links": [
        {
          "rel": [
            "self"
          ],
          "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/devices/19bd231d-40fd-4e97-a018-91a91d93f61c"
        },
        {
          "rel": [
            "up",
            "http://rels.zettajs.io/server"
          ],
          "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773"
        }
      ]
    }
  ]
}
```

Above is the next important sample API response. Notice that we have an API representation for our LED now? This representation
is only an abbreviated one though. We need to navigate to the link with rel of `"self"` on the entity in the entities array. We'll navigate
to that link to finally see what we can do with the device.

```json
{
  "class": [
    "device"
  ],
  "properties": {
    "id": "19bd231d-40fd-4e97-a018-91a91d93f61c",
    "type": "led",
    "name": null,
    "state": "on"
  },
  "actions": [
    {
      "name": "turn-off",
      "method": "POST",
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/devices/19bd231d-40fd-4e97-a018-91a91d93f61c",
      "fields": [
        {
          "name": "action",
          "type": "hidden",
          "value": "turn-off"
        }
      ]
    }
  ],
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/devices/19bd231d-40fd-4e97-a018-91a91d93f61c"
    },
    {
      "rel": [
        "up",
        "http://rels.zettajs.io/server"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773"
    },
    {
      "title": "state",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events?topic=led%2F19bd231d-40fd-4e97-a018-91a91d93f61c%2Fstate"
    },
    {
      "title": "logs",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events?topic=led%2F19bd231d-40fd-4e97-a018-91a91d93f61c%2Flogs"
    }
  ]
}
```

Above is the actual full representation of the Zetta device.

+ The `"properties"` of a device are simply bits of data that are important to it.
    + In Zetta everything has a `"state"`, and that particular property helps determine what actions a device can take.
+ The `"actions"` of a device are things that can be done to manipulate it. Here we can use the `"turn-off"` action to turn the LED off.
+ The `"links"` property allows us to navigate to other things that are important about the device.
  + The first kind of link is http based. It allows us to navigate the API
  + The second is a web socket link. This allows us to stream data out of the system easily.

###Browser

The Zetta team has actually created an API browser that will easily consume this API. Open a new tab in your web browser and navigate to
http://browser.zettajs.io/. Here we can interact and crawl the API with a convenient, and well designed user interface.

Simply input your server endpoint http://0.0.0.0:1337/ and you should be automatically directed to your LED! 
