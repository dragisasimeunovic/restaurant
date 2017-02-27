app.controller('bidderController', ['$scope','$location', 'loginService', 'bidderService', 'groceriesService', 'offerService', 'dateFilter', '$mdDialog', '$route', function($scope, $location, loginService, bidderService, groceriesService, offerService, dateFilter, $mdDialog, $route){
	
	$scope.editOffer = function(offer){
		$mdDialog.show({
    		controller: EditBidderOfferController,
    		templateUrl: '/views/dialogs/editBidderOfferDialog.html',
    		parent: angular.element(document.body),
    		scope: $scope,
    		preserveScope: true,
    		clickOutsideToClose:false
    	});
		
		function EditBidderOfferController($scope, loginService, $mdDialog, $route, offerService) {
			 			
			$scope.ime = loginService.user.ime;
			$scope.price = offer.price;
			$scope.deliveryDate = new Date(offer.deliveryDate);
			$scope.deliveryTime = new Date(offer.deliveryDate);
			$scope.warranty = offer.warranty;
			
	  		$scope.apply = function(){		
	  			
	  			var dateString = dateFilter($scope.deliveryDate, 'yyyy-MM-ddT');
	  			var timeString = dateFilter($scope.deliveryTime, 'HH:mm:00.000');
	  			var bpTime = dateString + timeString + 'Z';
	  			
	  			
				$scope.username = loginService.user.ime;
					
					var confirm = $mdDialog.confirm()
						.textContent('Offer successfully updated!')
						.ok('Ok');
					
					offerService.updateOffer($scope.price, bpTime, $scope.warranty, offer.id).then(function(response){
						
					});
					
					$mdDialog.show(confirm);
					
					$mdDialog.hide();
					$route.reload();
	  		}
	  		
	  		
	  		
	  		$scope.cancel = function(){
	  			$mdDialog.cancel();	
	  		}
	  		
	  	}
	}
	
	$scope.activeBidder = loginService.user;
	
	groceriesService.getAllCategoriesByRestaurantId(loginService.user.restoran).then(function(response){
		$scope.allLists = response.data;
	});
	
	$scope.activeTab = 1;
	
	$scope.username = loginService.user.ime;
	
	$scope.editProfile = function(){
		
		$mdDialog.show({
    		controller: EditBidderProfileController,
    		templateUrl: '/views/dialogs/editBidderProfileDialog.html',
    		parent: angular.element(document.body),
    		scope: $scope,
    		preserveScope: true,
    		clickOutsideToClose:false
    	});
		
		function EditBidderProfileController($scope, loginService, $mdDialog, $route) {
			 
			$scope.activeForm = 1;
			if ($scope.activeForm == 1) {			
				$scope.ime = loginService.user.ime;
			}
			
	  		$scope.apply = function(){	
	  			
	  			if ($scope.activeForm == 1) {
	  				
	  				loginService.changeAboutBidder($scope.ime, loginService.user.email).then(function(response){

					});	
	  					
	  				loginService.user.ime = $scope.ime;
					$scope.username = loginService.user.ime;
					
					var confirm = $mdDialog.confirm()
						.textContent('Profile successfully updated!')
						.ok('Ok');
					
					$mdDialog.show(confirm);
						$mdDialog.hide();
						
						$route.reload();
	  				
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
	  						$route.reload();

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
	
	if (loginService.user.firstLogin == 0) {
		$mdDialog.show({
	    		controller: FirstLoginController,
	    		templateUrl: '/views/dialogs/firstLoginDialog.html',
	    		parent: angular.element(document.body),
	    		scope: $scope,
	    		preserveScope: true,
	    		clickOutsideToClose:false
	    	});
		
		function FirstLoginController($scope, loginService, $mdDialog, $route) {
 
		  		$scope.apply = function(){	
		  			if ($scope.oldPassword == loginService.user.lozinka) {
		  				if ($scope.password1 == $scope.password2) {
		  					
		  				var confirm = $mdDialog.confirm()
		  		          				.textContent('Password successfully changed!')
		  		          				.ok('Ok');
		  				
		  				loginService.changeFirstLogin(loginService.user.email, 1, $scope.password1).then(function(response){
		  					
		  				});	
		  				loginService.user.firstLogin = 1;

		  				$mdDialog.show(confirm);
		  				$mdDialog.hide();
		  				$route.reload();
		  				
		  				}
		  			}
		  			
		  		}
		  		

		  	}
	}
	
	
	$scope.confirmOffer = function(){
		
		var dateString = dateFilter($scope.deliveryDate, 'yyyy-MM-ddT');//dobar
		var timeString = dateFilter($scope.deliveryTime, 'HH:mm:00.000');
		var bpTime = dateString + timeString + 'Z';
		
		offerService.addOffer($scope.price, bpTime, loginService.user, $scope.selectedList, $scope.warranty).then(function(response){
			
		});
		
		$route.reload();
	}
	
	
	$scope.price = 1;
	$scope.deliveryDate = new Date();
	$scope.deliveryDateOpened = false;
	
	$scope.openDeliveryDate = function() {
	    $scope.deliveryDateOpened = true;
	};
	
	
	$scope.deliveryTime = new Date();
	$scope.deliveryTime.setHours(10);
	$scope.deliveryTime.setMinutes(0);
	
	$scope.hstep = 1;
	$scope.mstep = 30;
	
	
	$scope.name = loginService.user.ime;
	var currentDateAndTime = new Date();
	var curDateString = moment(currentDateAndTime).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
	
	groceriesService.getAllCategoriesByStartingTime(curDateString).then(function(response){
		$scope.lists = response.data;
	});
	
	
	
	
	
	
	
}]);