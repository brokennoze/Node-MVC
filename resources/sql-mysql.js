module.exports = {
			SQL_USERPRIV : "SELECT * FROM tblaccxuserroles a join tblaccxuser b on b.id = userid join tblaccxroleprivileges c on c.roleId = a.roleId join tblaccxitemactions d on d.id= c.itemidwhere a.userId = '{0}'"
			,SQL_USERPRIV2 : "SELECT count(*) FROM tblaccxuserroles a join tblaccxuser b on b.id = userid join tblaccxroleprivileges c on c.roleId = a.roleId join tblaccxitemactions d on d.id= c.itemidwhere a.userId = '{0}' and "
		
		,General : {
				Get_Item :  "SELECT * FROM tblaccxcontainer where id = '{0}'"	
			, Get_FullItem : "SELECT * from  tblaccxcontainer a join {0} b on a.id = b.id where a.id = '{1}'"
			, Update_Item :  "update tblaccxcontainer a join tblaccx{0} b on  b.id = a.id set a.name= '{1}', a.description ='{2}', a.parentId ='{3}' where a.id='{4}'"
			
			}	
		,Model : {
		User : {
			LOGIN : "select * from tblaccxuser where username='{0}' and password = MD5('{1}')"
			,LOGOUT : "delete from <a session table> where userid = {0}"
			
		},	
			
		Agent :{
				ALL : "SELECT * FROM tblaccxcontainer a join tblaccxagent b on b.id = a.id"
				,RANGE : "SELECT * FROM tblaccxcontainer a join tblaccxagent b on b.id = a.id limit {0},{1}"
				,SINGLE :  "SELECT * FROM tblaccxcontainer a join tblaccxagent b on b.id = a.id where a.id = '{0}'"
						
		},
		Endpoint:{
				ALL : "SELECT a.id,a.name,a.description,b.linekey1 as 'Default key', b.ddi as 'DDI' FROM tblaccxcontainer a join tblaccxhandset b on b.id = a.id "
				,RANGE : "SELECT * FROM tblaccxcontainer a join tblaccxhandset b on b.id = a.id limit {0},{1}"
				,SINGLE :  "SELECT * FROM tblaccxcontainer a join tblaccxhandset b on b.id = a.id where a.id = '{0}'"
		}
		,Queue:{
				ALL : "SELECT a.id,a.name,a.description FROM tblaccxcontainer a join tblaccxqueue b on b.id = a.id "
				,RANGE : "SELECT * FROM tblaccxcontainer a join tblaccxqueue b on b.id = a.id limit {0},{1}"
				,SINGLE :  "SELECT * FROM tblaccxcontainer a join tblaccxqueue b on b.id = a.id where a.id = '{0}'"
		},Role:{
				ALL : "SELECT a.id,a.name,a.description FROM tblaccxcontainer a join tblaccxrole b on b.id = a.id "
				,RANGE : "SELECT * FROM tblaccxcontainer a join tblaccxrole b on b.id = a.id limit {0},{1}"
				,SINGLE :  "SELECT * FROM tblaccxcontainer a join tblaccxrole b on b.id = a.id where a.id = '{0}'"
		}
}
}