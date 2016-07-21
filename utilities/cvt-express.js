var logger = require('cvt-logger').init();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var session = require('express-session');
var uuid = require('uuid');
// Express is the HTTP server of choice for nearly all Node projects
var express = require('express');
var path = require('path');
var appPath = path.dirname(require.main.filename);

module.exports = function(){

			var app = express();



			app.use(bodyParser.json()); // for parsing application/json
			app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


			// My template engine of choice, easily to embed in standard html
			var handlebars = require('handlebars');


			// SASS is a pre-compiler that allows variables and functions to be created in css. the moddleware ensures that a change to the sass / scss files update the css files which are then read by the browser
			//Setup auto sass ( CSS framework ) The Middleware monitors changes in the src path and then compiles the files as required.
			//really this should only need to be used during production as css should be fully compiled before going to site.
			process.argv.forEach(function (val, index, array) {
				if(val == "lessbuild"|| val=='-lessbuild')
				 {
				  logger.info('starting with lessdebug ON');
					process.lessbuild = true;
				  logger.level = 'debug';
				 }
				 if(val == "scssbuild"|| val=='-scssbuild')
					{
					console.log('starting with scssdebug ON');
					process.scssbuild = true;
					}
				});

		 if (process.lessbuild){
		 	var less = require('cvt-less-integration').init(app);
		}
		 if (process.scssbuild){
			 	var sass = require('cvt-sass-integration').init(app);
		 }
			//A wrapper that allows me to extend the handlebars engine for rendering of partials from within a main view.
			// the HBE is effectively a standard handlebar egine with some additional functioanlity (renderPartial for instance )
			// bit of a hack, but otherwise we'd need to pass this into every view!

			var HBE = require('cvt-handlebar-extensions').init(app);
			var logger = require('cvt-logger').init();
			logger.info('test');





			app.use(session({
				genid: function(req) {
					return uuid.v1(); // use UUIDs for session IDs
				},
				secret: 'Gth39hjtYHDri4671h3rpoOk',
				cookie:{},
				saveUninitialized: false,
				resave:false
			})
			);

			// Logs the request every time. just an example for now.
			app.use(function (req,res,next){
				//logger.info(req);
				next();
			});

			//Setup the static file locations
			app.use(express.static(path.join( appPath,'public')));
			app.use(bodyParser.json()); // for parsing application/json
			app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


			return app;
		}
