var app=angular.module('sanaApp',['ngResource']);

app.factory('PatientService',['$resource',
	 function($resource) {
	  return {
	    getSymptoms: $resource('http://localhost:8080/getSymptoms'),
	    getQuestionnaire:$resource('http://localhost:8080/getQuestionnaire'),
	    savePatientRecord:$resource('http://localhost:8080/savePatientRecord'),
	    getCountOfPendingPatients: $resource('http://localhost:8080/getCountOfPendingPatients'),
	    getProfile:$resource('http://localhost:8080/getProfile'),
	    getSpecialisation:$resource('http://localhost:8080/getSpecialisation'),
	    sendRequestToDoctor:$resource('http://localhost:8080/sendRequestToDoctor')
	};
}]);

app.controller("PatientCtrl",function($scope,PatientService,$window)
{
	
	$scope.symptoms=null;
	$scope.specialise=null;
	$scope.patient=null;
	$scope.error=null;
	$scope.request={};
	PatientService.getCountOfPendingPatients.query(function(res){
		$scope.pendingCount=res[0].patientCount;
		$scope.loggedUser=res[0].user;
	});	
	PatientService.getSymptoms.query(function(res){
		$scope.symptoms=res;
	});
	PatientService.getSpecialisation.query(function(res){
		$scope.specialise=res;
	});	
	$scope.sendPatientDetails=function(){
		var temp={id:$scope.patient.symptom,"choice_id":"present"};
		$scope.evidence=[];
		$scope.evidence.push(temp);
		//alert($scope.questions.length);
		$scope.request.age=$scope.patient.age;
		$scope.request.sex=$scope.patient.gender;
		$scope.request.evidence=$scope.evidence;
		$scope.questions=[];	
			
		PatientService.getQuestionnaire.save($scope.request,function(res){
			$scope.questions=res.question.items;
		});
	}
	$scope.getResults=function(){
		for(var a=1;a<=$scope.questions.length;a++)
		{
			$scope.evidence.push({id:$scope.questions[a-1].id,"choice_id":document.getElementById($scope.questions[a-1].id).value});	
		}
		PatientService.getQuestionnaire.save($scope.request,function(res){
			$scope.diseases=[];
			$scope.request.diseases=$scope.diseases;
			for(var a=1;a<=res.conditions.length;a++)
			{
				$scope.diseases.push({"name":res.conditions[a-1].name,"prob":res.conditions[a-1].probability});
			}
		});		
		//$scope.evidence.push($scope.patient.symptom);
		//alert(obj.evidence[0].id+"  "+$scope.patient.gender+"  "+$scope.patient.symptom);
	}
	$scope.saveRecord=function(){
		$scope.request.name=$scope.patient.name;
		$scope.request.phone=$scope.patient.phone;
		$scope.request.pending=0;
		PatientService.savePatientRecord.save($scope.request,function(res){

		});				
	}	
	$scope.logout=function(){
		window.location.assign("http://localhost:8080/logout");
	}
	$scope.sendRequestToDoctor=function(){
		$scope.request.name=$scope.patient.name;
		$scope.request.phone=$scope.patient.phone;
		$scope.request.pending=1;
		$scope.request.specialised_in=document.getElementById("specialised_in").value;
		var temp={id:$scope.patient.symptom,"choice_id":"present"};
		$scope.evidence=[];
		$scope.evidence.push(temp);
		$scope.request.age=$scope.patient.age;
		$scope.request.sex=$scope.patient.gender;
		$scope.request.evidence=$scope.evidence;
		$scope.questions=[];	

		PatientService.sendRequestToDoctor.save($scope.request,function(res){
			alert(res);
		});						
	}

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
});
