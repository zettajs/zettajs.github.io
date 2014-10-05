
# TODO

add these notes to the wiki or somewhere on github

# Notes

* capitalization
  [x] should be BeagleBone not beaglebone, Beaglebone, beagleboard.
  [ ] More general capitalization proofing

* Once your board has connected, connect to it and launch it’s Cloud9 IDE
  * how?
  * !!! include link to http://192.168.7.2:3000/
  * !!! add a screenshot of the browser IDE

* !!! make the setup into a step?
  root@beaglebone:/var/lib/cloud9# git checkout -f step-0
  error: pathspec 'step-0' did not match any file(s) known to git.

* move the whole zetta on beagle bone setup to a how to guide

* Make sure to checkout step-0 with git checkout step-0 to get started with a blank project
  * make is this is a step or a tip?

* !!! tackle internet sharing

* before doing git clone should we ask user to change to a known directory?
  * NO. But we should call out the directory tip sooner.
  * let them know where they (which directory) are and why (Cloud9 needs it that way)

* we might want to drop the command line prompt to make for easier reading and copy paste
  * either no prompt or smaller prompt across all steps

* why is this coming from alanguir's repo? git clone https://github.com/alanguir/zetta-security-system.git
  * this will change back to zettajs

* let's standardize around some verbs for the steps. 'add' probably isn't the right one. 'make' would be better.

* if there is consistently a assemble hardware step and code step then let's break those out.

## http://www.zettajs.org/recipes/2014/09/18/IoT-Security-System.html#hardware

* "Add your piezo buzzer the the breadboard"
  * where to connect?
  * how specific do we want to get.
  * put psotive pin on a-3 of breadboard
  * neg pin on a-6

* calling out pins and banks will be common. can we design a general formatting approach for stuff like this:
  Connect the breadboard’s - (negative) row to pin P9-01 on the beaglebone.
  Connect the breadboard’s + (positivie) to pin P9-07 on the beaglebone.
  Add your piezo buzzer the the breadboard
  Connect the piezo buzzer’s - (negative) lead to the - row of the breadboard.
  Connect the piezo buzzer’s + (positive) lead to pin P9-14 on the beaglebone.

* the BeagleBone pin numbers should be underscored not dashed

* the buzzer location on this fritzing diagram doesn't seem to match the photo or the text: http://www.zettajs.org/images/recipes/security_system/hookup_diagram_step_1.png

* !!! make a new fritzing diagram.

* !!! make a new buzzer image for the fritzing diagram.

* the rotation of this photo wrt to above view was disorienting. made me have to think. http://www.zettajs.org/images/recipes/security_system/piezo_layout_02.jpg
  * might be better to just pan down.

* if the git checkout -f shortcut is a thing we're going to do let's find an icon for it.

* the UI contrast on this command is pretty bad. can't see the --save
   * npm install zetta-buzzer-bonescript-driver --save


### http://www.zettajs.org/recipes/2014/09/18/IoT-Security-System.html#retrieving-the-driver

* TIPS like this aren't really tips toward completing the recipe. they are more like DID YOU KNOW. let's call em out that way.
    > TIP
    > Every module you’ll use in this tutorial is open source. This one can be found here https://github.com/zettajs/zetta-buzzer-bonescript-driver.

* having multiple TIPs in a row should be avoided.


* "Open up server.js and add the following code:"  how? give the path
  * show a screenshot. because i had moved my directory to ~ and back, i had to restart the browser in order to see it.
## http://www.zettajs.org/recipes/2014/09/18/IoT-Security-System.html#what-is-this-code-doing  

* "The first line requires the Zetta package. This contains all the functionality needed to wire up an IoT app."
* let's work on language that avoids confusing wiring up with actually wiring up. also maybe a link to guide or ref on what zetta package is.

* instead of writing "the fourth line..." how about "the use() function on line 4  function..."
  * and if we do refer to line numbers can we include them in the rendering.
  * let's pick a code plug-in that includes line numbers.

### [Running the Server Node](http://www.zettajs.org/recipes/2014/09/18/IoT-Security-System.html#running-the-server-node)

* "Zetta will log out this message when it successfully connects to the piezo buzzer:"
  * this could be inline as text so it's more readable along with the screenshot.
  * also should call out that it won't be identical. the ID is unique. but that is will include [scout] Device (buzzer)

* this image seems really small inline http://www.zettajs.org/images/recipes/security_system/zetta-piezo-terminal.png

* what happened to the step where we show the 'raw' api?
  * run the server and show the API earlier in the flow.

* let's explore naming conventions for states and transitions in the actual code.
   * on and off don't really capture what's happening. it's more like beep.
   * and beep...is it really pulse?

* Brian still thinks that we have too many words per line by default.

* Be careful with the word 'this'
  * just do a search on 'this' and see how it reads.

* sometimes text references code above sometimes below.

# Turn these into guides

* we'll need to decide on a philosophy for how much explanatory stuff should go in recipes versus guides.
  * my pref would be very, very thin recipes with links to fatter guides.
  * for example the BeagleBone pin bank
  * the explanation of zetta drivers
