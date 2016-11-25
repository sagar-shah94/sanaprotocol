var mysql = require('./dbConnection.js');
exports.fetchDetails=function(req,res){
    var user=req.query.user;
	var username=req.query.user;
	var query="Select * from ";
	if(req.session.type=="doc"){
    	query+="Doctors ";
	}
    else{
    	query+="Nurse ";	
    }

    query+="where username='"+user+"'";
    var db=mysql.db();
    console.log(query);

    db.query(query,function(err,rows){
        if(req.session.type=="doc")
        {
            var json={"data":[
                {"id":"Name","value":rows[0].dname},
                {"id":"Qualification","value":rows[0].qualification},
                {"id":"Year of Experience","value":rows[0].yearOfExperience},
                {"id":"Location","value":rows[0].location},
                {"id":"Date Of Birth","value":rows[0].dob},
                {"id":"Phone No","value":rows[0].phone_no},
                {"id":"Address","value":rows[0].address},
                {"id":"Username","value":rows[0].username},
                {"id":"Specialised In","value":rows[0].specialised_in}
            ]};            
            res.send(JSON.stringify(json));
        }
        else
        {
            var json={"data":[
                {"id":"Name","value":rows[0].nname},
                {"id":"Phone No","value":rows[0].phone_no},
                {"id":"Location","value":rows[0].location},
                {"id":"Date Of Birth","value":rows[0].dob},
                {"id":"Email","value":rows[0].username}
            ]};            
            res.send(JSON.stringify(json));
        }

	});

};
