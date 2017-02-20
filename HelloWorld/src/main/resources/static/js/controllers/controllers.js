var app = angular.module('Milica',['ngRoute','ngMaterial','ngAnimate', 'ngAria','mwl.calendar','ui.bootstrap', 'ngCookies']);
app.controller('registrationController', ['$scope','$location', 'registrationService', function($scope,$location,registrationService){
	$scope.register = function(){
		var ime = $scope.name;
		var prezime = $scope.surname;
		var email = $scope.email;
		var lozinka = $scope.password1;
		registrationService.register(ime, prezime, email, lozinka).then(function(response){
			$location.path("/");
		});
	}
	
	$scope.backToLogin = function(){
		$location.path("/");
	}

}]);
app.controller('registrationManagerController', ['$scope','$location', 'registrationManagerService', 'restaurantsService', function($scope,$location,registrationManagerService,restaurantsService){
	$scope.registerManager = function(){
		//alert("Regg")
		var ime = $scope.name;
		var prezime = $scope.surname;
		var email = $scope.email;
		var lozinka = $scope.password1;
		var restoran = $scope.pickedRestaurant.id;
		registrationManagerService.registerManager(ime, prezime, email, lozinka, restoran).then(function(response){
			$location.path("/");
		});
		
	}
	
	restaurantsService.getAllRestaurants().then(function(response){
		$scope.restaurants = response.data;
	});
	
	var proba1 = [];
	var proba2 = {};
	
	
}]);
app.controller('registrationOffererController', ['$scope','$location', 'registrationOffererService', function($scope,$location,registrationOffererService){
	$scope.registerOfferer = function(){
		alert("Regg")
		var ime = $scope.name;
		var prezime = $scope.surname;
		var email = $scope.email;
		var lozinka = $scope.password1;
		registrationOffererService.registerOfferer(ime, prezime, email, lozinka).then(function(response){
			//$location.path("/");
		});
		
	}
	
	
}]);


app.controller('registrationEmployedController', ['$scope','$location', 'registrationEmployedService','restaurantsService', function($scope,$location,registrationEmployedService,restaurantsService){
	
	$scope.employed = "Waiter" ;
	
	$scope.registerEmployed = function(){
		alert("ReggEmployed")
		var ime = $scope.name;
		var prezime = $scope.surname;
		var email = $scope.email;
		var lozinka = $scope.password1;
		var tip = $scope.employed; 
		alert("korisnik je" + tip);
		
		var dateOfBirth = $scope.dateOfBirth;
		var dressSize = $scope.dressSize;
		var footwearSize = $scope.footwearSize;
		
		
		var restaurantId = restaurantsService.activeRestaurant.id;
		
		registrationEmployedService.registerEmployed(ime, prezime,email,lozinka,tip,restaurantId,dateOfBirth,dressSize,footwearSize).then(function(response){
			alert(restaurantId + "ovo je id restorana");
			$scope.name = null;
			$scope.surname= null;
			$scope.email = null;
			$scope.password1 = null;
			$scope.password2 = null;
			$scope.employed = "Waiter" ;
			$scope.dateOfBirth = null;
			$scope.dressSize = null;
			$scope.footwearSize = null;
			//$location.path("/managerHome/addEmployed");
		});
		
	}

}]);


app.controller('registrationRestaurantController', ['$scope','$location', 'registrationRestaurantService','menuService','drinkCardService', function($scope,$location,registrationRestaurantService,menuService,drinkCardService){
	$scope.registerRestaurant = function(){
		var ime = $scope.name;
		var tip = $scope.type;
		registrationRestaurantService.registerRestaurant(ime,tip).then(function(response){
			$location.path("/admin");
			menuService.addMenu(response.data.id).then(function(response){
				alert("Dodala sam ovo");
			});
			
			drinkCardService.addDrinkCard(response.data.id).then(function(response){
				
				alert("Ajdee");
			});
		});
		
	}
	
	
}]);






