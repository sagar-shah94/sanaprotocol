var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Authentication = require('./routes/authentication');
var Profile = require('./routes/viewProfile');
var Registeration = require('./routes/registeration');
var Nurse = require('./routes/Nurse');
var Doctor = require('./routes/Doctor');
var Patient = require('./routes/Patient');
var Diseases = require('./routes/Diseases');
var expressSession = require('express-session');
var app = express();
var request = require('request');
var nodemailer = require('nodemailer');
app.use(expressSession({secret: '1234567890QWERTY',resave:false,saveUninitialized: true}));
var session;
app.use(express.static(path.join(__dirname, '/views')));
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.post("/authenticate",Authentication.authenticate);
app.get('/getSpecificPatientDetail',Patient.fetchDetails);
app.post("/saveDoctorDetails",Registeration.registerDoctor);
app.post("/saveNurseDetails",Nurse.registerNurse);
app.get('/getPatients',Nurse.getPatients);
app.get('/getProfile',Profile.fetchDetails);
app.get('/getDiseases',Diseases.getDiseases);
app.get('/nurseHome',function(req,res){
	if(req.session.userName!=null && req.session.type=="nurse")
	{
		res.sendFile(__dirname+"/views/home_nurse.html");	
	}	
	else{
		res.redirect("/login");	
	}
});
app.get("/getCountOfPendingPatients",Doctor.getCountOfPendingPatients);
app.get('/doctorHome',function(req,res){
//	console.log(req.session.userName+"---");
	if(req.session.userName!=null && req.session.type=="doc")
	{
		res.sendFile(__dirname+"/views/home_doctor.html");	
	}	
	else{
		res.redirect("/");	
	}
});
app.post("/addQuestionnaire",Doctor.addQuestionnaire);
app.post("/savePatientRecord",[Nurse.addPatient,Nurse.addQuestionsAsked]);
app.get('/getParticularPatientData',Nurse.getParticularPatients);
app.get('/logout',function(req,res){
	req.session.destroy();
	res.redirect("/");
});
app.get('/mail',function(req,res){
	if(req.session.userName==null)
	{
		res.sendFile(__dirname+"/views/mail.html");
	}	
	else{
		res.redirect("/");	
	}		
	
});
app.get('/about',function(req,res){
	if(req.session.userName==null)
	{
		res.sendFile(__dirname+"/views/about.html");
	}	
	else{
		res.redirect("/");	
	}		
	
});
app.get('/getParticularPatient',function(req,res){
	if(req.session.userName!=null)
	{
		res.sendFile(__dirname+"/views/getParticularPatientDetails.html");
	}	
	else{
		res.redirect("/");	
	}	
	
});
app.get('/editProfile',function(req,res){
	if(req.session.userName!=null)
	{
		res.sendFile(__dirname+"/views/editProfile.html");
	}	
	else{
		res.redirect("/");	
	}		
	
});
app.get('/getQuestions',Nurse.getQuestions);

app.get('/getSymptoms',function(req,res){
	request.post('http://service.com/upload', {form:{key:'value'}})
	var options = {
	  url: 'https://api.infermedica.com/v2/symptoms',
	  headers: {
	    'Accept': 'application/json',
	    'app_id' : '83d0e109',
	    'app_key' : '01788b7345e2e730a5ab4fa9e60c9863'
	  }
	};
	function callback(error, response, body) 
	{
	  if (!error && response.statusCode == 200) {
	    var info = JSON.parse(body);
	    //console.log(info);
	    res.send(info);
	  }
	}
	request(options, callback);
});

 
app.get('/sendMail',function(req,res){
	// create reusable transporter object using the default SMTP transport 
	var transporter = nodemailer.createTransport('smtps://sensanaprotocolbuilder@gmail.com:senproject@smtp.gmail.com');
	 
	// setup e-mail data with unicode symbols 
	var mailOptions = {
	    from: '"Sana Protocol Builder" <sms2sagar94@gmail.com>', // sender address 
	    to: 'sms2sagar94@gmail.com', // list of receivers 
	    subject: 'Hello ✔', // Subject line 
	    text: 'Hello world 🐴', // plaintext body 
	    html: '<b>Hello world 🐴</b>' // html body 
	};
	 
	// send mail with defined transport object 
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
});
app.get('/addSymptom',function(req,res){
	res.sendFile(__dirname+"/views/addSymptoms.html");
});
app.get('/viewProfile',function(req,res){
	res.sendFile(__dirname+"/views/viewProfile.html");
});
app.get('/registerationOptions',function(req,res){
	res.sendFile(__dirname+"/views/registerationOptions.html");
});
app.get("/getSpecialisation",Nurse.getSpecialisation);
app.post("/sendRequestToDoctor",Nurse.requestDoctor);

