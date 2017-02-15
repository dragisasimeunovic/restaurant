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
	
	restaurantsService.getRestaurantById = function(restaurantId){
		return $http({
			method: 'GET',
			url: 'api/restorani/' + restaurantId
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
	
	
	registrationManagerService.registerManager = function(name,surname, email,password, restaurant){
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
				"restoran" : restaurant,
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
	
	
	registrationRestaurantService.registerRestaurant = function(name,type,id, ocena){
		return $http({
			method: 'POST',
			url: 'api/restorani/restoran',
			data: {
				"id" : id,
				"ime" : name,
				"tip" : type,
				"ocena" : ocena
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
			url: 'api/menu/'+idRestaurant		
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
	
	drinkService.activeDrinkCategory = {};
	drinkService.drink = {};
	
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
	
	drinkService.updateDrink = function(drinkID, drinkName, drinkPrice, drinkDescription, drinkCategoryId, drinkCategory){
		return $http({
			method: 'POST',
			url: 'api/drinkCard/updateDrink',
			data: {
				"id" : drinkID,
				"idDrinkCategory" : drinkCategoryId,
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
	
	guestService.getAllGuestsExceptActiveUser = function(userEmail){
		return $http ({
			method: 'GET',
			url: 'api/korisnici/allGuestsExceptActiveUser/'+ userEmail
		});
	}
	
	guestService.getAllGuests = function(){
		
		return $http ({
			method: 'GET',
			url: 'api/korisnici/allGuests'
		});
	}
	
	guestService.searchByNameAndSurname = function(name, surname, email){
		
		return $http ({
			method: 'GET',
			url: 'api/korisnici/searchByNameAndSurname/'+ name +'/'+surname+'/'+email
		});
	}
	
	guestService.orderGuestsByNameAtoZ = function(email){
		
		return $http ({
			method: 'GET',
			url: 'api/korisnici/orderByNameAtoZ/' + email 
		});
	}
	
	guestService.orderGuestsByNameZtoA = function(email){
		
		return $http ({
			method: 'GET',
			url: 'api/korisnici/orderByNameZtoA/' + email
		});
	}
	
	return guestService;
	
});


angular.module('Milica').factory('tableService' , function tableService($http){
	
	
	tableService.addTable = function(number, idRestaurant, reon, restaurant, positionLeft, positionTop){
		return $http({
			method: 'POST',
			url: 'api/restaurant/addTable',
			data: {
				"id" : null,
				"number" : number,
				"idRestaurant" : idRestaurant,
				"reon" : reon,
				"restaurant" : restaurant,
				"positionLeft" : positionLeft,
				"positionTop" : positionTop
			}
			
		});
	}
	
	tableService.getAllRestaurantTables = function(restaurantId){
		return $http({
			method: 'GET',
			url: '/api/restaurant/getAllRestaurantTables/' + restaurantId
		});
	}
	
	tableService.getTableByRestaurantIdAndNumber = function(restaurantId, number){
		return $http({
			method: 'GET',
			url: '/api/restaurant/getRestaurantTable/' + restaurantId +'/'+number
		});
	}
	

	
	return tableService;
});

angular.module('Milica').factory('friendRequestService' , function friendRequestService($http){
	
	
	friendRequestService.sendRequest = function(userSender, userRecieverEmail){
		return $http({
			method: 'POST',
			url: 'api/friendRequests/sendRequest',
			data: {
				"id" : null,
				"userSender" : userSender,
				"userSenderEmaill" : userSender.email,
				"userRecieverEmail" : userRecieverEmail
			}
			
		});
	}
	
	friendRequestService.getAllRequests = function(email){
		
		return $http ({
			method: 'GET',
			url: 'api/friendRequests/getRequests/' + email
		});
	}
	
	friendRequestService.getRequest = function(senderEmail, recieverEmail){
		
		return $http ({
			method: 'GET',
			url: 'api/friendRequests/getRequest/' + senderEmail +'/'+recieverEmail
		});
	}
	
	return friendRequestService;
});

angular.module('Milica').factory('friendsService' , function friendsService($http){
	
	
	
	
	
	friendsService.sendFS = function(firstUserEmail, secondUserFS){
		return $http({
			method: 'POST',
			url: '/api/friendship/addFriendship',
			data: {
				"id" : null,
				"firstUserEmail" : firstUserEmail,
				"secondUserFS" : secondUserFS
			}
			
		});
	}
	
	friendsService.getAllFriends = function(email){
		
		return $http ({
			method: 'GET',
			url: 'api/friendship/getAllFriends/' + email
		});
	}
	
	friendsService.getFriendship = function(firstUserEmail, secondUserEmail){
		
		return $http ({
			method: 'GET',
			url: 'api/friendship/getFriendship/' + firstUserEmail +'/'+secondUserEmail
		});
	}
	
	friendsService.deleteFriendship = function(firstUserEmail, secondUserEmail){
		
		return $http ({
			method: 'POST',
			url: 'api/friendship/deleteFriendship/' + firstUserEmail +'/'+secondUserEmail
		});
	}
	
	return friendsService;
});