app.controller('LoginController',['$scope', 'loginService','$location', 'restaurantsService', function($scope, loginService, $location, restaurantsService){
	$scope.login = function(){
		
		/*$scope.emailLogin = "dragi@g.com";
		$scope.passwordLogin = "dragi";*/
		
	/*	$scope.emailLogin = "g1@g.com";
		$scope.passwordLogin = "g1";*/
		
		
		var email = $scope.emailLogin;
		var lozinka = $scope.passwordLogin;
		loginService.login(email).then(function(response){
			if(response.data == ''){
				
			}else{
				if(response.data.lozinka == lozinka){
					alert('Poklapa se');
					loginService.user = response.data;
					if(response.data.tip == "admin"){
						$location.path("/admin");
					}else if(response.data.tip =="menadzer"){
						restaurantsService.getRestaurantById(loginService.user.restoran).then(function(response){
							
							restaurantsService.activeRestaurant = response.data;
							$location.path("/restaurantManager");
						});
												
					}
					else{
						$location.path("/home");
					}
					
				}else{
					$scope.passwordLogin=null;
				}
			}
			
		}, function(error){
			alert(error.data);
		});
		
	}
	
	$scope.register = function(){
		$location.path("/register");
	}
		
}]);

app.controller('profileController',['$scope', 'loginService','registrationService','$mdDialog', function($scope, loginService,registrationService, $mdDialog){
	
	
	//$scope.email = loginService.user.email;
	var lozinka1 = loginService.user.lozinka;
	$scope.ime = loginService.user.ime;
	$scope.prezime = loginService.user.prezime;
	
	
	$scope.customFullscreen = false;
    
	 $scope.showDialog = function(ev) {
		    $mdDialog.show({
		      controller: GuestDialogController,
		      templateUrl: '/views/dialogs/guestUpdateDialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		      $scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.status = 'You cancelled the dialog.';
		    });
		  };
		  
		  function GuestDialogController($scope,loginService,registrationService, $mdDialog) {
			  
			  $scope.imeDialog = loginService.user.ime;
			  $scope.prezimeDialog = loginService.user.prezime;
			  
			  $scope.enableOrDisable = true;
			  $scope.aboutDiv = true;
			  
			  $scope.changePasswordDiv = false;
			  $scope.changePasswordButtonDiv = true;
			  
			  $scope.showChangePasswordDiv = function(){
				  
				  $scope.changePasswordDiv = true;
				  $scope.changePasswordButtonDiv = false;
				  $scope.aboutDiv = false;
			  } 
			  
			  $scope.applyAboutDiv = function(){
				  
				  var newName = $scope.imeDialog;
				  var newSurname = $scope.prezimeDialog;
				  var email = loginService.user.email;
				  var password = loginService.user.lozinka;
				  registrationService.register(newName,newSurname,email,password).then(function(response){
					  $mdDialog.hide();
					  loginService.user.ime = newName;
					  loginService.user.prezime = newSurname;
				  });
				  
			  }
			  
			  $scope.closePasswordDiv = function(){
				  $scope.aboutDiv= true;
				  $scope.changePasswordDiv = false;
				  $scope.changePasswordButtonDiv = true;  
			  }
			  
			  $scope.change = function(){
				  if($scope.lozinka1 == loginService.user.lozinka){
					  if($scope.lozinka2 == $scope.lozinka3){
						  $scope.enableOrDisable = false;
					  }else
					  	{
						  $scope.enableOrDisable = true;
					  	}
				  }else{
					  $scope.enableOrDisable = true;
				  }
			  }
			  
			  
			  $scope.applyPasswordChangeDiv = function(){
				  var newPassword = $scope.lozinka2;
				  var name = loginService.user.ime;	  
				  var surname = loginService.user.prezime;
				  var email = loginService.user.email;
				  registrationService.register(name,surname,email,newPassword).then(function(response){
					  loginService.user.lozinka = newPassword;
					  $scope.aboutDiv= true;
					  $scope.changePasswordDiv = false;
					  $scope.changePasswordButtonDiv = true;  
				  });
				  
			  }
			  
			  $scope.hide = function() {
			      $mdDialog.hide();
			    };

			    $scope.cancel = function() {
			      $mdDialog.cancel();
			    };

			    $scope.answer = function(answer) {
			      $mdDialog.hide(answer);
			    };
			  }
}]);


