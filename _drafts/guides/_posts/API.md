---
layout: guide
date: 2014-06-13
---

#### Root URI

Some general notes on the Root URI.

1. This will serve as the entry point into the API.
2. Currently we use link relations to show off different peers connected to the zetta instance. `title` will indicate the peers name `href` indicates how to access the peer via this API.


`GET http://zetta-cloud.herokuapp.com/`

```json
{
  class: ["root"],
  properties: {},
  entities: [],
  "links": [
    {
      rel: ["self"],
      href: "http://zetta-cloud.herokuapp.com/"
    },
    {
      title: "cloud",  
      href: "http://zetta-cloud.herokuapp.com/servers/1A5A6AC6-E1B9-4905-8227-714FB202AED8",
      rel: ["http://rels.zettajs.io/server"]
    },
    {
      title: "detroit",  
      href: "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7",
      rel: ["http://rels.zettajs.io/peer"]
    },
    {
      title: "bangalore",
      href: "http://zetta-cloud.herokuapp.com/servers/7567C3D6-14E0-4217-80CB-A848A64E5756",
      rel: ["http://rels.zettajs.io/peer"]
    },
    {
      "href": "http://zetta-cloud.herokuapp.com/peer-management",
      "rel": ["http://rels.zettajs.io/peer-management"]
    }
  ]
}
```

#### Root URI of Zetta Instance

Some general notes on the Zetta instance API.

1. The `entities` property will contain all devices connected to that particular instance of Zetta.
2. The `id` property is a unique id generated for the developer.

`GET http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7`

##### Detroit Zetta Instance

```json
{
  class: ["server"],
  "properties": {
    "id":"4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7",
    "name": "detroit"
  },
  "entities": [
    {
      "class": ["device"],
      "rel": ["http://rels.zettajs.io/device"],
      "properties": {
        "id": "A85135B4-5664-4B4F-9DB9-1DBDD28FDC20",
        "type": "lcd",
        "name": "LCD Screen",
        "state": "ready"
      },
      "links": [
        {
          "rel": ["self"],
          "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/devices/A85135B4-5664-4B4F-9DB9-1DBDD28FDC20"
        },
        {
          "title":"detroit"
          "rel": ["up", "http://rels.zettajs.io/server"],
          "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7"
        }
      ]
    },
    {
      "class": ["device"],
      "rel": ["http://rels.zettajs.io/device"],
      "properties": {
        "id": "7A8B1779-FEEE-493C-8ADC-32460A6BD8A1",
        "type": "microphone",
        "name": "My Microphone",
        "state": "ready"
      },
      "links": [
        {
          "rel": ["self"],
          "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/devices/7A8B1779-FEEE-493C-8ADC-32460A6BD8A1"
        },
        {
          "title":"detroit"
          "rel": ["up", "http://rels.zettajs.io/server"],
          "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7"
        }
      ]
    },
  ],
  links: [
    {
      rel: ["self"],
      href: "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7"  
    },
    {
      rel: ["monitor"],
      href: "ws://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/events?topic=logs"
    }
  ]
}
```

#### Device Representations

Below are a sampling of device representations for the **I Heard Dat!** Zetta application.


##### Example Microphone Device

Some general notes on the Microphone Responses.

1. The object stream is now name spaced under `/servers/<peer-uuid>/events?topic=<device type>/<device uuid>/<stream name>`
2. We include an `up` link relation for a navigation back to the parent context. In this case it's the peer the device belongs to.

```json
{
 "class":["device"],
 "properties": {
  "id":"B30B37E6-434C-4AA1-AC25-EC6FD7715CE1",
  "name":"My Microphone",
  "type":"microphone",
  "state":"ready",
  "amplitude":10
 },
 "links":[
    {
      "title":"amplitude",
      "rel":["monitor", "http://rels.zettajs.io/object-stream"],
      "href":"ws://zetta-cloud.herokuapp.com/servers/7567C3D6-14E0-4217-80CB-A848A64E5756/events?topic=microphone/B30B37E6-434C-4AA1-AC25-EC6FD7715CE1/level"
    },
    {
      "title":"logs",
      "rel":["monitor", "http://rels.zettajs.io/object-stream"],
      "href":"ws://zetta-cloud.herokuapp.com/servers/7567C3D6-14E0-4217-80CB-A848A64E5756/events?topic=microphone/B30B37E6-434C-4AA1-AC25-EC6FD7715CE1/logs"
    },
    {
      "rel": ["self"],
      "href": "http://zetta-cloud.herokuapp.com/servers/7567C3D6-14E0-4217-80CB-A848A64E5756/devices/B30B37E6-434C-4AA1-AC25-EC6FD7715CE1"
    },
    {
      "title":"bangalore",
      "rel": ["up", "http://rels.zettajs.io/server"],
      "href": "http://zetta-cloud.herokuapp.com/servers/7567C3D6-14E0-4217-80CB-A848A64E5756
    "
    }
  ]
}
```

