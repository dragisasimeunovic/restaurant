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
app.controller('registrationOffererController', ['$scope','$location', 'registrationOffererService', 'bidderService', 'loginService', function($scope,$location,registrationOffererService, bidderService, loginService){
	
	$scope.registerOfferer = function(){
		var ime = $scope.name;
		var email = $scope.email;
		var lozinka = $scope.password1;
		bidderService.addBidder(email, ime, lozinka, "bidder", loginSerive.user.restoran).then(function(response){
			//$location.path("/");
		});
		
	}
	
	
}]);


app.controller('registrationEmployedController', ['$scope','$location', 'registrationEmployedService','restaurantsService','loginService', 'menuCategoryService', function($scope,$location,registrationEmployedService,restaurantsService, loginService, menuCategoryService){
	
	
	menuCategoryService.getAllMenuCategories(loginService.user.restoran).then(function(response){
		$scope.categories = response.data;
	});
	
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
		
		
		var menuCategoryId = null;
		
		if (tip == "Cook") {
			menuCategoryId = $scope.selectedCategory.id;
		}
		else{
			menuCategoryId = null;
		}
		var restaurantId = loginService.user.restoran;
		
		registrationEmployedService.registerEmployed(ime, prezime,email,lozinka,tip,restaurantId,dateOfBirth,dressSize,footwearSize, menuCategoryId).then(function(response){
			alert(restaurantId + "ovo je id restorana");
			$scope.name = null;
			$scope.surname= null;
			$scope.email = null;
			$scope.password1 = null;
			$scope.password2 = null;
			$scope.employed = "Waiter";
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
		
		/*$scope.emailLogin = "g1@g.com";
		$scope.passwordLogin = "g1";*/
		
		/*$scope.emailLogin = "bidder2@g.com";
		$scope.passwordLogin = "b";*/
		
		/*$scope.emailLogin = "kon1@g.com";
		$scope.passwordLogin = "k";*/
		
		
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
					}
					else if(response.data.tip == "menadzer"){
						restaurantsService.getRestaurantById(loginService.user.restoran).then(function(response){
							
							restaurantsService.activeRestaurant = response.data;
							$location.path("/restaurantManager");
						});
												
					}
					else if (response.data.tip == "bidder") {
						$location.path("/bidderHome");
					}
					else if (response.data.tip == "Bartender") {
						$location.path("/bartenderHome");
					}
					else if (response.data.tip == "Waiter") {
						$location.path("/waiterHome");
					}
					else if (response.data.tip == "Cook"){
						$location.path("/cookHome");
					}
					else{
						if (response.data.activated == true){
							$location.path("/home");
						}
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
    
	$scope.editProfile = function(){
		
		$mdDialog.show({
    		controller: EditProfileController,
    		templateUrl: '/views/dialogs/editProfileGuestDialog.html',
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
			}
			
	  		$scope.apply = function(){	
	  			
	  			if ($scope.activeForm == 1) {
	  				
	  				loginService.changeAboutGuest($scope.ime, $scope.prezime, loginService.user.email).then(function(response){

					});	
	  					
	  				loginService.user.ime = $scope.ime;
					loginService.user.prezime = $scope.prezime;
					
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
    
	
$scope.editProfile = function(){
		
		$mdDialog.show({
    		controller: EditProfileController,
    		templateUrl: '/views/dialogs/editProfileGuestDialog.html',
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
			}
			
	  		$scope.apply = function(){	
	  			
	  			if ($scope.activeForm == 1) {
	  				
	  				loginService.changeAboutGuest($scope.ime, $scope.prezime, loginService.user.email).then(function(response){

					});	
	  					
	  				loginService.user.ime = $scope.ime;
					loginService.user.prezime = $scope.prezime;
					
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
	
	
}]);

app.controller('adminController',['$scope','$location','loginService', function($scope,$location, loginService){
	
	$scope.ime = loginService.user.ime;
	$scope.prezime = loginService.user.prezime;
	
	
	$scope.isMaster = false;
	
	if (loginService.user.email == "admin@g.com") {
		$scope.isMaster = true;
	}
	
	
	$scope.backToLogin = function(){
		$location.path("/");
	}
	
	$scope.addRestaurant = function(){
		$location.path("/addRestaurant");
	}
	$scope.addManager = function(){
		$location.path("/addManager");
	}
	$scope.addAdmin = function(){
		$location.path("/addAdmin");
	}
	
}]);

app.controller('managerController', ['$scope','managerService','$location', function($scope, managerService,$location) {
	
	$scope.backToLogin = function(){
		$location.path("/");
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
		 
		 
		 $scope.editMeal = function(ev, category, meal) {
			 
			 $scope.mealName = mealService.meal.mealName;
			 $scope.mealDescription = mealService.meal.mealDescription;
			 $scope.mealPrice = mealService.meal.price;
				
				mealService.activeMealCategory = category;
				mealService.meal = meal;
				
			    $mdDialog.show({
				      controller: EditMealController,
				      templateUrl: '/views/dialogs/editMealDialog.html',
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
				 
				 function EditMealController($scope, $mdDialog, mealService, menuCategoryService, $route) {
						
					 $scope.mealName = mealService.meal.mealName;
					 $scope.mealDescription = mealService.meal.mealDescription;
					 $scope.mealPrice = mealService.meal.price;
						 
						 $scope.updateMeal = function() {
						
							 
							 var mealName = $scope.mealName;
							 var mealDescription = $scope.mealDescription;
							 var mealPrice = $scope.mealPrice;
							 var mealCategoryId = mealService.activeMealCategory.id;
							 var mealID = mealService.meal.id;
							 var mealCategory = mealService.activeMealCategory;	 
						 
							 mealService.updateMeal(mealID, mealName, mealPrice, mealDescription, mealCategoryId, mealCategory).then(function(response){
								
								 
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
						 
						 var idDrinkCategory =  drinkService.drinkCategoryId;
						 var drinkName = $scope.drinkName;
						 var drinkDescription = $scope.drinkDescription;
						 var drinkPrice = $scope.drinkPrice;
						 drinkService.addDrink(idDrinkCategory, drinkName, drinkDescription, drinkPrice, drinkService.drinkCategory).then(function(response){
							
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