app.controller('profileGuestController',['$scope', 'loginService','registrationService','$mdDialog', 'guestService', 'friendRequestService', 'friendsService', '$route', 'restaurantsService', 'reservationService', 'orderService', '$location', function($scope, loginService,registrationService, $mdDialog, guestService, friendRequestService, friendsService, $route, restaurantsService, reservationService, orderService, $location){
	
	
	$scope.goToRestaurantOrder = function(reservation){
		orderService.activeReservation = reservation;
		$location.path("/orderRestaurant");
		
	}
	
	var currentDateAndTime = new Date();
	var curDateString = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
	
	$scope.cancelReservation = function(reservationId, comingDateString){
		
		var cdMoment = moment(comingDateString);
		var comingDate = moment(cdMoment).subtract(90, 'm').toDate();
		var comingDateFormatted = moment(comingDate).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
		
		var currentDateAndTime = new Date();
		var curDateString = moment(currentDateAndTime).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
		
		if (curDateString > comingDateFormatted) {
			alert('Unable to delete!');
		}
		else {	
			reservationService.cancelReservation(reservationId).then(function(response){
				$route.reload();
			});
		}
	}
	
	reservationService.getReservationByGuestIdAndComingTime(loginService.user.email, curDateString).then(function(response){
		
		
		$scope.reservations = response.data;
		
	});
	
	guestService.getAllGuestsExceptActiveUser(loginService.user.email).then(function(response){
		$scope.guests = response.data;
	});
	
	$scope.sortByNameAtoZ = function() {
		guestService.orderGuestsByNameAtoZ(loginService.user.email).then(function(response){
			$scope.guests = response.data;
		});
	}
	
	$scope.sortByNameZtoA = function() {
		guestService.orderGuestsByNameZtoA(loginService.user.email).then(function(response){
			$scope.guests = response.data;
		});
	}
	
	$scope.deleteFriendRequest = function(requestId){
		friendRequestService.deleteRequest(requestId).then(function(response){
			$route.reload();
		});
	}
	
	
	$scope.sendFriendRequest = function(userRecieverEmail){
		
		friendsService.getFriendship(loginService.user.email, userRecieverEmail).then(function(response){
			
			if (response.data.length != 0) {
				
				alert('You are already friends!');
				
			}
			else {
				
				friendRequestService.getRequest(loginService.user.email, userRecieverEmail).then(function(response){
					console.log(response);
					if (response.data == "") {
						friendRequestService.sendRequest(loginService.user, userRecieverEmail).then(function(response){
							$route.reload();
						});
					}
					else {
						alert('Request already sent');
						
					}
				});
				
				
			}
			
		});
		
		
	}
	
	friendRequestService.getAllRequests(loginService.user.email).then(function(response){
		$scope.requests = response.data;
	});
	
	$scope.acceptFriendRequest = function(userSender){
		friendsService.sendFS(loginService.user.email, userSender).then(function(response){
			alert('Prihvacen zahtev!');
			$route.reload();
		});
	}
	
	
	$scope.search = function() {
		if ($scope.searchName != null && $scope.searchSurname != null) {
			guestService.searchByNameAndSurname($scope.searchName, $scope.searchSurname, loginService.user.email).then(function(response){
				$scope.guests = response.data;
			});
		}
		else {
			
		}
	};
	
	//$scope.email = loginService.user.email;
	var lozinka1 = loginService.user.lozinka;
	$scope.ime = loginService.user.ime;
	$scope.prezime = loginService.user.prezime;
	
	
	$scope.customFullscreen = false;
    
	 $scope.showDialog = function(ev) {
		    $mdDialog.show({
		      controller: GuestDialogController,
		      templateUrl: '/views/dialogs/guestUpdateDialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		      $scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.status = 'You cancelled the dialog.';
		    });
		  };
		  
		  function GuestDialogController($scope,loginService,registrationService, $mdDialog) {
			  
			  $scope.imeDialog = loginService.user.ime;
			  $scope.prezimeDialog = loginService.user.prezime;
			  
			  $scope.enableOrDisable = true;
			  $scope.aboutDiv = true;
			  
			  $scope.changePasswordDiv = false;
			  $scope.changePasswordButtonDiv = true;
			  
			  $scope.showChangePasswordDiv = function(){
				  
				  $scope.changePasswordDiv = true;
				  $scope.changePasswordButtonDiv = false;
				  $scope.aboutDiv = false;
			  } 
			  
			  $scope.applyAboutDiv = function(){
				  
				  var newName = $scope.imeDialog;
				  var newSurname = $scope.prezimeDialog;
				  var email = loginService.user.email;
				  var password = loginService.user.lozinka;
				  registrationService.register(newName,newSurname,email,password).then(function(response){
					  $mdDialog.hide();
					  loginService.user.ime = newName;
					  loginService.user.prezime = newSurname;
				  });
				  
			  }
			  
			  $scope.closePasswordDiv = function(){
				  $scope.aboutDiv= true;
				  $scope.changePasswordDiv = false;
				  $scope.changePasswordButtonDiv = true;  
			  }
			  
			  $scope.change = function(){
				  if($scope.lozinka1 == loginService.user.lozinka){
					  if($scope.lozinka2 == $scope.lozinka3){
						  $scope.enableOrDisable = false;
					  }else
					  	{
						  $scope.enableOrDisable = true;
					  	}
				  }else{
					  $scope.enableOrDisable = true;
				  }
			  }
			  
			  
			  $scope.applyPasswordChangeDiv = function(){
				  var newPassword = $scope.lozinka2;
				  var name = loginService.user.ime;	  
				  var surname = loginService.user.prezime;
				  var email = loginService.user.email;
				  registrationService.register(name,surname,email,newPassword).then(function(response){
					  loginService.user.lozinka = newPassword;
					  $scope.aboutDiv= true;
					  $scope.changePasswordDiv = false;
					  $scope.changePasswordButtonDiv = true;  
				  });
				  
			  }
			  
			  $scope.hide = function() {
			      $mdDialog.hide();
			    };

			    $scope.cancel = function() {
			      $mdDialog.cancel();
			    };

			    $scope.answer = function(answer) {
			      $mdDialog.hide(answer);
			    };
			  }
}]);