app.post('/forgetRequest',Authentication.forgetRequest);
app.get('/setNewPass',Authentication.setNewPass);
app.get('/checkRecord',Authentication.checkRecord);
app.get('/changePassword',function(req,res){
	res.sendFile(__dirname+"/views/changePassword.html");
});

app.get('/addQuestion',function(req,res){
	// if(req.session.userName==null){
	// 	res.redirect("/login");	
	// }
	// else
	// {
		res.sendFile(__dirname+"/views/addQuestions.html");
	//}
	
});
app.get('/getPatientsDetails',function(req,res){
	if(req.session.userName==null){
		res.redirect("/login");	
	}
	else
	{
		if(req.session.type=="nurse")
			res.sendFile(__dirname+"/views/getPatientDetails.html");
		else
			res.sendFile(__dirname+"/views/getPatientDetailsDoctor.html");
	}	
	
});
app.post('/getQuestionnaire',function(req,res){
	req.body.age=parseInt(req.body.age);
	if(req.body.hasOwnProperty('diseases')){
		delete req.body.diseases;
	}	
	if(req.body.hasOwnProperty('name')){
		delete req.body.name;
	}
	if(req.body.hasOwnProperty('phone')){
		delete req.body.phone;
	}	
	if(req.body.hasOwnProperty('pending')){
		delete req.body.pending;
	}			
	if(req.body.hasOwnProperty('insertedId')){
		delete req.body.insertedId;
	}			
	var options = {
	  url: 'https://api.infermedica.com/v2/diagnosis',
	  method:'POST',
	  headers: {
        "accept" : "application/json",
        'content-type' : 'application/json',
	    'app_id' : '83d0e109',
	    'app_key' : '01788b7345e2e730a5ab4fa9e60c9863'
	  },
	 // json:true,
	  body:JSON.stringify(req.body)
	};
	console.log(options);
	function callback(error, response, body) 
	{
		console.log(body);
	  if (!error && response.statusCode == 200) {
	  	console.log("right");
	    var info = JSON.parse(body);
	    console.log(info);
	    res.send(info);
	  }
	  
	  //console.log(error);
	}
	request(options, callback);
});
app.get('/registerDoctor',function(req,res){	
	res.sendFile(__dirname+"/views/registeration_doctor.html");
});
app.get('/registerNurse',function(req,res){	
	res.sendFile(__dirname+"/views/registeration_nurse.html");
});
app.get('/login',function(req,res){	
	res.sendFile(__dirname+"/views/indexHome.html");
});
app.get('/addPatient',function(req,res){	
	console.log(req.session.userName);
	if(req.session.userName==null){
		res.redirect("/login");	
	}
	else
	{
		res.sendFile(__dirname+"/views/home_nurse_addPatient.html");
	}	
	
});
app.get('/',function(req,res){	
	console.log("hello");
	if(req.session.userName==null){
		res.redirect("/login");	
	}
	else
	{
		if(req.session.type=="doc")
			res.redirect("/doctorHome");	
		else
			res.redirect("/nurseHome");	
	}		
	
});
app.listen(process.env.PORT || 8080, function(){
	console.log("hello");
});