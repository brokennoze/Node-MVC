var colors = require('scheme');

// TODO : support different databases as required by switching out this variable

var sql = require('sql-mysql');

//TODO : support different languages by switching out this file..

var strings = require('uk-strings')
module.exports = {
		database :
			{
				host : 'localhost',
				port : 3306,
				user : 'root',
				password : 'Callv1s10n',
				database : 'accrconfig',
				tablePrefix : "tblaccx"
			},
		Scheme : colors,
		SQL : sql,
		Strings : strings,
		http :
		{
			port : 3000
		},
		cisco : {
			username : "Administrator@CISCOLAB.com", // Case Sensitive
			password : "Callv1s10n",								// Case Sensitive
			host : "192.168.2.122",
			port : "80"
		}



}
