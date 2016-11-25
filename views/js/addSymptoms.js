var app=angular.module('sanaApp',['ngResource']);

app.factory('symptomService', function ($resource) {
    return $resource('http://localhost:8080/saveDoctorDetails');
});

app.controller("SymptomsCtrl",function($scope,symptomService,$window){

	$scope.symptoms=[];
	$scope.addSymptom=function()
	{
		$scope.symptoms.push({id: 'choice'+($scope.symptoms.length+1)});
	};
	

});