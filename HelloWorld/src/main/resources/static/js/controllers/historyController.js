app.controller('historyController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window){

	$scope.max = 10;
	
	drinkOrderService.ratingOrders(loginService.user.email).then(function(response){
		$scope.orders = response.data;
	});

	$scope.submitRate = function (drinks, drinkRate, waiterEmail, waiterRate){
		
		if (angular.isUndefined(drinkRate) || angular.isUndefined(waiterRate)){
			
		}
		else {
			for (var i = 0; i < drinks.length; i++){
				
			}
			
		}
		
		
	}
	


}]);