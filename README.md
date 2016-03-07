# A simple Node.js + express server
Simple server who lets you to test push notifications in Android with [Google Cloud Messaging (GCM)](https://developers.google.com/cloud-messaging/ "Google Cloud Messaging").  
It will only send an example notification throw GCM using the stored application key. This notification will be sent to the device whose key is stored too.  
Both keys are registered in the `serverKeys.json` file. 

## Setting up the server
### Install modules
First of all, you have to install the node modules which are used in this server. In order to do that, run the following commands from your project folder:  
`` npm install express``  
`` npm install requestify  ``  

These commands will install the modules only in your project. 

### Server keys
To set up your keys file, you must
1. Change the name to the `serverKeys.json.changeme` file. Rename it to `serverKeys.json`.
2. Change the messages who appears instead of the keys, writing your own keys.  
>:warning:Remember to add this file to your `.gitignore` to keep your keys secret.

## Launching the server
Run the server from your project folder using:  
``node server.js``  

:tada:**Congratulations!** Now you´re able to send notifications doing a GET petition to your ip, at the *8081* port, or just typing ``localhost:8081/`` in your browser if you are at the same computer.
