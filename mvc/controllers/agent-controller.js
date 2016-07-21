var express = require('express');
var router = express.Router();
var mvc = require('cvt-mvc').init();

var extend = require('extend');
var settings = require('settings');

router.controllerName = "Agent";
module.exports = router;

router.get('/:id',function(req,res){

  var model = mvc.loadModel("ciscoRest-model");
  var mres = res;
  model.agentbyid(req.params.id,function(data){
    console.log(data);
    var view = mvc.loadView("agent",data.agent);

    mres.send(view);

  });
});
