app.controller('groceriesListController', ['$scope', 'restaurantsService', 'dateFilter', 'shiftService', 'groceriesService', '$mdDialog', '$route', 'loginService', function($scope, restaurantsService, dateFilter, shiftService, groceriesService, $mdDialog, $route, loginService){
	$scope.resId =  loginService.user.restoran;
	
	$scope.saveList = function() {
			
		var sdateString = dateFilter($scope.startingDate, 'yyyy-MM-ddT');
		var stimeString = dateFilter($scope.startingTime, 'HH:mm:00.000');
		var sbpTime = sdateString + stimeString + 'Z';
				
		var edateString = dateFilter($scope.endingDate, 'yyyy-MM-ddT');
		var etimeString = dateFilter($scope.endingTime, 'HH:mm:00.000');
		var ebpTime = edateString + etimeString + 'Z';
		
		var listName = $scope.listName;
		
		
		groceriesService.addList(listName, loginService.user.restoran, sbpTime, ebpTime).then(function(response){
			for(var i = 0; i < $scope.groceriesList.length; i++) {
				groceriesService.addListItem(response.data.id, $scope.groceriesList[i], $scope.groceriesList[i].brojac, response.data).then(function(response){
					
				});
			}
			$route.reload();
			
		});	
		
	}
	
	$scope.startingDate = new Date();
	$scope.startingDateOpened = false;
	
	$scope.openStartingDate = function() {
	    $scope.startingDateOpened = true;
	};
	
	
	$scope.startingTime = new Date();
	$scope.startingTime.setHours(10);
	$scope.startingTime.setMinutes(0);
	
	$scope.hstep = 1;
	$scope.mstep = 30;
	
	//ENDING DATE
	$scope.endingDate = new Date();
	$scope.endingDateOpened = false;
	
	$scope.openEndingDate = function() {
	    $scope.endingDateOpened = true;
	};
	
	
	$scope.endingTime = new Date();
	$scope.endingTime.setHours(10);
	$scope.endingTime.setMinutes(0);
	
	$scope.ehstep = 1;
	$scope.emstep = 30;
	
	
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
