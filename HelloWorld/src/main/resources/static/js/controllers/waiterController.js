app.controller('waiterController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', 'shiftService', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window, shiftService){
		
	
	$scope.activeShift = function() {

		var currentDateAndTime = new Date();
		var curDateString = moment(currentDateAndTime).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
		

		shiftService.findActiveShiftForEmployee(loginService.user.email, loginService.user.restoran, curDateString).then(function(response){

			$scope.activeReon = response.data.region;
			console.log('Region: ' + response.data.region);

			tableService.getAllRestaurantTables(loginService.user.restoran).then(function(response){
				
				$scope.tables = response.data;

				var canvas = new fabric.Canvas('canvas');

				for (var i = 0; i < $scope.tables.length; i++) {
					var color = {};
					if ($scope.tables[i].reon == $scope.activeReon){
						color = 'green';
					}
					else {
						color = 'red';
					}
				


				var table = new fabric.Circle({ radius: 30, fill: color, originX: 'center', originY: 'center'});
				var text = new fabric.Text($scope.tables[i].number+"",{
					fontFamily: 'Calibri',
					fontSize: 25,
					fill: 'white',
					originX: 'center',
					originY: 'center'
				});

				var group = new fabric.Group([table, text],{
					top: $scope.tables[i].positionTop, left: $scope.tables[i].positionLeft,
					lockMovementX: true,  lockMovementY: true, hasControls: false
				});

				group.on('mousedown', function(e) {

				});

				canvas.getObjects();
				canvas.add(group);
				canvas.selection = false;
				canvas.renderAll();
				canvas.calcOffset();
			}

			});


		});

	}

	
	
	shiftService.findShiftsForEmployee(loginService.user.email, loginService.user.restoran).then(function(response){
		$scope.events = response.data;
		for (var i = 0; i < $scope.events.length; i++) {
			var endTime = {};
			var endTimeString = $scope.events[i].endsAt;
			var endTimeMoment = moment(endTimeString);
			endTime = moment(endTimeMoment).format('HH:mm');
			$scope.events[i].title = endTime + " " + $scope.events[i].employee.ime 
			+ " " + $scope.events[i].employee.prezime 
			+ " (" + $scope.events[i].employee.tip + ")" + " " + $scope.events[i].region;
		}
	});
	
	$scope.calendarView = 'month';
	$scope.viewDate = new Date();
	$scope.calendarTitle = "Schedule";
	$scope.eventClicked = function(calendarEvent){
		alert('opa');
	}
	
	
	$scope.editProfile = function(){
		
		$mdDialog.show({
    		controller: EditProfileController,
    		templateUrl: '/views/dialogs/editProfileDialog.html',
    		parent: angular.element(document.body),
    		scope: $scope,
    		preserveScope: true,
    		clickOutsideToClose:false
    	});
		
		function EditProfileController($scope, loginService, $mdDialog, $route) {
			 
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
	
	
	drinkOrderService.getNonservedLists(loginService.user.restoran).then(function(response){
		$scope.orderLists = response.data;
	});	
	
	
	$scope.setPrepared = function(item){
		drinkOrderService.setPreparedForListItem(item.id, item.isPrepared).then(function(response){
			
		});	
	}
	
	
}]);