var exp = require("express");
var mysql = require("mysql2");

var app = exp();


var con = mysql.createConnection({

	host:"localhost",
	user : "root",
	password :"root",
	database : "test"

});

con.connect(function(err){
	if(!err)
		console.log("Connection established");
	else
		console.log("Connection failed");

});

app.listen(9000,function(){
	console.log("server running at 9000");
});



 app.get('/',function(req,res){
	res.sendFile(__dirname+"/index.html");
});

app.get('/emps',function(req,res){
	con.query("select * from emp",function(err,result){
		if(!err)
		{
			res.write("<table border ='1'>");
			result.forEach(function(v){
				
				res.write("<tr>");
				res.write("<td>"+v.EMPNO+"</td>");
				res.write("<td>"+v.ENAME+"</td>");
				res.write("</tr>");

			});
			res.write("</table>");
			res.end();
		}	
	});
});