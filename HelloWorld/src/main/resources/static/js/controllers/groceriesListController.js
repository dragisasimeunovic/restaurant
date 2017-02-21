app.controller('groceriesListController', ['$scope', 'restaurantsService', 'dateFilter', 'shiftService', 'groceriesService', '$mdDialog', '$route', function($scope, restaurantsService, dateFilter, shiftService, groceriesService, $mdDialog, $route){
	$scope.groceriesList = [];
	
	$scope.deleteFromGroceriesList = function(groceries) {
		var index = $scope.groceriesList.indexOf(groceries);
		if (index != -1) {
			if (groceries.brojac == 1) {
				$scope.groceriesList.splice( index, 1 );
			}
			else {
				groceries.brojac = groceries.brojac - 1;
			}
		}
		
		
	}
	
	$scope.addToGroceriesList = function(groceries){
		var index = $scope.groceriesList.indexOf(groceries);
		if (index != -1) {
			groceries.brojac = groceries.brojac + 1;
		}
		else {
			groceries.brojac = 1;
			$scope.groceriesList.push(groceries);
		}
		
		
	};
	
	groceriesService.getAllCategories().then(function(response){
		$scope.categories = response.data;
	});
	
	
	
	$scope.addGroceriesCategoryDialog = function(ev) {
	    $mdDialog.show({
		      controller: AddGroceriesCategoryController,
		      templateUrl: '/views/dialogs/AddGroceriesCategoryDialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: false // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		      
		    }, function() {
		     
		    });
		 };
		 
		 function AddGroceriesCategoryController($scope, $mdDialog, $route) {

			
				 $scope.addGroceriesCategory = function(){
					 var categoryName = $scope.categoryName;
					 groceriesService.addGroceriesCategory(categoryName).then(function(response){
					
						 $mdDialog.hide();
						 $route.reload();
						 
					 });
				 }
				 
				 $scope.closeDialog = function() {
					 $mdDialog.cancel();
				 }
				 
		 }
		 
	
	$scope.addGroceries = function(category) {
			    $mdDialog.show({
			      controller: AddGroceriesController,
			      templateUrl: '/views/dialogs/addGroceriesDialog.html',
			      parent: angular.element(document.body),
			      clickOutsideToClose:true,
			      fullscreen: false // Only for -xs, -sm breakpoints.
			    })
			    .then(function(answer) {
			      
			    }, function() {
			     
			    });
			    
			    groceriesService.activeCategory = category;
			 };
			 
			 function AddGroceriesController($scope, $mdDialog, groceriesService, $route) {
				
				
					 $scope.addGroceries = function(){
						 		 
						 var groceriesName = $scope.groceriesName;				
						 groceriesService.addGroceries(groceriesName, groceriesService.activeCategory).then(function(response){
							
							 $mdDialog.hide();
							 $route.reload();
							 
						 });
					 }

					 $scope.closeDialog = function() {
						 $mdDialog.cancel();
					 }
					 
			 }
	
	
}]);	
