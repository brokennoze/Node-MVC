/*
* Author : Simon Kraushaar Simon.Kraushaar@callvision-tech.com
*
* Description : This is a simple ( ish ) MVC stack I've created for nodeJS. It uses the ExpressJS ( pretty much the standard ) HTTP server
* Combined with handlebars, the template engine ( this allows injection of data into static html files, see the mvc/ views directory and the example controller in the mvc/controllers dir
* It also makes use of the sass css engine, which is a language to allow use of vars within css. The system monitors the sass directory for any changes
* And recompiles to css for use with the html pages.
* I';ve also included a VERY simple wrapper around the Mysql connection. This connection could be just as the construct for any models ( it exists in the mvc/models directory
* And would probably be initialised there rather than within this unit. as shown below.
* TODO : Build this into a fully wrapped module
*		 Support clustering
*		 Support the MongoDB - we will likely look to use this for configuration data, the CV2 Distinction module already uses JSON files to construct it's dialplans.
*
*/


var path = require('path');

//The following code allows us to add additional "paths" to the application search path. This way we don't have to reference
//each unit via its literal path, (for instance ("/mvc/views") ) but can in fact shortcut these bases on tha added paths
//It can be run on any module of code,
var pathAdder = require('app-module-path');
var appDir = path.dirname(require.main.filename);
pathAdder.addPath(path.join(appDir,'/utilities'));
pathAdder.addPath(path.join(appDir,'/resources'));

// initiates all middleware and modules needed for the cvt MVC platform.
require("cvt-extensions")();
var logger = require('cvt-logger').init();

// Shortcut the console into the logger. sweet
console.debug = logger.debug;
console.log = logger.info;
console.warn = logger.warn;

process.debug = false;
process.argv.forEach(function (val, index, array) {
	process.debug= false;
	if(val == "debug"|| val=='-debug')
		 {
		  console.log('starting with debug ON');
		  process.debug= true;
		  logger.level = 'debug';
		}});

	// Initialise the ExpressJS wrapper for the application

	var app = require('cvt-express')();


	// Initialise the CVT MVC platform for the application - set the default controller to MAIN

	var mvc = require('cvt-mvc').init(app,"Main");

	// Listen on the correct port as configured in settings
	app.listen(require('settings').http.port);
