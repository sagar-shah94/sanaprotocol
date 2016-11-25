var app=angular.module('sanaApp',['ngResource']);
app.factory('ParticularPatientService',['$resource',
	 function($resource) {
	  return {
	    getDiseases:$resource('http://localhost:8080/getDiseases'),
	    getPatientDetail:$resource('http://localhost:8080/getParticularPatientData')
	};
}]);

app.controller("ParticularPatientCtrl",function($scope,ParticularPatientService,$window){
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
	var pid=getQueryVariable("id");
	$scope.diseases=[];
	alert(pid);
	ParticularPatientService.getDiseases.save({"pid":pid},function(res){
		alert(res);
	 	//$scope.diseases=res;
 	});	 	 
});