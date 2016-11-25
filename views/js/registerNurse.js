var app=angular.module('sanaApp',['ngResource']);

app.factory('registerNurseService', function ($resource) {
    return $resource('http://localhost:8080/saveNurseDetails');
});

app.controller("registerNurseCtrl",function($scope,registerNurseService,$window){

	$scope.nurse=null;
	$scope.error=null;
	$scope.saveNurseDetails=function()
	{
		$scope.nurse.dob=document.getElementById("date-picker-2").value;
		//alert($scope.nurse.dob);
		registerNurseService.save($scope.nurse,function(res){
			if(res.insert=="success")
			{
				window.location.assign("http://localhost:8080/");	
			}	
		});

	};	

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

