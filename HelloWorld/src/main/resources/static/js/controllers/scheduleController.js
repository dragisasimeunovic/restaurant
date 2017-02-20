app.controller('scheduleController', ['$scope', 'restaurantsService', 'dateFilter', 'shiftService', function($scope, restaurantsService, dateFilter, shiftService){

	
	$scope.shiftHours = 1;
	
	$scope.confirmShift = function(){
		
		var reon = "";
		if ($scope.selectedEmployee.tip == "Waiter") {
			reon = $scope.selectedRegion.value;
		}
		
		var color = {};
		if ($scope.selectedEmployee.tip == "Waiter") {
			color = 'blue';
		}
		else if ($scope.selectedEmployee.tip == "Cook"){
			color = 'white';
		}
		else if ($scope.selectedEmployee.tip == "Bartender"){
			color = 'black';
		}
		
		var dateString = dateFilter($scope.shiftStart, 'yyyy-MM-ddT');//dobar
		var timeString = dateFilter($scope.shiftStartTime, 'HH:mm:00.000');
		var shiftStartTimeString = dateString + timeString + 'Z';
		
		var shiftStartMoment = moment(shiftStartTimeString);
		var shiftEndDate = moment(shiftStartMoment).add($scope.shiftHours - 1, 'h').toDate();
		var shiftEndDateString = moment(shiftEndDate).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z'; 
		
		
		shiftService.addShift(restaurantsService.activeRestaurant.id, $scope.selectedEmployee, color, reon, shiftStartTimeString, shiftEndDateString).then(function(response){
			alert('Shift added');
		});
		
		
	} 
	
	
	$scope.regions = [
	               {
	            	   name: 'Inside',
	            	   value: 'inside'
	               },
	               {
	            	   name: 'Non smoking',
	            	   value: 'nonsmoking'
	               },
	               {
	            	   name: 'Garden (closed)',
	            	   value: 'gardenclosed'
	               },
	               {
	            	   name: 'Garden (opened)',
	            	   value: 'gardenopened'
	               }
	             ];
	
	restaurantsService.allRestaurantEmployees().then(function(response){
		$scope.employees = response.data;
	});
	
	
	$scope.restoranId = restaurantsService.activeRestaurant.id;
	
	$scope.shiftStart = new Date();
	$scope.shiftStartOpened = false;
	
	$scope.openShiftStart = function() {
	    $scope.shiftStartOpened = true;
	};
	
	
	$scope.shiftStartTime = new Date();
	$scope.shiftStartTime.setHours(10);
	$scope.shiftStartTime.setMinutes(0);
	
	$scope.hstep = 1;
	$scope.mstep = 30;
	
	$scope.calendarView = 'month';
	$scope.viewDate = new Date();
	$scope.events = [
	                     {
	                         title: 'An event',
	                         color: 'blue',
	                         startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
	                         endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate()
	                         
	                     }];
	$scope.calendarTitle = "Schedule";
	$scope.eventClicked = function(calendarEvent){
		alert('opa');
	}
	
}]);