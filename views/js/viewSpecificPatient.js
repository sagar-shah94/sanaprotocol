var app=angular.module('sanaApp',['ngResource']);
app.factory('viewSpecificPatient',['$resource',
	 function($resource) {
	  return {
	    getDiseases:$resource('http://localhost:8080/getDiseases'),
	    getPatient:$resource('http://localhost:8080/getSpecificPatientDetail'),
	    getCountOfPendingPatients: $resource('http://localhost:8080/getCountOfPendingPatients')
	};
}]);

app.controller("viewSpecificPatientCtrl",function($scope,viewSpecificPatient,$window){
	function getQueryVariable(variable)
	{
	       var query = window.location.search.substring(1);
	       var vars = query.split("&");
	       for (var i=0;i<vars.length;i++) {
	               var pair = vars[i].split("=");
	               if(pair[0] == variable){return pair[1];}
	       }
	       return(false);
	}	
	var id=getQueryVariable("id");	
	$scope.diseases=null;
	$scope.details=null;
	$scope.info=[];
	$scope.info.pid=null;
	$scope.info.pid=id;
	viewSpecificPatient.getPatient.get($scope.info,function(res){
		if(res.msg=="fail")
		{
			alert("Dont try to mess with a system");
			window.location.assign("http://localhost:8080/");
		}
		else
		{
			$scope.details=res.data;
			viewSpecificPatient.getDiseases.get($scope.info,function(r){
				$scope.diseases=r.data;
			});
		}
	});
	viewSpecificPatient.getCountOfPendingPatients.query(function(res){
		$scope.pendingCount=res[0].patientCount;
		$scope.loggedUser=res[0].user;
	});	
	$scope.home=function(){
		window.location.assign("http://localhost:8080/nurseHome");
	}
	$scope.addPatient=function(){
		window.location.assign("http://localhost:8080/addPatient");
	}
	$scope.viewPatients=function(){
		window.location.assign("http://localhost:8080/getPatientsDetails");
	}
	$scope.logout=function(){
		window.location.assign("http://localhost:8080/logout");
	}
	$scope.addPatient=function(){
		window.location.assign("http://localhost:8080/addPatient");
	}

});