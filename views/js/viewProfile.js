var app=angular.module('sanaApp',['ngResource']);

app.factory('viewProfile',['$resource',
	 function($resource) {
	  return {
	    getProfile: $resource('http://localhost:8080/getProfile')
	};
}]);

app.controller("viewProfileCtrl",function($scope,viewProfile,$window){
	
	$scope.details=null;
	viewProfile.getProfile.get(function(res){
		$scope.details=res.data;
	});
	$scope.editProfile=function(){
		window.location.assign("http://localhost:8080/editProfile");
	}

});