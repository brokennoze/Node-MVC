var Client = require('node-rest-client').Client;
var settings = require("settings");
var path = "http://"+settings.cisco.host+":"+settings.cisco.port;
var agentpath = "/unifiedconfig/config/agent/"
var client = function(callback){
  console.log(settings.cisco.username + ":" + settings.cisco.password);
  var options_auth = { user: settings.cisco.username, password: settings.cisco.password };
  var client = new Client(options_auth);
  var args = {headers: { "Content-Type": "application/xml" }};
  // direct way
  return client;
}

var Model =function(){
    return{
    Test : function(){ return "Mouse!";},
    AllAgents : function(callback){
      var args = {headers: { "Content-Type": "application/xml" }};


      client().get(path + agentpath +"?list",args, function (data, response) {
          // parsed response body as js object


          if(callback){
           callback(data.results.agents);
         }
      });
    },
     agentbyid : function(id,callback){
       console.log(path);
       
      client().get(path + agentpath +id, function (data, response) {
          // parsed response body as js object
        console.log(JSON.stringify(data));

          if(callback){
           callback(data);
         }
      });
    }

  }
}


module.exports = Model;
/*Model.protoTest = function(){
  return "monkey";
}*/





module.exports = Model;
