var app=angular.module('sanaApp',['ngResource']);

app.factory('UserService', ['$resource',
	 function($resource) {
	  return {
	    authenticate: $resource('http://localhost:8080/authenticate'),
	    forgetRequest: $resource('http://localhost:8080/forgetRequest')
	};
}]);

app.controller("loginCtrl",function($scope,UserService,$window){

	$scope.user=undefined;
	$scope.error=null;
	$scope.forget=null;
	$scope.login=function()
	{
		UserService.authenticate.save($scope.user,function(res){
			//alert(res.type);
			if(res.login=="success")
			{
				if(res.type=="doc")
				{
					window.location.assign("http://localhost:8080/doctorHome");
				}
				else
				{
					window.location.assign("http://localhost:8080/nurseHome");
				}	
			}
			else
			{
				alert("Login Failed:Username or password is incorrect");
			}
		});

	};
	$scope.redirectToRegister=function(){
		window.location.assign("http://localhost:8080/registerationOptions");
	}
	$scope.forgetRequest=function(){
		alert($scope.forget.email);
		UserService.forgetRequest.save($scope.forget,function(res){
			alert(res.forget);
		});	
	}
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