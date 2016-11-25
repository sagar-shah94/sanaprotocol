var app=angular.module('sanaApp',['ngResource']);
app.factory('viewPatient',['$resource',
	 function($resource) {
	  return {
	    getQuestions: $resource('http://localhost:8080/getQuestions'),
	    getDiseases:$resource('http://localhost:8080/getDiseases'),
	    getPatientDetail:$resource('http://localhost:8080/getPatientDetail')
	};
}]);

app.controller("viewPatientCtrl",function($scope,viewPatient,$window){

});