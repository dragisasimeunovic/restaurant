app.controller('historyController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', 'markService', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window, markService){

	$scope.max = 10;
	
	drinkOrderService.ratingOrders(loginService.user.email).then(function(response){
		$scope.orders = response.data;
	});

	$scope.submitRate = function (drinks, drinkRate, waiterEmail, waiterRate, orderListId){
		
		if (angular.isUndefined(drinkRate) || angular.isUndefined(waiterRate)){
			
		}
		else {
			drinkOrderService.setRated(orderListId).then(function(response){
				
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