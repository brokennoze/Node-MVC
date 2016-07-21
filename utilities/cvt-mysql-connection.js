/*
* Author: Simon Kraushaar
* Description : A simple wrapper around the mysql connection. Could be used as a template for an abstract interface for all database and data access. for instance MSSQL drivers
* or a MongoDB connection
*/
var mysql      = require('mysql');


var exporter = {
		init : function(host,port,username,password,database)
		{
			if (host instanceof Object)
				{
				this.connection = mysql.createConnection(host);
				}
			else
				{
				this.connection = mysql.createConnection({
					host     : host,
					user     : username,
					password : password,
					database : database,
					port 	   : port
				});
				}
		},
		connect : function()
		{
			this.connection.connect();
		},
		query : function(sql,callback){
	
			this.connection.query(sql, function(err, rows, fields) {
				  if (err) throw err;
				 callback(rows,fields)
				  
				});
		},
		close : function()
		{
			this.connection.end();
		},
		test : function()
		{
			this.connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
				  if (err) throw err;
				 
				  console.log('The solution is: ', rows[0].solution);
				});
		}
}


module.exports = exporter;