var db 		 = require('cvt-mysql-connection');
var settings = require('settings');
var sql		 = require('sql-mysql');
var logger	 = require('cvt-logger').init();
var mvc 	 = require('cvt-mvc');



var AgentModel =  function(){
	mvc.inheritModelFrom('baseModel',this,AgentModel);
	this.ModelSQL = sql.Model.Agent;
};

module.exports = AgentModel;