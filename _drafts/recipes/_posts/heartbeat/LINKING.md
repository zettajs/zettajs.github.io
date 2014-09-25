#Linking

Linking is a powerful tool. It allows multiple Zetta servers to communicate with each using a special tunneling protocol.
This will allow you to open up your system to the cloud, or any other place that you may want access. We'll go over
how to enable a link between two Zettas, and what it means for the API.

##Contents

1. What is linking?
2. Link to another server
3. New API Endpoint

###What is linking?

Linking is a special concept in Zetta that enables multiple instances of Zetta to communicate with each other. These instances
of Zetta can be inside or outside of home routers, firewalls, or simply across data centers. Zetta handles the connection needed
to maintain this communication using open standards and protocols. This concept is incredibly powerful, and allows for true
communication across the internet.

###Link to another server

Linking to another server is as simple as using the `link()` function. Link takes server urls as an array of strings or just a
single string if you want to link to a single server. Today we'll be linking to http://hello-zetta.herokuapp.com/ update your code
to look similar to below.

```javascript
var zetta = require('zetta');
var LED = require('zetta-mock-led');
var Heartbeat = require('zetta-mock-heartbeat-sensor');

zetta()
  .name('firstname.lastname')
  .link('http://hello-zetta.herokuapp.com/')
  .use(LED)
  .use(Heartbeat)
  .listen(1337);
```

+ Zetta can identify servers by uuid, but that's a bit harder for humans. So we give everyone the option to name their server.
+ We've used link to establish a connection to `"http://hello-zetta.herokuapp.com/"`

###New API Endpoint

With our Zetta server now linked to the cloud we can use the cloud Zetta server to access the one on our computer.

Open http://browser.zettajs.io/ and input the url http://hello-zetta.herokuapp.com/. You should see the exact same UI as before. You're now communicating with your Zetta server through the cloud server.
