angular.module('Milica').factory('registrationService' , function registrationService($http){
	
	
	registrationService.register = function(name,surname, email,password){
		return $http({
			method: 'POST',
			url: 'api/korisnici/korisnik',
			data: {
				/*"id" : null,*/
				"email" : email,
				"ime" : name,
				"prezime" : surname,
				"lozinka" : password,
				"tip" : "gost"
			}
			
		});
		
	}
	return registrationService;
});

angular.module('Milica').factory('restaurantsService' , function restaurantsService($http){
	
	restaurantsService.getAllRestaurants = function(){
		
		return $http ({
			method: 'GET',
			url: 'api/restorani/sviRestorani'
			
		});
	}
	
	var activeRestaurant = {};
	
	return restaurantsService;
	
});

angular.module('Milica').factory('korisnikService', function korisnikService($http) {
	
	korisnikService.gettAllKorisnik = function(){
		return $http({
			method: 'GET',
			url: 'api/korisnici/sviKorisnici'
		});
	}
	return korisnikService;
})



angular.module('Milica').factory('registrationManagerService' , function registrationManagerService($http){
	
	
	registrationManagerService.registerManager = function(name,surname, email,password){
		return $http({
			method: 'POST',
			url: 'api/korisnici/korisnik',
			data: {
				/*"id" : null,*/
				"email" : email,
				"ime" : name,
				"prezime" : surname,
				"lozinka" : password,
				"tip" : "menadzer"
			}
			
		});
	}
	return registrationManagerService;
});

angular.module('Milica').factory('registrationOffererService' , function registrationOffererService($http){
	
	
	registrationOffererService.registerOfferer = function(name,surname, email,password){
		return $http({
			method: 'POST',
			url: 'api/korisnici/korisnik',
			data: {
				/*"id" : null,*/
				"email" : email,
				"ime" : name,
				"prezime" : surname,
				"lozinka" : password,
				"tip" : "ponudjac"
			}
			
		});
	}
	return registrationOffererService;
});

angular.module('Milica').factory('registrationEmployedService' , function registrationEmployedService($http){
	
	
	registrationEmployedService.registerEmployed = function(name,surname, email,password, type){
		return $http({
			method: 'POST',
			url: 'api/korisnici/korisnik',
			data: {
				/*"id" : null,*/
				"email" : email,
				"ime" : name,
				"prezime" : surname,
				"lozinka" : password,
				"tip" : type
			}
			
		});
	}
	return registrationEmployedService;
});

angular.module('Milica').factory('registrationRestaurantService' , function registrationRestaurantService($http){
	
	
	registrationRestaurantService.registerRestaurant = function(name,type){
		return $http({
			method: 'POST',
			url: 'api/restorani/restoran',
			data: {
				"id" : null,
				"ime" : name,
				"tip" : type
			}
			
		});
		
	}
	return registrationRestaurantService;
});

angular.module('Milica').factory('loginService' , function loginService($http){
	
	loginService.login = function(email){
		return $http({
			method: 'GET',
			url: 'api/korisnici/' + email 
		    
		});
		
	}
	
	var user = {};
	
	return loginService;
	
});

angular.module('Milica').factory('managerService', function managerService($http){
	
	managerService.isListActive = true;
	
	var restaurants = [];
	
	return managerService;
	
});

angular.module('Milica').factory('menuService' , function menuService($http){
	
	
	menuService.addMenu = function(idRestaurant){
		return $http({
			method: 'POST',
			url: 'api/menu/addMenu',
			data: {
				"id" : null,
				"idRestaurant" : idRestaurant
			}
			
		});
		
	}
	
	
	menuService.getMenuByRestaurantId = function(idRestaurant){
		return $http({
			method: 'GET',
			url: 'api/menu/'+idRestaurant,			
		});	
	}
	
	menuService.allCategories = [];
	
	
	return menuService;
});

angular.module('Milica').factory('menuCategoryService' , function menuCategoryService($http){
	
	
	menuCategoryService.addMenuCategory = function(idMenu,categoryName){
		return $http({
			method: 'POST',
			url: 'api/menu/addMenuCategory',
			data: {
				"id" : null,
				"idMenu" : idMenu,
				"categoryName" : categoryName
			}
			
		});
		
	}
	
/*	menuCategoryService.getMenuCategoryByMenuId = function(idMenu){
		return $http({
			method: 'GET',
			url: 'api/menu/category/'+idMenu,			
		});	
	}*/
	
	menuCategoryService.getAllMenuCategories = function(idMenu){
		return $http({
			method: 'GET',
			url: 'api/menu/category/allCategoriesInMenu/'+idMenu		
		});	
	}
	
	return menuCategoryService;
});

angular.module('Milica').factory('mealService' , function mealService($http){
	
	
	mealService.addMeal = function(idMenuCategory, mealName, mealDescription, mealPrice){
		return $http({
			method: 'POST',
			url: 'api/menu/addMeal',
			data: {
				"id" : null,
				"idMenuCategory" : idMenuCategory,
				"mealName" : mealName,
				"mealDescription" : mealDescription,
				"price" : mealPrice
			}
			
		});
		
	}
	
	mealService.getAllCategoryMeals = function(menuCategoryId){
		alert("ev me");
		return $http({
			method: 'GET',
			url: 'api/menu/meals/allCategoryMeals/'+menuCategoryId		
		});	
	}
	
	
	mealService.categoryId = {};
	
	return mealService;
});