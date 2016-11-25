var mysql = require('./dbConnection.js');
var async = require('async');

exports.addQuestionnaire=function(req,res){
    var copy = new Date();
    var date=copy.toLocaleDateString().split("/");
    var concatDate=date[2]+"-"+date[0]+"-"+date[1];
    var db=mysql.db();
    console.log(req.body);
    var ids=[];
    var questionQuery="Insert into manualquestions(question,pid,date) values"
    var optionQuery="Insert into options(opt,qid) values"
    async.forEach(req.body, function (item, callback){ 
        var question=item.question;
        var pid=1;
        var query="Insert into manualquestions(question,pid,date) values('"+question+"',"+pid+",'"+concatDate+"')";
        var lastId=0;
        console.log(query);
        db.query(query,function(err,rows){
            lastId=rows.insertId;
            async.forEach(item.options, function (optionLoop, callback1){ 
               query="Insert into options(opt,qid) values('"+optionLoop.value+"',"+lastId+")";
                   db.query(query,function(err,rows){
               });
               callback1();
            },function(err) {
            });
        });
        callback(); // tell async that the iterator has completed

        }, function(err) {


    });  
};
exports.addOptions=function(req,res){
    var db=mysql.db();
    for(var i=1;i<=req.body.length;i++)
    {
        var question=req.body[i-1].question;
        var pid=1;
        var query="select qid from manualquestions where question='"+question+"'";
        var lastId=0;
        db.query(query,function(err,rows){
            lastId=rows[0].qid;
            //console.log(lastId);
        });        
    }    
};
exports.getCountOfPendingPatients=function(req,res){
    var query="Select count(*) as patientCount from patients where pending=1";
    var id=req.session.did;
    var type=req.session.type;
    var db=mysql.db();
    if(type=="doc")
    {
        query+=" and doctorId="+id;
    }
    else
    {
        query+=" and nurseId="+id;
    }
    console.log(query);
    db.query(query,function(err,rows){
        rows[0].user=req.session.userName;
        res.send(JSON.stringify(rows));     
    });    
   // res.send(JSON.stringify({"login":"he"}));     
};