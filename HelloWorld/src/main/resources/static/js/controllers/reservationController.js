app.controller('reservationController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService){
	
	$scope.currentPage = 1;
	$scope.totalItems = 50;
	
	$scope.pageLabel = function($page){
		if ($page == 1)
			return "Restaurant and reservation time"
		else if ($page == 2)
			return "Table or tables"
		else if ($page == 3)
			return "Friends"
		else if ($page == 4)
			return "Food and drinks"
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
		if (currentPage == 5){
			$scope.currentPage = 5;
		}
		else{
			$scope.currentPage++;
		}
	}
	
	restaurantsService.getAllRestaurants().then(function(response){
		$scope.restaurants = response.data;
	});
	
	
	$scope.comingDate = new Date();
	$scope.comingDateOpened = false;
	
	$scope.openComingDate = function() {
	    $scope.comingDateOpened = true;
	};
	
	
	$scope.comingTime = new Date();
	$scope.comingTime.setHours(10);
	$scope.comingTime.setMinutes(0);
	
	$scope.stayingHours = 1;
	
	$scope.comingTimeChanged = function(){

		
		var dateString = dateFilter($scope.comingDate, 'yyyy-MM-ddT');//dobar
		var timeString = dateFilter($scope.comingTime, 'HH:mm:00.000');
		var bpTime = dateString + timeString + 'Z';
		console.log(bpTime);
		var bpMoment = moment(bpTime);
		var endDate = moment(bpMoment).add($scope.stayingHours - 1, 'h').toDate();
		var endDateString = moment(endDate).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z'; 
		console.log(endDateString);
		
		//bpTime ce da se salje
		//endDateString ce da se salje
		
	}
	
	
	$scope.hstep = 1;
	$scope.mstep = 30;
	
	
	friendsService.getAllFriends(loginService.user.email).then(function(response){
		$scope.friendships = response.data;
	});
	
	$scope.prepared = true;
	
	//CANVAS Settings
	
	var canvas = new fabric.Canvas('canvas');
	
	canvas.selectionColor = 'rgba(0,255,0,0.3)';
    canvas.selectionBorderColor = 'red';
    canvas.selectionLineWidth = 1;
    
    var reservedTables = [];
	
    $scope.getAllRestaurantTables = function(){
    	drinkCategoryService.getAllDrinkCategories($scope.selectedRestaurant.id).then(function(response){
    		$scope.categories = response.data;
    	});
    	
    	if ($scope.selectedRestaurant != undefined) {
    		tableService.getAllRestaurantTables($scope.selectedRestaurant.id).then(function(response){
    			$scope.tables = response.data;
    			console.log('Koliko stolova: '+$scope.tables.length);
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
    		        
    			}
    		});
    	}
    	
    }
	
	
	
}]);