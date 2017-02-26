app.controller('reportsController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', 'markService', 'korisnikService', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window, markService, korisnikService){
	
	restaurantsService.getRestaurantById(loginService.user.restoran).then(function(response){
		  $scope.restaurantName = response.data.ime;  
	 });
	
	
	markService.getRestaurantMark(loginService.user.restoran).then(function(response){
		var sum = 0;  
		for (var i = 0; i < response.data.length; i++) {
			  sum += response.data[i].mark;
		}
		$scope.rate = sum / response.data.length;
	 });
	
	korisnikService.gettAllRestaurantEmployeesWithType(loginService.user.restoran, "Waiter").then(function(response){
		$scope.waiters = response.data;
	});
	
	$scope.selectedWaiterChanged = function() {
		markService.getWaiterMark($scope.selectedWaiter.email).then(function(response){
			var sum = 0;  
			for (var i = 0; i < response.data.length; i++) {
				sum += response.data[i].mark;
			}
			$scope.waiterRate = sum / response.data.length;
		});
	}
	
	$scope.selectedDrinkChanged = function() {
		
		markService.getDrinkMark($scope.selectedDrink.id).then(function(response){
			var sum = 0;  
			for (var i = 0; i < response.data.length; i++) {
				sum += response.data[i].mark;
			}
			$scope.drinkRate = sum / response.data.length;
		});
	}
	
	drinkCategoryService.getAllDrinkCategories(loginService.user.restoran).then(function(response){
		$scope.categories = response.data;
	});
	
	
	
	
	
}]);