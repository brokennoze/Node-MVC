/*
 * This module extends the express-handlebars to allow us to add specific MVC patterns and
 * add partials ( via a renderPartial function ) from within the handlebar view without extra code for each
 * view.
 *
 * The SKHB object becomes a singleton and can then be used whereever
 */

var path = require('path');
require('app-module-path').addPath(__dirname + '/mvc');
var logger = require('cvt-logger').init();
var appDir = path.dirname(require.main.filename);

var viewPath = path.join(appDir,"/mvc/views/");
var exphbs = require('express-handlebars');

var HBS_express  = exphbs.create({
	  extname : '.html'
			, layoutsDir : viewPath+'/layouts'
			, partialsDir : [viewPath,viewPath+'/partials',viewPath+'/partials/pages',viewPath+'/partials/components']

			});

var SKHB;

	SKHB = HBS_express.handlebars;
	SKHB.engine = HBS_express.engine;
	SKHB.viewPath = viewPath;
HBS_express.getPartials()
.then(function(partials){
	HBS_express.partials = partials;
  SKHB.partials = partials;

});

	SKHB.renderPartial = function(name,options){
		if (!SKHB.partials[name])
			{
				throw new Error('partial {0} does not exists'+name);
			}
		if(options.hash){
		var result =  SKHB.partials[name](options.hash);
		}
		else
			{
				var result =  SKHB.partials[name](options)
			}
		return result;

}
	SKHB.init = function(app){
		app.engine('.html', this.engine);

		app.set('view engine', '.html');

		app.set('views',this.viewPath);
		return SKHB;
	}

	SKHB.registerHelper('loadView',function(viewName,context){
		logger.debug("loading view \"{0}\"".format(viewName));
		return new SKHB.SafeString(SKHB.renderPartial(viewName,context));

	});
	SKHB.registerHelper('json',function(context){
		return JSON.stringify(context);
	});


module.exports = SKHB;
