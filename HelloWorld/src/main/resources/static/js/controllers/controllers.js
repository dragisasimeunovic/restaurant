var app = angular.module('Milica',['ngRoute','ngMaterial','ngAnimate', 'ngAria']);
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
	
	
}]);
app.controller('registrationManagerController', ['$scope','$location', 'registrationManagerService', function($scope,$location,registrationManagerService){
	$scope.registerManager = function(){
		alert("Regg")
		var ime = $scope.name;
		var prezime = $scope.surname;
		var email = $scope.email;
		var lozinka = $scope.password1;
		registrationManagerService.registerManager(ime, prezime, email, lozinka).then(function(response){
			$location.path("/");
		});
		
	}
	
	
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


app.controller('registrationEmployedController', ['$scope','$location', 'registrationEmployedService', function($scope,$location,registrationEmployedService){
	
	$scope.employed = "Waiter" ;
	
	$scope.registerEmployed = function(){
		alert("ReggEmployed")
		var ime = $scope.name;
		var prezime = $scope.surname;
		var email = $scope.email;
		var lozinka = $scope.password1;
		var tip = $scope.employed;
		alert("korisnik je" + tip);
		registrationEmployedService.registerEmployed(ime, prezime,email,lozinka,tip).then(function(response){
			$scope.name = null;
			$scope.surname= null;
			$scope.email = null;
			$scope.password1 = null;
			$scope.password2 = null;
			$scope.employed = "Waiter" ;
			//$location.path("/managerHome/addEmployed");
		});
		
	}

}]);


app.controller('registrationRestaurantController', ['$scope','$location', 'registrationRestaurantService', function($scope,$location,registrationRestaurantService){
	alert("ReggRest")
	$scope.registerRestaurant = function(){
		alert("ReggRest")
		var ime = $scope.name;
		var tip = $scope.type;
		registrationRestaurantService.registerRestaurant(ime,tip).then(function(response){
			$location.path("/admin");
		});
		
	}
	
	
}]);




app.controller('LoginController',['$scope', 'loginService','$location', function($scope, loginService, $location){
	$scope.login = function(){
		
		$scope.emailLogin = "men1@g.com";
		$scope.passwordLogin = "m";
		
		
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
						$location.path("/managerHome");						
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

app.controller('adminController',['$scope','$location', function($scope,$location){
	
	$scope.addRestaurant = function(){
		$location.path("/addRestaurant");
	}
	$scope.addManager = function(){
		$location.path("/addManager");
	}
}]);

app.controller('managerController', ['$scope','managerService', function($scope, managerService) {
	
	//managerService.isListActive = true;
	
}])

app.controller('managerRestaurantsController',['$scope','restaurantsService', 'managerService','$location', function($scope,restaurantsService, managerService,$location){
	
	$scope.restaurantsListDiv = managerService.isListActive ; //on je sad true na samom pocetku
    
	
	$scope.restaurantAboutDiv = false;
	restaurantsService.getAllRestaurants().then(function(response){
		managerService.restaurants = response.data;
		$scope.restaurants = managerService.restaurants;
	});
	
	$scope.goToRestaurant = function(restaurant, ev){
		$scope.restaurantAboutDiv = true;
		//$scope.restaurantsListDiv = false;
		$scope.$watch('managerService.isListActive', function() {
			managerService.isListActive = false;
		});
		$scope.ime = restaurant.ime;
		$scope.tip = restaurant.tip;
		
	}
	
	$scope.doEdit = function (ev){
		$location.path("/restaurantManager");
	}
	
}]);


app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/login.html"
    })
    .when("/home", {
        templateUrl : "views/home.html"
    })
    .when("/proba", {
        templateUrl : "views/login.html"
    })
    .when("/register", {
        templateUrl : "views/registration.html"
    })
    .when("/restaurants", {
        templateUrl : "views/restaurants.html"
    })
    .when("/friends", {
        templateUrl : "views/friends.html"
    })
    .when("/aboutMe", {
        templateUrl : "views/profile.html"
    })
    .when("/admin", {
        templateUrl : "views/admin.html"
    })
    .when("/addRestaurant", {
        templateUrl : "views/addRestaurant.html"
    })
    .when("/addManager", {
        templateUrl : "views/addManager.html"
    })
    .when("/managerHome", {
        templateUrl : "views/managerHome.html"
    })
    .when("/restaurantManager", {
        templateUrl : "views/restaurantManager.html"
    })
    .when("/managerHome/addEmployed", {
        templateUrl : "views/managerHome/addEmployed.html"
    });
    
   
});