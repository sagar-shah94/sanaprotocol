var mysql = require('./dbConnection.js');
exports.getPatients=function(req,res){
    var query="Select pid,pname,age,date,sex,phone from patients where pending=";
    if(req.session.type=="nurse")
        query+="0 and nurseId=";
    else
        query+="0 and doctorId=";
    query+=req.session.did;
    console.log(query);
    var db=mysql.db();
    db.query(query,function(err,rows){
        console.log(rows);
    	res.send(JSON.stringify(rows)); 	
	});
	
};
exports.registerNurse=function(req,res){
    console.log("nurse");
    var name=req.body.name;
    var dob=req.body.dob;
    var phone=req.body.phone;
    var username=req.body.username;
    var password=req.body.password;
    var location=req.body.location;
    var query="Insert into nurse(nname,location,dob,phone_no,username,password) values('"+name+"','"+location+"','"+dob+"','"+phone+"','"+username+"','"+password+"')";
    console.log(query);
    var db=mysql.db();    
    var db=mysql.db();
    db.query(query,function(err,rows){
        if(!err)
        {
            res.send(JSON.stringify({"insert":"success"}));
        }
    });    
}
exports.addPatient=function(req,res,next){

    var name=req.body.name;

    var phone=req.body.phone;
    var id=req.session.did;
    console.log(id);
    var age=req.body.age;
    var sex='F';
    var copy = new Date();
    var cd=copy.toLocaleDateString().split("/");
    var date=cd[2]+"-"+cd[0]+"-"+cd[1];
    if(req.body.sex=="male")
        sex='M';
    var query="Insert into patients(pname,phone,age,nurseId,doctorId,date,sex,pending) values('"+name+"','"+phone+"',"+age+","+id+",0,'"+date+"','"+sex+"',0)";
    console.log(query);
    var db=mysql.db();
    db.query(query,function(err,rows){
        req.body.insertedId=rows.insertId;
        for(var a=1;a<=req.body.evidence.length;a++)
        {
            query="Insert into questions_asked(question,answer,pid) values('"+req.body.evidence[a-1].id+"','"+req.body.evidence[a-1].choice_id+"',"+rows.insertId+")";
            console.log(query);
            db.query(query,function(err,rows){
            });
        }
        for(var a=1;a<=req.body.diseases.length;a++)
        {
            query="Insert into diseases(name,prob,pid,date) values('"+req.body.diseases[a-1].name+"','"+req.body.diseases[a-1].prob+"',"+rows.insertId+",'"+date+"')";
            console.log(query);
                db.query(query,function(err,rows){
            });
        }        
        console.log(req.body.insertedId);
        res.send(JSON.stringify(rows));     
    });
    next();
};
exports.getQuestions=function(req,res){
    var id=req.query.id;
    var query="Select * from patients questions_asked pid="+id;
     var db=mysql.db();
     db.query(query,function(err,rows){
        res.send(JSON.stringify(rows));  
     });
}
exports.addQuestionsAsked=function(req,res){
    console.log("helloo");
    console.log(req.body);
}
exports.getSpecialisation=function(req,res){
    var query="Select * from specialised_in";
     var db=mysql.db();
     db.query(query,function(err,rows){
        //console.log(rows);
        res.send(JSON.stringify(rows));  
     });
};
exports.getParticularPatients=function(req,res){
    console.log(req.query.id);
    var id=req.query.id;
    var query="Select * from patients where pid="+id;
     var db=mysql.db();
     db.query(query,function(err,rows){
     	res.send(JSON.stringify(rows[0])); 	
	 });
};
exports.requestDoctor=function(req,res){
    console.log(req.body);
    var specialised_id=req.body.specialised_in;
    var name=req.body.name;
    var phone=req.body.phone;
    var id=req.session.did;
    var age=req.body.age;
    var sex='F';
    var copy = new Date();
    var cd=copy.toLocaleDateString().split("/");
    var date=cd[2]+"-"+cd[0]+"-"+cd[1];
    var question=req.body.evidence[0].id;
    var choice=req.body.evidence[0].choice_id;                 
    if(req.body.sex=="male")
        sex='M';    
    var query="Select did from doctors where specialised_in="+specialised_id;
    var db=mysql.db();
    db.query(query,function(err,rows){
      console.log("hhhhh");
       console.log(rows.length);
        var did=rows[parseInt(getRandomArbitrary(1,rows.length))-1].did;
        console.log(did);
            query="Insert into patients(pname,phone,age,nurseId,doctorId,date,sex,pending) values('"+name+"','"+phone+"',"+age+","+id+","+did+",'"+date+"','"+sex+"',1)";
            console.log(query);
            db.query(query,function(err,temp){
//                console.log(temp.insertId);
                var insertid=temp.insertId;
                query="Insert into questions_asked(question,answer,pid) values('"+question+"','"+choice+"',"+insertid+")";   
                db.query(query,function(err,questionRows){
                });
             });
        res.send(JSON.stringify({"insert":"success"}));  
    });
     function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }  
};
