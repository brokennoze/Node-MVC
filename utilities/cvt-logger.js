var path = require('path');
var mkdirp = require('mkdirp');

var appDir =path.join(path.dirname(require.main.filename),'logs');
mkdirp(appDir, function(err) { });

var winston = require('winston'); 
var logger = undefined;
module.exports = {
		
		init : function(){
			if (logger)
				{
					return logger;				
				}
	logger = new (winston.Logger)({
		  
		 transports: [
		    new (winston.transports.Console)({
		      timestamp: function() {
		    	  
		    	  date = new Date();
		        return date.getFullYear().toString() 
		        	+ '/'
		        	+  ('0'+(date.getMonth()+1).toString()).slice(-2)
		        	+'/'
		        	+ ('0'+date.getDay().toString()).slice(-2)
		        	+ ' '
		        	+ ('0'+date.getHours().toString()).slice(-2)
		        	+ ':'
		        	+ ('0'+date.getMinutes().toString()).slice(-2)
		        	+ ':'
		        	+ ('0'+date.getSeconds().toString()).slice(-2)
		        	+ ':'
		        	+ ('000'+date.getMilliseconds().toString()).slice(-3);
		      },
		      formatter: function(options) {
		        // Return string will be passed to logger. 
		        return options.timestamp() +', '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
		          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
		      }
		    }),
		    new (winston.transports.File)({
		    	filename : path.join(appDir,'logfile.log'),
		        timestamp: function() {
		      	  
		      	  date = new Date();
		          return date.getFullYear().toString() 
		          	+ '/'
		          	+  ('0'+(date.getMonth()+1).toString()).slice(-2)
		          	+'/'
		          	+ ('0'+date.getDay().toString()).slice(-2)
		          	+ ' '
		          	+ ('0'+date.getHours().toString()).slice(-2)
		          	+ ':'
		          	+ ('0'+date.getMinutes().toString()).slice(-2)
		          	+ ':'
		          	+ ('0'+date.getSeconds().toString()).slice(-2)
		          	+ ':'
		          	+ ('000'+date.getMilliseconds().toString()).slice(-3);
		        },
		        formatter: function(options) {
		          // Return string will be passed to logger. 
		          return options.timestamp() +', '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
		            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
		        }
		      }),
		  ]
		});
return logger;	
}
}



