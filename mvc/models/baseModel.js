var db 		 = require('cvt-mysql-connection');
var settings = require('settings');
var sql		 = require('sql-mysql');
var logger	 = require('cvt-logger').init();

function BaseModel() { /* ... */ }
BaseModel.prototype.ModelSQL = "OVERRIDE_ME"
BaseModel.prototype.fromID = function () { /* ... */ };
BaseModel.prototype.listAll = function(callback)
{
	
	logger.debug("list All");
	db.init(settings.database);			
	db.query(this.ModelSQL.ALL,function(rows,fields)
			{
			
			//TODO: create a database session entry for this user
		db.close();
		
		callback(rows);
				
			});
	
}

BaseModel.prototype.update = function(object,callback)
{
	
	db.init(settings.database);	
	var q = settings.SQL.General.Update_Item.format(
			object.itemType,
			object.name,
			object.description,
			object.parentId,
			object.id);
	logger.debug(q);
	db.query(q,function(rows,fields){
		callback("success");
		
	});
	
}
BaseModel.prototype.get = function(id,callback)
{
	logger.debug("item");
	db.init(settings.database);			
	db.query(settings.SQL.General.Get_Item.format(id),function(rows,fields)
			{
				if (rows.length < 1){
					db.close();
					throw Error("Can't find item with id <{0}>".format(id));
				}
				else {
					var table = settings.database.tablePrefix + rows[0].itemType;
					logger.debug('Found item <{0}> <{1}>'.format(rows[0].id,table));
					db.query(settings.SQL.General.Get_FullItem.format(table,id),function(rows2,fields2){
						logger.debug(JSON.stringify(rows2));
						callback(rows2);
						db.close();
						
					});
				}
			
			//TODO: create a database session entry for this user
				
			});
}
module.exports = BaseModel;