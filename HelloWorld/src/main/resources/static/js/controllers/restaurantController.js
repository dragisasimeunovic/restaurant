app.controller('RestaurantController', ['$scope','restaurantsService','$location','$mdDialog','registrationRestaurantService','$route','$window','tableService', function($scope, restaurantsService,$location,$mdDialog, registrationRestaurantService, $route, $window, tableService) {
	
	
	$scope.goToGroceries = function(){
		$location.path("/groceries");
	}
	
	var counter = 1;
	var canvas = new fabric.Canvas('canvas');
	/*window.canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
	window.canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 200, left: 100 }));*/
    
	//--------------------------------Add inside Tablee---------------------------------
	
	
	$('#addInsideTable').click(function(){
    	var table = new fabric.Circle({ radius: 30, fill: 'red', originX: 'center', originY: 'center'});
    	var text = new fabric.Text((counter++)+"",{
    		fontFamily: 'Calibri',
    		fontSize: 25,
    		fill: 'white',
    		originX: 'center',
            originY: 'center'
    	});
    	
    	var group = new fabric.Group([table, text],{
    		top: 200, left: 150
    	});
    	
    	canvas.getObjects();
    	canvas.add(group);
    	canvas.selection = true;
        canvas.renderAll();
        canvas.calcOffset();
        
        
    	
    });
	
	//--------------------------------Add non smoking area Table---------------------------------
	
	$('#addNonSmokingTable').click(function(){
    	var table = new fabric.Circle({ radius: 30, fill: 'purple', originX: 'center', originY: 'center'});
    	var text = new fabric.Text((counter++)+"",{
    		fontFamily: 'Calibri',
    		fontSize: 25,
    		fill: 'white',
    		originX: 'center',
            originY: 'center'
    	});
    	
    	var group = new fabric.Group([table, text],{
    		top: 200, left: 150
    	});
    	
    	canvas.getObjects();
    	canvas.add(group);
    	canvas.selection = true;
        canvas.renderAll();
        canvas.calcOffset();
        
        
    	
    });
	
	//--------------------------------Add Garden Closed Tablee---------------------------------
	
	$('#addGardenClosed').click(function(){
    	var table = new fabric.Circle({ radius: 30, fill: 'yellow', originX: 'center', originY: 'center'});
    	var text = new fabric.Text((counter++)+"",{
    		fontFamily: 'Calibri',
    		fontSize: 25,
    		fill: 'white',
    		originX: 'center',
            originY: 'center'
    	});
    	
    	var group = new fabric.Group([table, text],{
    		top: 200, left: 150
    	});
    	
    	canvas.getObjects();
    	canvas.add(group);
    	canvas.selection = true;
        canvas.renderAll();
        canvas.calcOffset();
        
        
    	
    });
	
	//--------------------------------Add Garden Opened Tablee---------------------------------
	
	$('#addGardenOpened').click(function(){
    	var table = new fabric.Circle({ radius: 30, fill: 'green', originX: 'center', originY: 'center'});
    	var text = new fabric.Text((counter++)+"",{
    		fontFamily: 'Calibri',
    		fontSize: 25,
    		fill: 'white',
    		originX: 'center',
            originY: 'center'
    	});
    	
    	var group = new fabric.Group([table, text],{
    		top: 200, left: 150
    	});
    	
    	canvas.getObjects();
    	canvas.add(group);
    	canvas.selection = true;
        canvas.renderAll();
        canvas.calcOffset();
        
        
    	
    });
	
	
	$('#saveConfig').click(function(){
		var number = {};
		var positionLeft = {};
		var positionTop = {};
		var reon = {};
		for (var i = 0; i < canvas.getObjects().length; i++){
			if(canvas.getObjects()[i].get('left') != 150) {
				
				positionLeft = canvas.getObjects()[i].get('left');
				positionTop = canvas.getObjects()[i].get('top');
				number = canvas.getObjects()[i].item(1).get('text');
				
				if (canvas.getObjects()[i].item(0).get('fill') == 'red'){
					reon = 'inside';
				}
				else if (canvas.getObjects()[i].item(0).get('fill') == 'purple'){
					reon = 'nonsmoking';
				}
				else if (canvas.getObjects()[i].item(0).get('fill') == 'yellow') {
					reon = 'gardenclosed';
				}
				else if (canvas.getObjects()[i].item(0).get('fill') == 'green') {
					reon = 'gardenopened';
				}
				
				tableService.addTable(number, restaurantsService.activeRestaurant.id, reon, restaurantsService.activeRestaurant, positionLeft, positionTop).then(function(response){	
					
				});
				
			}
		}
		
		
		
		
    });
	
	/*$scope.addTable = function(){
    	var table = new fabric.Circle({ radius: 30, fill: '#f55', top: 200, left: 150})
    	canvas.getObjects();
    	canvas.add(table);
    	canvas.selection = true;
        canvas.renderAll();
        canvas.calcOffset();
    	
    };*/

	canvas.selectionColor = 'rgba(0,255,0,0.3)';
    canvas.selectionBorderColor = 'red';
    canvas.selectionLineWidth = 1;
	
	$scope.ime = restaurantsService.activeRestaurant.ime;
	$scope.tip = restaurantsService.activeRestaurant.tip;
	
	$scope.ocena = restaurantsService.activeRestaurant.ocena;
	
	$scope.goToSchedule = function(){
		$location.path("/schedule");
	}
	
	$scope.goToMenu = function() {
		$location.path("/menu");
	}
	
	$scope.goToDrinkCard = function(){
		$location.path("/drinkCard");
	}
	
	$scope.AddEmployed = function(){
		$location.path("/addEmployed");
	}
	
	 $scope.showDialog = function(ev) {
		    $mdDialog.show({
		      controller: RestaurantDialogController,
		      templateUrl: '/views/dialogs/restaurantUpdateDialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
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
		  };
		  
		  function RestaurantDialogController($scope,restaurantsService,registrationRestaurantService, $mdDialog) {
			  
			  $scope.nameDialog = restaurantsService.activeRestaurant.ime;
			  $scope.typeDialog = restaurantsService.activeRestaurant.tip;
	 
			  $scope.apply = function(){
				  var newName = $scope.nameDialog;
				  var newType = $scope.typeDialog;
				  var id = restaurantsService.activeRestaurant.id;
				  var ocena = restaurantsService.activeRestaurant.ocena;
				  
				  registrationRestaurantService.registerRestaurant(newName,newType,id, ocena).then(function(response){
					  $mdDialog.hide();
					  restaurantsService.activeRestaurant.ime = newName;
					  restaurantsService.activeRestaurant.tip = newType;
					  $scope.ime = restaurantsService.activeRestaurant.ime;
					  $scope.tip =  restaurantsService.activeRestaurant.tip;
					  
				  });
				  
			  }
			  
			  $scope.close = function() {
			      $mdDialog.cancel();
			    };

			  }
		  
	
}]);