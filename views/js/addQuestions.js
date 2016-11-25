var app=angular.module('sanaApp',['ngResource']);

app.factory('questionService', function ($resource) {
    return $resource('http://localhost:8080/addQuestionnaire');
});

app.controller("QuestionCtrl",function($scope,questionService,$window){

	$scope.questions=[];
	var opCount=0;
	$scope.addQuestion=function()
	{
		$scope.questions.push({id:($scope.questions.length+1),options:[]});
	};
	$scope.addOptions=function(a,qid)
	{
		a.push({id:(qid+"op"+(a.length+1))});		
	};
	$scope.sendQuestionnaire=function()
	{
		$scope.request=[];
		for(var a=1;a<=$scope.questions.length;a++)
		{
			var question=document.getElementById(a).value;
			alert(question);
			$scope.options=[];
			for(var b=1;b<=$scope.questions[a-1].options.length;b++)
			{
				var st=a+"op"+b;
				alert(document.getElementById(st).value);
				$scope.options.push({"value":document.getElementById(st).value});
				
			}

			$scope.request.push({"question":question,"options":$scope.options});	
		}
		questionService.save($scope.request,function(res){
			alert(res);
		});
	}
});