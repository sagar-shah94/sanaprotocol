var app=angular.module('sanaApp',['ngResource']);
app.factory('newpassservice',['$resource',
	 function($resource) {
	  return {
	    setNewPass: $resource('http://localhost:8080/setNewPass'),
	    checkRecord:$resource('http://localhost:8080/checkRecord')
	};
}]);


app.controller("newpassCtrl",function($scope,newpassservice,$window){
	var random=getQueryVariable("random");
	var email=getQueryVariable("email");
	$scope.saveNewPass=function()
	{
		var pass=document.getElementById("pass").value;
		newpassservice.setNewPass.get({"username":email,"random":random,"newPass":pass},function(res){
			if(res.update=="success")
			{
				alert("new password set");
				window.location.assign("http://localhost:8080/login");
			}
		});		
	};
	newpassservice.checkRecord.get({"username":email,"random":random},function(res){
		if(res.record=="fail")
		{
			alert("no such request found");
			window.location.assign("http://localhost:8080/login");
		}
	});
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
});