---
layout: recipe
---

#Publishing your modules to npm

Now that you have a functioning Zetta devices, you can publish them to NPM for others to use. If you followed our folder structure from the tutorials this will be a really easy process.
If not, this is what your folder structure should look like

+ `/zetta-arduino-i-heard-that`
  + `index.js`
  + `microphone_driver.js`
  + `lcd_driver.js`


##Prepare for publishing to npm

There are no differences between standard npm modules and zetta npm modules. You just need to create a package.json file with `npm init`.

Some best practices to note.

1. Be sure to consistently name your module. Something from our case would be `zetta-arduino-i-heard-that`. This lets a user know exactly what the driver will be doing in Zetta.
2. In the `'tags'` array of your package.json be sure to add `'zetta'`. This way we can aggregate your module with other specialized Zetta modules.
3. If there is a specific firmware needed for your package add a `'firmware'` property to your package.json with a link to the github repository where it lives.

##Publish to npm

After you've prepared your module all you need to do is run the `npm publish` command on the command line, and you are done!
