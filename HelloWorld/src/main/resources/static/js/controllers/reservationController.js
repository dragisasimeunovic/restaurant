app.controller('reservationController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window){
	
	$scope.currentPage = 1;
	$scope.totalItems = 40;
	
	$scope.pageLabel = function($page){
		if ($page == 1)
			return "Restaurant and reservation time"
		else if ($page == 2)
			return "Table or tables"
		else if ($page == 3)
			return "Friends"
		else
			return "Confirm reservation"
				
	}
	
	
	$scope.prevPage = function(currentPage){
		if (currentPage == 1){
			$scope.currentPage = 1;
		}
		else{
			$scope.currentPage--;
		}
		
	}
	
	$scope.nextPage = function(currentPage){
		if (currentPage == 4){
			$scope.currentPage = 4;
		}
		else{
			$scope.currentPage++;
		}
	}
	
	restaurantsService.getAllRestaurants().then(function(response){
		$scope.restaurants = response.data;
	});
	
	friendsService.getAllFriends(loginService.user.email).then(function(response){
		$scope.friendships = response.data;
	});
	
	
	//CANVAS Settings
	
	var canvas = new fabric.Canvas('canvas');
	
	canvas.selectionColor = 'rgba(0,255,0,0.3)';
    canvas.selectionBorderColor = 'red';
    canvas.selectionLineWidth = 1;
	
    $scope.printSelected = function(){
    	console.log($scope.selectedRestaurant);
    }
	
	
	
}]);