var app=angular.module('sanaApp',['ngResource']);
app.factory('registerDoctorService',['$resource',
	 function($resource) {
	  return {
	    saveDoctorDetails: $resource('http://localhost:8080/saveDoctorDetails'),
	    getSpecialisation:$resource('http://localhost:8080/getSpecialisation')
	};
}]);


app.controller("registerDoctorCtrl",function($scope,registerDoctorService,$window){

	$scope.doctor=null;
	$scope.error=null;
	$scope.specialise=null;
	$scope.saveDoctorDetails=function()
	{
		alert("hello");
		$scope.doctor.specialisedIn=document.getElementById("specialised_in").value;
		$scope.doctor.dob=document.getElementById("dob").value;
		alert(document.getElementById("username").value+"  "+$scope.doctor.username);
		registerDoctorService.saveDoctorDetails.save($scope.doctor,function(res){
			alert(res.insert);
			if(res.insert=="success")
			{
				window.location.assign("http://localhost:8080/");	
			}
			
		});

	};
	registerDoctorService.getSpecialisation.query(function(res){
		$scope.specialise=res;
	});	
	$scope.home=function(){
		window.location.assign("http://localhost:8080/");
	}
	$scope.about=function(){
		window.location.assign("http://localhost:8080/about");
	}
	$scope.mail=function(){
		window.location.assign("http://localhost:8080/mail");
	}
	
	

});