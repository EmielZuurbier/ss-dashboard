# Smartsensors dashboard
Dashboard app to visualize data from celltowers.  
This repo contains the build of the project.

## Intro
The smartsensors dashboard is a visualization tool to see the data created from Celltower data. This data contains information about the signal strength, type of signal, type of tower and location.

The platform is built on a Express server with a MongoDB database. The data is collected through Mozilla, OpenCell and user generated data. All these points of data are marked on a map.

## Features
- [x] Being able to filter datasources so it only displays the source you would like to see
- [x] The user can create an account and login to access the dashboard
- [ ] An IoT device can be connected to the dashboard through an MQTT Broker

## Data sources
* [http://opencellid.org/](http://opencellid.org/)
* [https://location.services.mozilla.com/](https://location.services.mozilla.com/)

## Technologies used
* `Express` with `node.js` for server and backend processes
* `MongoDB` for datastorage
* `Handlebars` as a templating engine to load the frontend
* `HTTPRequest` and `Socket.io` for handling data streams
* `Gulp` as a taskmanager to minify and concatenate files
* `Leaflet` for creating the map

## Minor Everything Web implementations

### Web App From Scratch
* OOP style of programming
* IFEE for keeping the code closed and scoped
* Async requests for handling data
* Custom Router for navigation
* Localstorage for saving locations
* Modular built scripts

### CSS To The Rescue
* Flexbox for element positioning and sizing
* CSS Prefixes

### Performance Matters
* Gulp as a taskmanager
* Minified CSS
* Minified Javascript

### Real-Time Web
* WebSockets for real-time data

### Web of Things
* MQTT Broker for talking to IoT devices


### Live example
[Smartsensors Dashboard](http://dashboard.smartsensors.me)
