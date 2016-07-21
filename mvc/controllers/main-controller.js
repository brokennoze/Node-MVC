var logger = require('cvt-logger').init();
var HBE = require('cvt-handlebar-extensions');
var express = require('express');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var router = express.Router();
var mvc = require('cvt-mvc').init();

var extend = require('extend');
var settings = require('settings');

router.controllerName = "Main";
module.exports = router;


//router interceptor, check login status

router.use('/',function(req,res,next){




	/*if(!req.session.username && (!process.debug))
		{
			res.redirect('/Login');
			return;
		}*/
//	next();
res.render('index',extend({mainPage:req.params.page,settings:settings},req.session));
});

//router get a page, sending in the actual content we want so the
// view renders it, and the session object containing the users details.

router.get('/:page',function(req,res){

	res.render('index',extend({mainPage:req.params.page,settings:settings},req.session));
});
// Default route
router.get('/',function(req,res){
	res.redirect('Main/Dashboard');
});
