var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var logger = require('cvt-logger').init();
var appPath = path.dirname(require.main.filename);
module.exports = {
		init : function(app){
			app.use(sassMiddleware({
				  src: path.join("resources","styles","scss"), 	//The location of the scss or sass files
				  dest: path.join("public/css"),						// this will be the static folder ( in this case public, see below ) + path of the file in the href, i.e. css/style.css
				  root : appPath,												// so ./public/css/style.css
				  debug: process.scssbuild,
				  indentedSyntax: false, // use only scss , sass used indenting rather than braces
					force:process.scssbuild,
				  outputStyle: 'compressed'
					,
				  prefix : "/css/"								// looking for this and prevents /css/css when looking for the file
				}));

					logger.info('scss middleware started  on : '+path.join(appPath, 'styles','scss'));

			return this;

		}
}