##### Example LCD Screen Response

1. Each will return the current text within the `message` property of the API.
2. It will have a monitor link for updates on the `message` field.
3. It will have a monitor link for all logs regarding the lcd screen.
4. We include an `up` link relation for a navigation back to the parent context. In this case it's the peer the device belongs to.

```json
{
 "class":["device"],
 "properties": {
  "id":"63C9D11C-4567-4911-90A8-1357C810C65C",
  "name":"My LCD Screen",
  "type":"lcd",
  "state":"ready",
  "message":"I heard dat!"
 },
 "actions":[
   {
     "name":"change",
     "method":"POST",
     "href":"http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/devices/63C9D11C-4567-4911-90A8-1357C810C65C",
     "fields": [
       {
         "name": "action",
         "type": "hidden",
         "value": "change"
       },
       {
         "name":"message",
         "type":"text"
       }
     ]
   }
 ],
 "links":[
    {
      "rel": ["self"],
      "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/devices/63C9D11C-4567-4911-90A8-1357C810C65C"
    },
    {
      "title":"detroit",
      "rel": ["up", "http://rels.zettajs.io/server"],
      "href": "http://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7"
    },
    {
      "rel": ["monitor", "http://rels.zettajs.io/log-stream"],
      "href": "ws://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/events?topic=lcd/63C9D11C-4567-4911-90A8-1357C810C65C/logs"
    },
    {
      "title":"message",
      "rel":["monitor", "http://rels.zettajs.io/object-stream"],
      "href":"ws://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/events?topic=lcd/63C9D11C-4567-4911-90A8-1357C810C65C/message"
    }
  ]
}
```


#### Peer Management

Some general notes on the Zetta peer management collection API.

1. This is a general list of peers connected to the current zetta instance.
2. It will include a string `status` in the `properties` indicating the current peer connection status.
3. In the `links` section. A developer can use the `monitor` link relation to access logs on that particular zetta peer.
4. A `updated` timestamp in the properties indicates the last time a peer was interacted with.

`GET http://zetta-cloud.herokuapp.com/peer-management`

```json
{
  "class": ["peer-management"],
  "entities": [
    {
      "class": ["peer"],
      "links": [
        {
          "rel": ["self"],
          "href": "http://zetta-cloud.herokuapp.com/peer-management/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7"
        },
        {
          "rel": ["http://rels.zettajs.io/server"],
          "href": "http://zetta-cloud.herokuapp.com/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7"
        },
        {
          "rel": ["monitor"],
          "href": "ws://zetta-cloud.herokuapp.com/servers/4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7/logs"
        }
      ],
      "properties": {
        "id": "4FB6EA0A-D1F0-4AF0-9F69-A980C55F20D7",
        "name":"detroit",
        "status":"connected",
        "updated": 1411047195582,
        "direction": "acceptor"
      }
    },
    {
      "class": ["peer"],
      "links": [
        {
          "rel": ["self"],
          "href": "http://zetta-cloud.herokuapp.com/peer-management/7567C3D6-14E0-4217-80CB-A848A64E5756"
        },
        {
          "rel": ["http://rels.zettajs.io/server"],
          "href": "http://zetta-cloud.herokuapp.com/servers/7567C3D6-14E0-4217-80CB-A848A64E5756"
        },
        {
          "rel": ["monitor"],
          "href": "ws://zetta-cloud.herokuapp.com/servers/7567C3D6-14E0-4217-80CB-A848A64E5756/logs"
        }
      ],
      "properties": {
        "id":"7567C3D6-14E0-4217-80CB-A848A64E5756",
        "name":"bangalore",
        "status":"connected",
        "updated": 1411047195582,
        "direction": "acceptor"
      }
    }
  ],
  "actions": [
    {
       "name": "link",
       "method": "POST",
       "href": "http://zetta-cloud.herokuapp.com/peer-management",
       "fields": [
         { "name": "url", "type": "url" }
       ]
    }
  ],
  "links": [
    {
      "rel": ["self"],
      "href": "http://zetta-cloud.herokuapp.com/peer-management"
    }
  ]
}
```
