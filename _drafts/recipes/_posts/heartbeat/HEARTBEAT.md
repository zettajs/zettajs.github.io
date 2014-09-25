#Heartbeat

Here we'll add our Heartbeat sensor. We'll go over how to add an additional device, and what benefits sensors have in Zetta.

##Contents

1. Retrieving the Driver
2. Adding Code to the Server
3. API and Browser

###Retrieving the Driver

Again we'll use the npm command to retrieve the driver. Type the following into your command line.

```
$ npm install zetta-mock-heartbeat-sensor
```

###Adding Code to the Server

Next we'll add our device to the server. Update your `server.js` file to look like the code below.

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var Heartbeat = require('zetta-mock-heartbeat-sensor');

zetta()
  .use(LED)
  .use(Heartbeat)
  .listen(1337);
```

After that run your server with the `node server.js` command.

###API and Browser

Again, Zetta has generated an API repsone for all the devices we want to use. Here is a sample heartbeat sensor API response.

```json
{
  "class": [
    "device"
  ],
  "properties": {
    "pulse": 62,
    "id": "7ae5a550-2594-47a2-af3f-90a3e7a8d1bf",
    "type": "heartbeat",
    "name": null,
    "state": null
  },
  "actions": null,
  "links": [
    {
      "rel": [
        "self"
      ],
      "href": "http://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/devices/7ae5a550-2594-47a2-af3f-90a3e7a8d1bf"
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
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events?topic=heartbeat%2F7ae5a550-2594-47a2-af3f-90a3e7a8d1bf%2Fstate"
    },
    {
      "title": "pulse",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events?topic=heartbeat%2F7ae5a550-2594-47a2-af3f-90a3e7a8d1bf%2Fpulse"
    },
    {
      "title": "logs",
      "rel": [
        "monitor",
        "http://rels.zettajs.io/object-stream"
      ],
      "href": "ws://0.0.0.0:1337/servers/b4984382-4776-43ca-8d9d-329eb571f773/events?topic=heartbeat%2F7ae5a550-2594-47a2-af3f-90a3e7a8d1bf%2Flogs"
    }
  ]
}
```

The heartbeat sensor should look similar to the LED in the previous step. However, instead of actions it has a web socket link for streaming
pulse data. This link can be accessed with the web socket link with the title `"pulse"`. Now let's open our browser, and take a look at our new device.

After opening the browser you should see that we have our LED like before, and now we have our heartbeat sensor as well. The browser will also auto subscribe
to any sensor streams coming from the API. You should see data in real time updating in the browser!
