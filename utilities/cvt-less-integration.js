var lessMiddleware = require('less-middleware');
var logger = require('cvt-logger').init();
var path = require('path');
var appPath = path.dirname(require.main.filename);
module.exports = {
		init : function(express_app,express){
			express_app.use(lessMiddleware(path.join(appPath, '/public/'),
					{dest:path.join(appPath , '/public/'),
					 force: process.lessbuild,
					 prefix: '/css/',
					 once : (!process.lessbuild),
					 debug:process.lessbuild}));
			
			
			logger.info('less middleware started : '+path.join(appPath, '/public/'));
			
			return this;
		}
}