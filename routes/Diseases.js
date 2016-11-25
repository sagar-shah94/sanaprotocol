var mysql = require('./dbConnection.js');
exports.getDiseases=function(req,res){
    var user=req.query.pid;
	var query="Select * from diseases where pid="+user;
    var db=mysql.db();
    console.log(query);
    db.query(query,function(err,rows){
        if(!err)
        {
            var json=[];
            for(var a=0;a<rows.length;a++)
            {
                json.push({"name":rows[a].name,"prob":rows[a].prob});
            }
            res.send(JSON.stringify({"data":json}));
        }
        else
        {

            res.send(JSON.stringify({"msg":"error"}));
        }
	});
};
