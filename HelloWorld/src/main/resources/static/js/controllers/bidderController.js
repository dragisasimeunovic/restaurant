app.controller('bidderController', ['$scope','$location', 'loginService', 'bidderService', 'groceriesService', 'offerService', 'dateFilter', function($scope, $location, loginService, bidderService, groceriesService, offerService, dateFilter){
	
	$scope.confirmOffer = function(){
		
		var dateString = dateFilter($scope.deliveryDate, 'yyyy-MM-ddT');//dobar
		var timeString = dateFilter($scope.deliveryTime, 'HH:mm:00.000');
		var bpTime = dateString + timeString + 'Z';
		
		offerService.addOffer($scope.price, bpTime, loginService.user, $scope.selectedList, $scope.warranty).then(function(response){
			
		});
	}
	
	
	$scope.price = 1;
	$scope.deliveryDate = new Date();
	$scope.deliveryDateOpened = false;
	
	$scope.openDeliveryDate = function() {
	    $scope.deliveryDateOpened = true;
	};
	
	
	$scope.deliveryTime = new Date();
	$scope.deliveryTime.setHours(10);
	$scope.deliveryTime.setMinutes(0);
	
	$scope.hstep = 1;
	$scope.mstep = 30;
	
	
	$scope.name = loginService.user.ime;
	var currentDateAndTime = new Date();
	var curDateString = moment(currentDateAndTime).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
	
	groceriesService.getAllCategoriesByStartingTime(curDateString).then(function(response){
		$scope.lists = response.data;
	});
	
	
	
	
	
	
	
}]);