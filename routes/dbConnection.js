var mysql = require("mysql");
var db;

exports.db=function(err){
    if (!db) {
        db = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "",
            database:"sen_sana"
          });

        db.connect(function(err){
            if(!err) {
				console.log('connection success');
            } else {
				console.log(err);
            }
        });
    }
    return db;
}