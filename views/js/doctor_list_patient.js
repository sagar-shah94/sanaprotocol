var app=angular.module('sanaApp',['ngResource']);

app.factory('DoctorService',['$resource',
	 function($resource) {
	  return {
	  	getCountOfPendingPatients: $resource('http://localhost:8080/getCountOfPendingPatients'),
	    getPatients: $resource('http://localhost:8080/getPatients')
	};
}]);

app.controller("DoctorCtrl",function($scope,DoctorService,$window){
	
	$scope.patients=null;
	DoctorService.getPatients.query(function(res){
		$scope.patients=res;
	});
	$scope.getReport=function(id)
	{
		window.open('http://localhost:8080/getParticularPatient?id='+id, '_blank');
	};
	$scope.patients=[];
	$scope.pendingCount="";
	$scope.loggedUser="";
	$scope.details=[];
	DoctorService.getCountOfPendingPatients.query(function(res){
		$scope.pendingCount=res[0].patientCount;
		$scope.loggedUser=res[0].user;
	});
	$scope.logout=function(){
		window.location.assign("http://localhost:8080/logout");
	}
	$scope.viewPatients=function(){
		window.location.assign("http://localhost:8080/getPatientsDetails");
	}		
	$scope.home=function(){
		window.location.assign("http://localhost:8080/doctorHome");
	}

});