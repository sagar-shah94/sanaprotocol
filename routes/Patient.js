var mysql = require('./dbConnection.js');
exports.fetchDetails=function(req,res){
    var user=req.query.pid;
	var query="Select * from patients where pid="+user +" and nurseId="+req.session.did;
    console.log(query);
    var db=mysql.db();

    db.query(query,function(err,rows){
        if(rows==null)
        {
            res.send(JSON.stringify({"msg":"fail"}));
        }
        else
        {
            var json=[];
            json.push({"name":"Name","value":rows[0].pname});
            json.push({"name":"Age","value":rows[0].age});
            json.push({"name":"Visiting Date","value":rows[0].date});
            json.push({"name":"Sex","value":rows[0].sex});
            json.push({"name":"Phone","value":rows[0].phone});
            res.send(JSON.stringify({"msg":"success",data:json}));
        }

	});

};
