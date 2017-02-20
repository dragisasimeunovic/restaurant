app.controller('orderController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore){
	
	restaurantsService.getRestaurantById(orderService.activeReservation.restaurantId).then(function(response){
		$scope.ime = response.data.ime;
		$scope.tip = response.data.tip;
		$scope.ocena = response.data.ocena;
	});
	
	
var canvas = new fabric.Canvas('canvas');
	
	canvas.selectionColor = 'rgba(0,255,0,0.3)';
    canvas.selectionBorderColor = 'red';
    canvas.selectionLineWidth = 1;
    
    var reservedTables = [];
	
 
    	drinkCategoryService.getAllDrinkCategories(orderService.activeReservation.restaurantId).then(function(response){
    		$scope.categories = response.data;
    	});
    	
    	
    		tableService.getAllRestaurantTables(orderService.activeReservation.restaurantId).then(function(response){
    			
    			console.log('Vracenih stolova: '+ response.data.length);
    			
    			reservationService.getAllTermReservations(orderService.activeReservation.id).then(function(response){
    				console.log('Rezervacija za termin: ' + response.data.length);
    				var ids = [];
    				for (var i = 0; i < response.data.length; i++) {
    					ids.push(response.data[i].tableId);
    				}
    				
    				$cookieStore.put('cookIds', ids);
    				console.log('AAAA: ' + orderService.reservedTablesIds.length);
    			});
    			
    			//samo moji stolovi 
    			var reservedTables = [];
    			
    			function containsObject(obj, reservedTablesIds) {
    					
		  				var i;
		  				for (i = 0; i < reservedTablesIds.length; i++) {
		  					console.log('Poslato: '+ obj + ' Primljeno: ' + reservedTablesIds[i]);
		  					if (angular.equals(obj, reservedTablesIds[i])) {			
		  						return true;
		  					}
		  					/*if (obj == reservedTablesIds[i]){
		  						return true;
		  					}*/
		  				}

		  				return false;
		  		}
    			
    			var kolaci = $cookieStore.get('cookIds');
    			console.log('Koliko sacuvanih ideva kolacici: ' + kolaci.length);
    			for (var i = 0; i < response.data.length; i++) {		
    				if (containsObject(response.data[i].id, kolaci)){
    					reservedTables.push(response.data[i]);
    				}
    				
    			}
    			
    			
    			console.log('Koliko rezervisanih stolova: ' + reservedTables.length);
    			/*for (var i = 0; i < $scope.tables.length; i++) {
    				
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
    		    	var text = new fabric.Text($scope.tables[i].number,{
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
    		           
    		           console.log(e);
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

    		   		  	}
    		   		  	
    		           
    		        });
    		    	
    		    	canvas.getObjects();
    		    	canvas.add(group);
    		    	canvas.selection = true;
    		        canvas.renderAll();
    		        canvas.calcOffset();
    		        
    			}*/
    		});
    	
    	
    
	
	
	
	
}]);