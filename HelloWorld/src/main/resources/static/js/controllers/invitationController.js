app.controller('invitationController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', 'markService', 'korisnikService','mealOrderService', '$http', '$routeParams','$parse', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window, markService, korisnikService, mealOrderService, $http, $routeParams, $parse){

	var array = $routeParams.idReservation.split('?');
	var idReservation = parseInt(array[0]);
	var bpTime = array[1].split('=')[1];
	var idRestaurant = parseInt(array[2].split('=')[1]);
	var tableNumber = parseInt(array[3].split('=')[1]);
	var recieverId = array[4].split('=')[1];
	console.log(array);
	
	
	$scope.accept = function() {

		reservationService.addReservationByIdOfOther(idReservation,recieverId).then(function(response){
			alert('Saved!');
			
			if ($scope.orderList.length > 0){

				if ($scope.prepared == true) {

					tableService.getTableByRestaurantIdAndNumber(response.data.restaurantId, response.data.reservedTable.id+"").then(function(response){			
						$scope.selectedTable = response.data;	

						drinkOrderService.addDrinkOrderList(false, recieverId, response.data.restaurantId, response.data.number).then(function(response){
							alert('Dodata lista');
							for (var i = 0; i < $scope.orderList.length; i++) {
								drinkOrderService.addDrinkOrderItem($scope.orderList[i], bpTime, false, response.data.id, $scope.orderList[i].cena, $scope.orderList[i].brojac).then(function(response){
									alert('Dodat item u listu');
								});
							}


						});

					});
				}
				else {
					tableService.getTableByRestaurantIdAndNumber(response.data.restaurantId, response.data.reservedTable.id+"").then(function(response){			
						$scope.selectedTable = response.data;	

						drinkOrderService.addDrinkOrderList(false, recieverId, response.data.restaurantId,  response.data.number).then(function(response){
							alert('Dodata lista');
							for (var i = 0; i < $scope.orderList.length; i++) {
								drinkOrderService.addDrinkOrderItem($scope.orderList[i], null, false, response.data.id, $scope.orderList[i].cena, $scope.orderList[i].brojac).then(function(response){
									alert('Dodat item u listu');
								});
							}


						});

					});
				}

			}
			if ($scope.orderListMeal.length > 0){

				if ($scope.prepared == true) {

					tableService.getTableByRestaurantIdAndNumber(response.data.restaurantId, response.data.reservedTable.id+"").then(function(response){			
						$scope.selectedTable = response.data;	

						mealOrderService.addMealOrderList(false, recieverId, response.data.restaurantId, response.data.number).then(function(response){
							alert('Dodata lista jela');
							for (var i = 0; i < $scope.orderListMeal.length; i++) {
								mealOrderService.addMealOrderItem($scope.orderListMeal[i], bpTime, false, response.data.id, $scope.orderListMeal[i].cena, $scope.orderListMeal[i].brojac).then(function(response){
									alert('Dodat item u listu jela');
								});
							}


						});
					});
				}
				else {
					tableService.getTableByRestaurantIdAndNumber(response.data.restaurantId, response.data.reservedTable.id+"").then(function(response){			
						$scope.selectedTable = response.data;	

						mealOrderService.addMealOrderList(false, recieverId, response.data.restaurantId, response.data.number).then(function(response){
							alert('Dodata lista jela');
							for (var i = 0; i < $scope.orderListMeal.length; i++) {
								mealOrderService.addMealOrderItem($scope.orderListMeal[i], null, false, response.data.id, $scope.orderListMeal[i].cena, $scope.orderListMeal[i].brojac).then(function(response){
									alert('Dodat item u listu jela');
								});
							}


						});

					});
				}
			}


		});

	}
	
	
	
	

	$scope.backToLogin = function(){
		$location.path("/");
	}
	
	
	
	
$scope.prepared = true;
	
	$scope.orderList = [];
	
	$scope.deleteFromOrderList = function(drink) {
		var index = $scope.orderList.indexOf(drink);
		if (index != -1) {
			if (drink.brojac == 1) {
				$scope.orderList.splice( index, 1 );
			}
			else {
				drink.brojac = drink.brojac - 1;
				drink.cena = drink.cena - drink.price;
			}
		}
		
		
	}
	
	$scope.addToOrderList = function(drink){
		var index = $scope.orderList.indexOf(drink);
		if (index != -1) {
			drink.brojac = drink.brojac + 1;
			drink.cena = drink.cena + drink.price;
		}
		else {
			drink.brojac = 1;
			drink.cena = drink.price;
			$scope.orderList.push(drink);
		}
		
		
	};
	
	
	
	$scope.orderListMeal = [];
	
	$scope.deleteFromOrderListMeal = function(meal) {
		var index = $scope.orderListMeal.indexOf(meal);
		if (index != -1) {
			if (meal.brojac == 1) {
				$scope.orderListMeal.splice( index, 1 );
			}
			else {
				meal.brojac = meal.brojac - 1;
				meal.cena = meal.cena - meal.price;
			}
		}
		
		
	}
	
	$scope.addToOrderListMeal = function(meal){
		var index = $scope.orderListMeal.indexOf(meal);
		if (index != -1) {
			meal.brojac = meal.brojac + 1;
			meal.cena = meal.cena + meal.price;
		}
		else {
			meal.brojac = 1;
			meal.cena = meal.price;
			$scope.orderListMeal.push(meal);
		}
		
		
	};
	
	
	drinkCategoryService.getAllDrinkCategories(idRestaurant).then(function(response){
		$scope.categories = response.data;
	});
	
	menuCategoryService.getAllMenuCategories(idRestaurant).then(function(response){
		$scope.menuCategories = response.data;
	});
	


}]);