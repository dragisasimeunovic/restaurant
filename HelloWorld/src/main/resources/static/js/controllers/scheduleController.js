app.controller('scheduleController', ['$scope', function($scope){

	$scope.calendarView = 'month';
	$scope.viewDate = new Date();
	$scope.events = [];
	$scope.calendarTitle = "Schedule";
	$scope.eventClicked = function(calendarEvent){
		alert('opa');
	}
	
}]);