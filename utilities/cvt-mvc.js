var path = require('path');
var glob = require('glob');
var logger=  require('cvt-logger').init();
var mvc;
var HBE = require('cvt-handlebar-extensions');
var util = require('util');
const fs = require('fs');
module.exports = {
		 models : []
		,controllers : []
		,init : function(app,defaultController){
			if (mvc) {
				return mvc;
			}
			mvc = this;

			var appDir = path.dirname(require.main.filename);

			this.controllerPath = path.join(appDir,"/mvc/controllers/");
			this.modelPath = path.join(appDir,"/mvc/models/");
			this.viewPathPath = path.join(appDir,"/mvc/views/");

			var controllers = glob.sync(this.controllerPath+"*.js");

			controllers.forEach(function(file){

				var controller = require(file);

				// controlelrName is a parameter I've personally added to allow the controller to describe itself

				if (controller.controllerName){
					logger.debug('Loading Controller into Repository {0}:     <{1}>'.format(controller.controllerName,file));
					app.use('/'+controller.controllerName,controller);
					mvc.controllers.push[{name:controller.controllerName,controller:controller}];
				}
				else
					{
						delete require.cache[controller];
					}

			});
			var modelList = glob.sync(this.modelPath+"*.js");

			modelList.forEach(function(file){

				var model = require(file);

				// controlelrName is a parameter I've personally added to allow the controller to describe itself
				var name =path.basename(file).replace(/\.[^/.]+$/, "");
					logger.debug('Loading Model into Repository {0}:     <{1}>'.format(name,file));

					mvc.models.push({name:name,model:model});
					logger.debug('Loaded Model into Repository {0}:     <{1}> {2} Models loaded'.format(name,file,mvc.models.length));

			});

			if (defaultController){
				// Default handler for testing

				app.get('/',function(req,res){
					res.redirect(defaultController);
				});
			}
			return mvc;

		}
		, loadView : function(name,context)
		{
			// We already have the views ready to go in the HandleBars Extension object, no need to be clever!
			try
			{
				var res = HBE.renderPartial(name.toLowerCase(),context);
				return res;
			} catch(e)
			{
				logger.error(e.message);
				return '';
			}


		}
		, loadController : function(name)
		{
			var self = this;
			var result = undefined;
			self.controllers.forEach(function(name){
				if (this.name == name) {
					result = this;
					return;
				}

			});
			return result;

		}
		,inheritModelFrom : function(name,model,proto)
		{
			var BaseModel = mvc.loadModelPrototype(name);
			console.log(BaseModel);
			BaseModel.call(model);
			util.inherits(proto,BaseModel);

		}
		,loadModelPrototype : function(name)
		{
			try{
				var self = this;
				logger.debug('Model <{0}> Requested {1}'.format(name,mvc.models.length));
				result = undefined;
				for(var i = 0; i < mvc.models.length;i++)
					{
					 model =mvc.models[i];
					 if (model.name === name) {
							result = model;
							console.log("found model ");
							break;;
						}
					}

				if (!result){throw Error('Model not found!');}
				if (typeof result.model === "function"){

					return result.model;
				}
				else
				{
					console.log('returning model object');
					return result.model;
				}





			} catch (e)
			{
				logger.error(e.message);
				throw new Error("Can't load model '"+name+"' :" + e.message + e.stack);
			}
		}
		, loadModel : function(name)
		{
			try{
				var self = this;
				logger.debug('Model <{0}> Requested {1}'.format(name,mvc.models.length));
				result = undefined;
				for(var i = 0; i < mvc.models.length;i++)
					{
					 model =mvc.models[i];
					 if (model.name === name) {
							result = model;
							console.log("found model ");
							break;;
						}
					}

				if (!result){throw Error('Model not found!');}
				if (typeof result.model === "function"){

					return new result.model();
				}
				else
				{
					console.log('returning model object');
					return result.model;
				}





			} catch (e)
			{
				logger.error(e.message);
				throw new Error("Can't load model '"+name+"' :" + e.message + e.stack);
			}
		}

		, modelPath : ''
		, controllerPath : ''
		,viewPath : ''
}
