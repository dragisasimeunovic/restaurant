app.controller('mapController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', 'markService', 'korisnikService','mealOrderService', '$http',function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window, markService, korisnikService, mealOrderService, $http){


/*
	$scope.pos.lat = 1.280095;
	$scope.pos.lng = 103.850949;*/

	
	$scope.getCurrentLocation = function(event){
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
	}
	
	
}]);