app.controller('adminController',['$scope','$location', function($scope,$location){
	
	$scope.addRestaurant = function(){
		$location.path("/addRestaurant");
	}
	$scope.addManager = function(){
		$location.path("/addManager");
	}
}]);

app.controller('managerController', ['$scope','managerService','$location', function($scope, managerService,$location) {
	
	$scope.backToLogin = function(){
		$location.path("/");
	}
	
}]);

app.controller('RestaurantController', ['$scope','restaurantsService','$location','$mdDialog','registrationRestaurantService','$route','$window','tableService', function($scope, restaurantsService,$location,$mdDialog, registrationRestaurantService, $route, $window, tableService) {
		
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

app.controller('managerRestaurantsController',['$scope','restaurantsService', 'managerService','$location','$mdDialog','menuService','menuCategoryService','loginService', function($scope,restaurantsService, managerService,$location, $mdDialog, menuService,menuCategoryService,loginService){
	
	
    $scope.isOpen = false;
	
	$scope.restaurantAboutDiv = false;
	restaurantsService.getRestaurantById(loginService.user.restoran).then(function(response){
					
		restaurantsService.activeRestaurant = response.data;
	});
	
	$scope.goToRestaurant = function(restaurant, ev){
		$location.path("/restaurantManager");
		restaurantsService.activeRestaurant = restaurant;
		
		menuService.getMenuByRestaurantId(restaurant.id).then(function(response){
			alert(response.data.id);
		});
	}
	
}]);

app.controller('guestRestaurantsController',['$scope','restaurantsService', 'managerService','$location','$mdDialog','menuService','menuCategoryService','loginService','orderByFilter', function($scope,restaurantsService, managerService,$location, $mdDialog, menuService,menuCategoryService,loginService, orderBy){
	
	
	  /*  $scope.isOpen = false;
		
		$scope.restaurantAboutDiv = false;
		restaurantsService.getRestaurantById(loginService.user.restoran).then(function(response){
						
			restaurantsService.activeRestaurant = response.data;
		});*/
		
		restaurantsService.getAllRestaurants().then(function(response){
			$scope.restaurants = response.data;
		});
		
		$scope.sort = function() {
			if ($scope.sortByNameChecked == true && $scope.sortByTypeChecked == true){
				$scope.friendships = orderBy($scope.friendships, ['ime','tip']);
			}
			else if($scope.sortByNameChecked == true) {
				$scope.friendships = orderBy($scope.friendships, 'ime');
			}
			else if ($scope.sortByTypeChecked == true) {
				$scope.friendships = orderBy($scope.friendships, 'tip');
			}
		 };
		
		$scope.goToRestaurant = function(restaurant, ev){
			$location.path("/restaurantManager");
			restaurantsService.activeRestaurant = restaurant;
			
			menuService.getMenuByRestaurantId(restaurant.id).then(function(response){
				alert(response.data.id);
			});
		}
		
}]);


app.controller('guestController', ['$scope','managerService','$location', function($scope, managerService,$location) {
	
	$scope.backToLogin = function(){
		$location.path("/");
	}
	
}]);

app.controller('menuController',['$scope','restaurantsService', 'managerService','$location','$mdDialog','menuService','menuCategoryService', 'mealService','$route', function($scope,restaurantsService, managerService,$location, $mdDialog, menuService,menuCategoryService, mealService, $route){

	menuCategoryService.getAllMenuCategories(restaurantsService.activeRestaurant.id).then(function(response){
		$scope.categories = response.data;
	});
	
	$scope.refresh = function() {
		
		$route.reload();
	
		/*$scope.meals = [];
		
		menuCategoryService.getAllMenuCategories(restaurantsService.activeRestaurant.id).then(function(response){
			$scope.categories = response.data;
			//TODO: Ovo sve radi, ovo dole je problem
			alert('Dodjem do poziva f-je');
			mealService.getAllCategoryMeals($scope.categories[0].id).then(function(response){
				$scope.meals = response.data;
			
			});
			
			for(var i = 0; i < $scope.categories.length; i++) {
				mealService.getAllCategoryMeals($scope.categories[i].id).then(function(response){
					$scope.meals.push(response.data);
					console.log(response.data);
				});
				
			}
			
			for(var i = 0; i < $scope.meals.length; i++) {
				alert("ulazim u i");
				for(var j = 0; j < $scope.meals[i].length; j++) {
					alert($scope.meals[i][j]);
				}
			}
			
		});*/
	};
	
	$scope.getMeals = function(categoryId) {
		
		alert("Get meals kategorije: " + categoryId);
		mealService.getAllCategoryMeals(categoryId).then(function(response){
			$scope.meals = response.data;
		});
		
		
	}
	
	
	
	//deo za dialog
	$scope.addMenuCategoryDialog = function(ev) {
	    $mdDialog.show({
	      controller: AddMenuCategoryController,
	      templateUrl: '/views/dialogs/addMenuCategoryDialog.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: false // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      
	    }, function() {
	     
	    });
	 };
	 
	 function AddMenuCategoryController($scope, $mdDialog,menuCategoryService, $route) {
		//TODO: Kreirati upit koji ce pomocu id restorana koji se selektujete naci odgovarajuci meni za njega
		//TODO: Onda napraviti servis, controller,... za dodavanje kategorije u pronadjeni meni
	
		 $scope.addMenuCategory = function(){
			 var categoryName = $scope.categoryName;
			 menuCategoryService.addMenuCategory(restaurantsService.activeRestaurant.id,categoryName).then(function(response){
			
				 $mdDialog.hide();
				 $route.reload();
			 });
		 }
		 
		 $scope.closeDialog = function() {
			 $mdDialog.cancel();
		 }
		 
	 }
	 
	 	var categoryId = {};
	//deo za dialog
	 	//////////////////////////////////////////////////////////////////////////
		$scope.addMeal = function(catId) {
		    $mdDialog.show({
		      controller: AddMealController,
		      templateUrl: '/views/dialogs/addMealDialog.html',
		      parent: angular.element(document.body),
		      clickOutsideToClose:true,
		      fullscreen: false // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		      
		    }, function() {
		     
		    });
		    
		    mealService.categoryId = catId;
		 };
		 
		 function AddMealController($scope, $mdDialog,mealService, $route) {
			//TODO: Kreirati upit koji ce pomocu id restorana koji se selektujete naci odgovarajuci meni za njega
			//TODO: Onda napraviti servis, controller,... za dodavanje kategorije u pronadjeni meni
		
			 $scope.addMeal = function(){
				 alert(mealService.categoryId);
				 
				 var categoryID =  mealService.categoryId;
				 var mealName = $scope.mealName;
				 var mealDescription = $scope.mealDescription;
				 var mealPrice = $scope.mealPrice;
				 mealService.addMeal(categoryID, mealName, mealDescription, mealPrice).then(function(response){
					
					 alert('Dodato jelo sa cenom: ' + response.data.price);
					 $mdDialog.hide();
					 $route.reload();
					 
				 });
			 }
			 
			 $scope.closeDialog = function() {
				 $mdDialog.cancel();
			 }
			 
		 }
		 
	
	
}]);


app.controller('drinkCardController',['$scope','$mdDialog','drinkCategoryService','restaurantsService','drinkService','$route',function($scope,$mdDialog,drinkCategoryService,restaurantsService,drinkService,$route){
	//alert(restaurantsService.activeRestaurant.id);
	drinkCategoryService.getAllDrinkCategories(restaurantsService.activeRestaurant.id).then(function(response){
		$scope.categories = response.data;
		alert("Pica ima: " + response.data.drinks.length + " !!!!!!!!!!");
	});
	
	//dijalog za dodavanje kategorije pica
	
	$scope.addDrinkCardCategoryDialog = function(ev) {
	    $mdDialog.show({
		      controller: AddDrinkCategoryController,
		      templateUrl: '/views/dialogs/AddDrinkCategoryDialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: false // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		      
		    }, function() {
		     
		    });
		 };
		 
		 function AddDrinkCategoryController($scope, $mdDialog, $route) {

			
				 $scope.addDrinkCategory = function(){
					 var categoryName = $scope.categoryName;
					 drinkCategoryService.addDrinkCategory(restaurantsService.activeRestaurant.id,categoryName).then(function(response){
					
						 $mdDialog.hide();
						 $route.reload();
						 
					 });
				 }
				 
				 $scope.closeDialog = function() {
					 $mdDialog.cancel();
				 }
				 
		 }
		 
	var drinkCategoryId = {};
		 
	//dijalog za dodavanje pica u kategoriju
	
	$scope.editDrink = function(ev, category, drink) {
		
		drinkService.activeDrinkCategory = category;
		drinkService.drink = drink;
		
	    $mdDialog.show({
		      controller: EditDrinkController,
		      templateUrl: '/views/dialogs/editDrinkDialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		    /*  scope: $scope,//?
		      preserveScope: true,*/
		      clickOutsideToClose:true,
		      fullscreen: false // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		      
		    }, function() {
		     
		    });
		 };
		 
		 function EditDrinkController($scope, $mdDialog, drinkService, drinkCategoryService, $route) {
				
			 $scope.drinkName = drinkService.drink.drinkName;
			 $scope.drinkDescription = drinkService.drink.drinkDescription;
			 $scope.drinkPrice = drinkService.drink.price;
			 $scope.editDrink= function(){
				 var drinkName = $scope.drinkName;
				 var drinkDescription = $scope.drinkDescription;
				 var drinkPrice = $scope.drinkPrice;
				 var drinkCategoryId = drinkService.activeDrinkCategory.id;
				 var drinkID = drinkService.drink.id;
				 var drinkCategory = drinkService.activeDrinkCategory;
				 
				 drinkService.updateDrink(drinkID, drinkName, drinkPrice, drinkDescription, drinkCategoryId, drinkCategory).then(function(response){
				
					 $mdDialog.hide();
					 $route.reload();
					 //refreshovanje kategorija i pica samim tim
					 drinkCategoryService.getAllDrinkCategories(restaurantsService.activeRestaurant.id).then(function(response){
						$scope.categories = response.data;	
					});
					 
				 });
			 }
			 
			 $scope.closeDialog = function() {
				 $mdDialog.cancel();
			 }
			 
	 }
		 
	
	$scope.addDrink = function(category) {
			    $mdDialog.show({
			      controller: AddDrinkController,
			      templateUrl: '/views/dialogs/addDrinkDialog.html',
			      parent: angular.element(document.body),
			      clickOutsideToClose:true,
			      fullscreen: false // Only for -xs, -sm breakpoints.
			    })
			    .then(function(answer) {
			      
			    }, function() {
			     
			    });
			    
			    drinkService.drinkCategoryId = category.id;
			    drinkService.drinkCategory = category;
			 };
			 
			 function AddDrinkController($scope, $mdDialog,drinkService, $route) {
				
				
					 $scope.addDrink = function(){
						 alert(drinkService.drinkCategoryId + " kategorija pica " );
						 
						 var idDrinkCategory =  drinkService.drinkCategoryId;
						 var drinkName = $scope.drinkName;
						 var drinkDescription = $scope.drinkDescription;
						 var drinkPrice = $scope.drinkPrice;
						 drinkService.addDrink(idDrinkCategory, drinkName, drinkDescription, drinkPrice, drinkService.drinkCategory).then(function(response){
							
							 alert('Dodato pice sa cenom: ' + response.data.price);
							 $mdDialog.hide();
							 $route.reload();
							 
						 });
					 }

					 $scope.closeDialog = function() {
						 $mdDialog.cancel();
					 }
					 
			 }
		 

}]);

/*app.run(){
	var windowElement = angular.element($window);
	windowElement.on('onbeforeunload', function (event) {
		alert('idemo');
		event.preventDefault();
	});
};*/

