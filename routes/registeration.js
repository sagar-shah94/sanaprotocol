var mysql = require('./dbConnection.js');
exports.registerDoctor=function(req,res){
	    var name=req.body.name;
	    var qualification=req.body.qualification;
	    var yearOfExperience=req.body.yearOfExperience;
	    var location=req.body.location;
	    var dob=req.body.dob;
	    var phoneNo=req.body.phoneNo;
	    var specialisedIn=req.body.specialisedIn;
	    var address=req.body.address;
	    var username=req.body.username;
	    var password=req.body.password;
	    var query="Insert into doctors(dname, qualification, yearOfExperience, location, dob, specialised_in, phone_no, address,username,password) Values('"+name+"','"+qualification+"',"+yearOfExperience+",'"+location+"','"+dob+"',"+specialisedIn+",'"+phoneNo+"','"+address+"','"+username+"','"+password+"')";
	    console.log(query);
	    var db=mysql.db();
	    db.query(query,function(err,rows){
		if(err)
		{
			res.send(JSON.stringify({ "insert": "fail"}));	
		}
		else
		{
			res.send(JSON.stringify({ "insert": "success"}));	
		}			    	
	});
	
};
