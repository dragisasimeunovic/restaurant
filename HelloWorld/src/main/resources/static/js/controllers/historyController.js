app.controller('historyController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', 'markService', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window, markService){

	$scope.max = 5;
	
	drinkOrderService.ratingOrders(loginService.user.email).then(function(response){
		$scope.orders = response.data;
	});

	$scope.submitRate = function (drinks, drinkRate, waiterEmail, waiterRate, orderListId, restaurantId, restaurantMark){
		
		if (angular.isUndefined(drinkRate) || angular.isUndefined(waiterRate) || angular.isUndefined(restaurantMark)){
			
		}
		else {
			drinkOrderService.setRated(orderListId).then(function(response){
				
			});
			
			markService.getRestaurantMarkForUser(loginService.user.email, restaurantId).then(function(response){
				console.log('response data za restaurant mark: ' + response.data.length);
				if (response.data.length > 0) {
					
				}
				else {
					console.log('dosao sam u else, id restorana je: ' + restaurantId);
					markService.addRestaurantMark(loginService.user.email, restaurantId, restaurantMark).then(function(response){
						
					});	
				}
			});
			
			markService.addWaiterMark(loginService.user.email, waiterEmail, waiterRate).then(function(response){
				
			});
			for (var i = 0; i < drinks.length; i++){
				markService.addDrinkMark(loginService.user.email, drinks[i].drink.id, drinkRate).then(function(response){
					
				});
			}
			$route.reload();
			
		}
		
		
	}
	


}]);