var mysql = require('./dbConnection.js');
var nodemailer = require('nodemailer');
var session;
exports.authenticate=function(req,res){
	console.log(req.body+"  "+req.body.username);
	    var unm=req.body.username;
	    var password=req.body.password;
	 	session=req.session;
	    var query="select count(*) as countOfRows,did from doctors where username='"+unm+"' and password='"+password+"'";
	    var db=mysql.db();
		    
	    db.query(query,function(err,rows){
			if(err)
			{
				console.log("error");
				res.send(JSON.stringify({ "login": "conIssue"}));	
			}
			else if(rows!=null && rows[0].countOfRows>0)
			{
				console.log("success");
				session.userName=unm;
				session.type="doc";
				session.did=(rows[0].did);
				console.log(session.did);
				res.send(JSON.stringify({ "login": "success","type":"doc"}));	
				return;
			}
			else
			{
			    query="select count(*) as countOfRows,nid from nurse where username='"+unm+"' and password='"+password+"'";
			    console.log(query);
			    db.query(query,function(e,r){
					if(e)
					{
						console.log("error");
						res.send(JSON.stringify({ "login": "conIssue"}));	
					}
					else if(r!=null && r[0].countOfRows>0)
					{
						console.log("success");
						console.log(r[0].nid);
						session.userName=unm;
						session.type="nurse";
						session.did=(r[0].nid);
						res.send(JSON.stringify({ "login": "success","type":"nurse"}));	
					}
					else
					{
						console.log("fail");
						res.send(JSON.stringify({ "login": "fail"}));
					}			    	
				});
			}			    	
	});	    
};
exports.checkRecord=function(req,res){
		var unm=req.query.username;
		var random=req.query.random;
	    var query="select count(*) as countRequest from forgetRequest where randomString='"+random+"' and email='"+unm+"'";
	    var db=mysql.db();
		    
	    db.query(query,function(err,rows){
			if(err)
			{
				console.log("error");
				res.send(JSON.stringify({ "record": "conIssue"}));	
			}
			else{
				if(rows[0].countRequest>0)
				{
					res.send(JSON.stringify({ "record": "success"}));		
				}
				else{
					res.send(JSON.stringify({ "record": "fail"}));			
				}
				
			}	    	
	});	
}
exports.setNewPass=function(req,res){
  	    var query="update doctors set password='"+req.query.newPass+"' where username='"+req.query.username+"'";
	    var db=mysql.db();
		console.log(query);
		var status ="fail";
	    db.query(query,function(err,rows){
			if(err)
			{
				console.log("error");
				//res.send(JSON.stringify({ "update": "conIssue"}));	
			}
			else if(rows!=null)
			{
				status="success";
			}		    			
		});		
		query="update nurse set password='"+req.query.newPass+"' where username='"+req.query.username+"'";
	    //query="select count(*) as countOfRows,nid from nurse where username='"+unm+"' and password='"+password+"'";
	    console.log(query);
	    db.query(query,function(e,r){
			if(e)
			{
				console.log("error");
				//res.send(JSON.stringify({ "update": "conIssue"}));	
			}
			else if(r!=null)
			{
				status="success";
			}		    	
		});					
		res.send(JSON.stringify({ "update": "success"}));	
}
exports.forgetRequest=function(req,res){
		var transporter = nodemailer.createTransport('smtps://sensanaprotocolbuilder@gmail.com:senproject@smtp.gmail.com');
		 var unm=req.body.email;
		 var randomString=makeid();
		// setup e-mail data with unicode symbols 
		var mailOptions = {
		    from: '"Sana Protocol Builder" <sms2sagar94@gmail.com>', // sender address 
		    to: req.body.email, // list of receivers 
		    subject: 'Change password request', // Subject line 
		    text: 'Hope You are having a great day', // plaintext body 
		    html: 'http://localhost:8080/changePassword?random='+randomString+"&email="+req.body.email // html body 
		};
		 
		// send mail with defined transport object 
		function makeid()
		{
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < 25; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}
	    var query="select count(*) as countOfRows,did from doctors where username='"+unm+"'";
	    var db=mysql.db();
		    
	    db.query(query,function(err,rows){
			if(err)
			{
				console.log("error");
				res.send(JSON.stringify({ "login": "conIssue"}));	
			}
			else if(rows!=null && rows[0].countOfRows>0)
			{
				//query="select count(*) as countOfRows,did from doctors where username='"+unm+"'";
				console.log("doctor");
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				    	res.send(JSON.stringify({"forget":"some error occures"}));
				        return console.log(error);
				    }
				    db.query("insert into forgetRequest values('"+randomString+"','"+req.body.email+"')",function(err,rows){});
				    res.send(JSON.stringify({"forget":"successfully sent"}));
				});	
				return;
			}
			else
			{
			    query="select count(*) as countOfRows from nurse where username='"+unm+"'";
			    console.log(query);
			    db.query(query,function(e,r){
					if(e)
					{
						console.log("error");
						res.send(JSON.stringify({ "login": "conIssue"}));	
					}
					else if(r!=null && r[0].countOfRows>0)
					{
						console.log("nurse");
						transporter.sendMail(mailOptions, function(error, info){
						    if(error){
						    	res.send(JSON.stringify({"forget":"some error occures"}));
						        return console.log(error);
						    }
						    db.query("insert into forgetRequest values('"+randomString+"','"+req.body.email+"')",function(err,rows){});
						    res.send(JSON.stringify({"forget":"successfully sent"}));
						});	

					}
					else
					{
						console.log("fail");
						res.send(JSON.stringify({ "forget": "email not found"}));
					}			    	
				});
			}			    	
	});	    
};