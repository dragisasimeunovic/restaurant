app.controller('mapController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', 'markService', 'korisnikService','mealOrderService', '$http',function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window, markService, korisnikService, mealOrderService, $http){

	
	restaurantsService.getRestaurantById(loginService.user.restoran).then(function(response){
		$scope.lat = response.data.latitude;
		$scope.lng = response.data.longitude;
	});
	
	
	$scope.getCurrentLocation = function(event){
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
        restaurantsService.changePositions(loginService.user.restoran, event.latLng.lat(), event.latLng.lng()).then(function(response){
    		
    	});
        
	}
	
	
}]);