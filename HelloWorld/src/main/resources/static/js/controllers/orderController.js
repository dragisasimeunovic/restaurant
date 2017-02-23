app.controller('orderController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window){
		
	//Uzmi number stola stola!

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
	
	
	
    	$scope.allTables = [];
    	drinkCategoryService.getAllDrinkCategories(orderService.activeReservation.restaurantId).then(function(response){
    		$scope.categories = response.data;
    	});
    	
    	reservationService.getAllTermReservations(orderService.activeReservation.id).then(function(response){
			console.log('Termina ima: ' + response.data.length + " rezervacije!");
			
			$scope.orderConfirmation = function(){
				
				$scope.tableNumber = canvas.getActiveObject().item(1).get('text');
				$scope.selectedTable = [];
				tableService.getTableByRestaurantIdAndNumber(orderService.activeReservation.id, $scope.tableNumber+"").then(function(response){			
					$scope.selectedTable = response.data;	
					
					drinkOrderService.addDrinkOrderList(false, loginService.user.email, orderService.activeReservation.restaurantId, $scope.tableNumber).then(function(response){
						alert('Dodata lista');
						for (var i = 0; i < $scope.orderList.length; i++) {
							drinkOrderService.addDrinkOrderItem($scope.orderList[i], null, false, response.data.id, $scope.orderList[i].cena, $scope.orderList[i].brojac).then(function(response){
								alert('Dodat item u listu');
							});
						}
						
						
					});
					
				});
				
			}
			
			var canvas = new fabric.Canvas('canvas');
			
			/*canvas.selectionColor = 'rgba(0,255,0,0.3)';
		    canvas.selectionBorderColor = 'red';
		    canvas.selectionLineWidth = 1;
		    canvas.selection = false;*/
			
			$scope.tables = [];
			for (var i = 0; i < response.data.length; i++) {
				$scope.tables.push(response.data[i].reservedTable);
			}

			
			for (var i = 0; i < $scope.tables.length; i++) {
				var color = {};
				if ($scope.tables[i].reon == 'inside'){
					color = 'red';
				}
				else if ($scope.tables[i].reon == 'nonsmoking'){
					color = 'purple';
				}
				else if ($scope.tables[i].reon == 'gardenclosed') {
					color = 'yellow';
				}
				else if ($scope.tables[i].reon == 'gardenopened') {
					color = 'green';
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
		            // Inspect, for a collection of the objects in this group
		           
		           /*console.log(e);
		           console.log(canvas.getActiveObject().item(1).get('text'));
		           //ovde se sad korisnik pita da li je siguran da zeli da rezervise taj sto
		           
		           
		          
		   		    	$mdDialog.show({
		   		    		controller: TableReservationController,
		   		    		templateUrl: '/views/dialogs/tableReservationDialog.html',
		   		    		parent: angular.element(document.body),
		   		    		
		   		    		scope: $scope,//?
		   		    		preserveScope: true,
		   		    		clickOutsideToClose:true,
		   		    		fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		   		    	})
		   		    	.then(function(answer) {
		   		    		$scope.status = 'You said the information was "' + answer + '".';
		   		    	}, function() {
		   		    		$scope.status = 'You cancelled the dialog.';
		   		    	});
		   		  	
		   		  	
		   		  	
		   		  	function TableReservationController($scope, tableService, $mdDialog) {
					  
		   		  		$scope.tableNumber = canvas.getActiveObject().item(1).get('text');
		   		  		$scope.idr = $scope.selectedRestaurant.ime;
			 
		   		  		$scope.apply = function(){
		   		  			
		   		  			function containsObject(obj, reservedTables) {
		   		  				var i;
		   		  				for (i = 0; i < reservedTables.length; i++) {
		   		  					if (angular.equals(obj, reservedTables[i])) {
		   		  						return true;
		   		  					}
		   		  				}

		   		  				return false;
		   		  			}
		   		  			
		   		  			tableService.getTableByRestaurantIdAndNumber($scope.selectedRestaurant.id, $scope.tableNumber+"").then(function(response){
		   		  				
		   		  				if(containsObject(response.data, reservedTables) == true) {
		   		  					alert('Already reserved');
		   		  				}
		   		  				else {
		   		  					reservedTables.push(response.data);
		   		  				}
		   		  				
		   		  			$mdDialog.hide();
		   		  				
		   		  			});
		   		  			
		   		  		}
		   		  		
		   		  		$scope.close = function() {
		   		  			$mdDialog.cancel();
		   		  		};

		   		  	}*/
		   		  	
		           
		        });
		    	canvas.getObjects();
		    	canvas.add(group);
		    	canvas.selection = false;
		        canvas.renderAll();
		        canvas.calcOffset();
		        
			}

			
		});
    	
    	
    			
    			
    		
	
	
	
}]);