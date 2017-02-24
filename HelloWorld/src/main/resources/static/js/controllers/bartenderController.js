app.controller('bartenderController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window){
		
	
	
	$scope.editProfile = function(){
		
		$mdDialog.show({
    		controller: EditProfileController,
    		templateUrl: '/views/dialogs/editProfileDialog.html',
    		parent: angular.element(document.body),
    		scope: $scope,
    		preserveScope: true,
    		clickOutsideToClose:false
    	});
		
		function EditProfileController($scope, loginService, $mdDialog) {
			 
			$scope.activeForm = 1;
			if ($scope.activeForm == 1) {			
				$scope.ime = loginService.user.ime;
				$scope.prezime = loginService.user.prezime;
				$scope.footwearSize = loginService.user.footwearSize;
				$scope.dressSize = loginService.user.dressSize;
			}
			
	  		$scope.apply = function(){	
	  			
	  			if ($scope.activeForm == 1) {
	  				
	  				loginService.changeAbout($scope.ime, $scope.prezime, $scope.dressSize, $scope.footwearSize, loginService.user.email).then(function(response){

					});	
	  					
	  				loginService.user.ime = $scope.ime;
					loginService.user.prezime = $scope.prezime;
					loginService.user.footwearSize = $scope.footwearSize;
					loginService.user.dressSize = $scope.dressSize;
					
					var confirm = $mdDialog.confirm()
						.textContent('Profile successfully updated!')
						.ok('Ok');
					
					$mdDialog.show(confirm);
						$mdDialog.hide();
	  				
	  			}
	  			
	  			if ($scope.activeForm == 2) {

	  				if ($scope.oldPassword == loginService.user.lozinka) {
	  					if ($scope.password1 == $scope.password2) {

	  						var confirm = $mdDialog.confirm()
	  						.textContent('Password successfully changed!')
	  						.ok('Ok');
	  						
	  						loginService.user.lozinka = $scope.password1;

	  						loginService.changeFirstLogin(loginService.user.email, 1, $scope.password1).then(function(response){

	  						});	

	  						$mdDialog.show(confirm);
	  						$mdDialog.hide();

	  					}
	  				}	
	  			}
	  		}
	  		
	  		$scope.changePassword = function(){
	  			$scope.activeForm = 2;
	  		}
	  		
	  		$scope.cancel = function(){
	  			if ($scope.activeForm == 2) {
	  				$scope.activeForm = 1;
	  			}
	  			else if ($scope.activeForm == 1) {
	  				$mdDialog.cancel();
	  			}
	  		}
	  		
	  	}
		
	}
	
	$scope.backToLogin = function() {
		$location.path("/");
	}
	
	$scope.username = loginService.user.ime;
	
	if (loginService.user.firstLogin == 0) {
		$mdDialog.show({
	    		controller: FirstLoginController,
	    		templateUrl: '/views/dialogs/firstLoginDialog.html',
	    		parent: angular.element(document.body),
	    		scope: $scope,
	    		preserveScope: true,
	    		clickOutsideToClose:false
	    	});
		
		function FirstLoginController($scope, loginService, $mdDialog) {
 
		  		$scope.apply = function(){	
		  			if ($scope.oldPassword == loginService.user.lozinka) {
		  				if ($scope.password1 == $scope.password2) {
		  					
		  				var confirm = $mdDialog.confirm()
		  		          				.textContent('Password successfully changed!')
		  		          				.ok('Ok');
		  				
		  				loginService.changeFirstLogin(loginService.user.email, 1, $scope.password1).then(function(response){
		  					
		  				});	

		  				$mdDialog.show(confirm);
		  				$mdDialog.hide();
		  				
		  				}
		  			}
		  			
		  		}
		  		

		  	}
	}
	
	
	drinkOrderService.getNonservedLists(loginService.user.restoran).then(function(response){
		$scope.orderLists = response.data;
	});	
	
	
	$scope.setPrepared = function(item){
		drinkOrderService.setPreparedForListItem(item.id, item.isPrepared).then(function(response){
			
		});	
	}
	
	
}]);