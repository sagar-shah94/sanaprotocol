var app=angular.module('sanaApp',['ngResource']);
app.factory('DoctorService',['$resource',
	 function($resource) {
	  return {
	    getCountOfPendingPatients: $resource('http://localhost:8080/getCountOfPendingPatients'),
	    getProfile:$resource('http://localhost:8080/getProfile')
	};
}]);

app.controller("DoctorCtrl",function($scope,DoctorService,$window){
	$scope.patients=[];
	$scope.pendingCount="";
	$scope.loggedUser="";
	$scope.details=[];
	DoctorService.getCountOfPendingPatients.query(function(res){
		$scope.pendingCount=res[0].patientCount;
		$scope.loggedUser=res[0].user;
		DoctorService.getProfile.get({"user":res[0].user},function(res){
			$scope.details=res.data;
		});		
	});
	$scope.logout=function(){
		window.location.assign("http://localhost:8080/logout");
	}
	$scope.home=function(){
		window.location.assign("http://localhost:8080/doctorHome");
	}
	$scope.addPatient=function(){
		window.location.assign("http://localhost:8080/addPatient");
	}
	$scope.editProfile=function(){
		window.location.assign("http://localhost:8080/editProfile");
	}	
	$scope.viewPatients=function(){
		window.location.assign("http://localhost:8080/getPatientsDetails");
	}	
	
});
	