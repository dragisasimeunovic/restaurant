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
				"tip" : "gost",
				"restoran" : null,
				"dateOfBirth":null,
				"dressSize":null,
				"footwearSize":null
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
				"tip" : "menadzer",
				"restoran" : null,
				"dateOfBirth":null,
				"dressSize":null,
				"footwearSize":null
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
				"tip" : "ponudjac",
				"dateOfBirth":null,
				"dressSize":null,
				"footwearSize":null
			}
			
		});
	}
	return registrationOffererService;
});

angular.module('Milica').factory('registrationEmployedService' , function registrationEmployedService($http){
	
	
	registrationEmployedService.registerEmployed = function(name,surname, email,password, type, restaurantId,dateOfBirth,dressSize,footwearSize){
		return $http({
			method: 'POST',
			url: 'api/korisnici/korisnik',
			data: {
				/*"id" : null,*/
				"email" : email,
				"ime" : name,
				"prezime" : surname,
				"lozinka" : password,
				"tip" : type,
				"restoran" :restaurantId,
				"dateOfBirth":dateOfBirth,
				"dressSize":dressSize,
				"footwearSize":footwearSize
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
				"tip" : type,
				"ocena" : null
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

// SERVISI ZA JELA

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

// SERVISI ZA PICA

angular.module('Milica').factory('drinkCardService', function drinkCardService($http){
	
	drinkCardService.addDrinkCard = function(idRestaurant){
		return $http({
			method: 'POST',
			url: 'api/drinkCard/addDrinkCard',
			data: {
				"id" : null,
				"idRestaurant" : idRestaurant
			}
			
		});
		
	}
	
	
	return drinkCardService;
	
});

angular.module('Milica').factory('drinkCategoryService', function drinkCategoryService($http){
	
	drinkCategoryService.addDrinkCategory = function(idDrinkCard,categoryName){
		return $http({
			method: 'POST',
			url: 'api/drinkCard/addDrinkCategory',
			data: {
				"id" : null,
				"idDrinkCard" : idDrinkCard,
				"drinkCategoryName" : categoryName
			}
			
		});
		
	}
	
	drinkCategoryService.getAllDrinkCategories = function(idDrinkCard){
		//alert('usla sam');
		return $http({
			method: 'GET',
			url: 'api/category/allCategoriesInDrinkCard/'+idDrinkCard		
		});	
	}
	
	
	
	return drinkCategoryService;
	
});

angular.module('Milica').factory('drinkService' , function drinkService($http){
	
	
	drinkService.addDrink = function(idDrinkCategory, drinkName, drinkDescription, drinkPrice, drinkCategory){
		return $http({
			method: 'POST',
			url: 'api/drinkCard/addDrink',
			data: {
				"id" : null,
				"idDrinkCategory" : idDrinkCategory,
				"drinkName" : drinkName,
				"drinkDescription" : drinkDescription,
				"price" : drinkPrice,
				"dCategory" : drinkCategory
			}
			
		});
		
	}	
	drinkService.drinkCategoryId = {};
	drinkService.drinkCategory = {};
	
	return drinkService;
});

//SERVISI ZA GOSTE

angular.module('Milica').factory('guestService' , function guestService($http){
	
	guestService.getAllGuests = function(){
		
		return $http ({
			method: 'GET',
			url: 'api/korisnici/allGuests'
		});
	}
	
	guestService.searchByNameAndSurname = function(name, surname){
		
		return $http ({
			method: 'GET',
			url: 'api/korisnici/searchByNameAndSurname/'+ name +'/'+surname
		});
	}
	
	return guestService;
	
});

