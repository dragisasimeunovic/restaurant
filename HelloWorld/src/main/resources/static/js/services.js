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
				"footwearSize":null,
				"firstLogin" : 0,
				"activated": false
			}
			
		});
		
	}
	return registrationService;
});

angular.module('Milica').factory('restaurantsService' , function restaurantsService($http){
	
	restaurantsService.changePositions = function(id, latitude, longitude) {
		return $http ({
			method: 'POST',
			url: 'api/restorani/changePosition/' + latitude + '/' + longitude + '/' + id
		});
	}
	
	
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
	
	restaurantsService.allRestaurantEmployees = function(){
		return $http({
			method: 'GET',
			url: 'api/korisnici/allRestaurantEmployees'
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
	korisnikService.gettAllRestaurantEmployeesWithType = function(restaurantId, typeOfEmployee){
		return $http({
			method: 'GET',
			url: 'api/korisnici/allEmployeesWithType/' + restaurantId + '/' + typeOfEmployee
		});
	}
	
	return korisnikService;
})



angular.module('Milica').factory('registrationManagerService' , function registrationManagerService($http){
	
	
	registrationManagerService.registerAdmin = function (ime, prezime, email, lozinka){
		return $http({
			method: 'POST',
			url: 'api/korisnici/korisnik',
			data: {
				/*"id" : null,*/
				"email" : email,
				"ime" : ime,
				"prezime" : prezime,
				"lozinka" : lozinka,
				"tip" : "admin",
				"restoran" : null,
				"dateOfBirth":null,
				"dressSize":null,
				"footwearSize":null,
				"firstLogin" : 0
			}
			
		});
	}
	
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
				"footwearSize":null,
				"firstLogin" : 0
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
				"footwearSize":null,
				"firstLogin": 0
			}
			
		});
	}
	return registrationOffererService;
});

angular.module('Milica').factory('registrationEmployedService' , function registrationEmployedService($http){
	
	
	registrationEmployedService.registerEmployed = function(name,surname, email,password, type, restaurantId,dateOfBirth,dressSize,footwearSize, menuCategoryId){
		return $http({
			method: 'POST',
			url: 'api/korisnici/korisnik',
			data: {
				"id" : null,
				"email" : email,
				"ime" : name,
				"prezime" : surname,
				"lozinka" : password,
				"tip" : type,
				"restoran" :restaurantId,
				"dateOfBirth":dateOfBirth,
				"dressSize":dressSize,
				"footwearSize":footwearSize,
				"firstLogin": 0,
				"menuCategoryId" : menuCategoryId
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
				"ocena" : ocena,
				"latitude" : 1.280095,
				"longitude" : 103.850949
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
	
	loginService.changeFirstLogin = function(email, firstLogin, password){
		return $http({
			method: 'POST',
			url: 'api/korisnik/setFirstLogin/' + email + '/' + firstLogin + '/' + password
		    
		});
		
	}
	
	loginService.changeAbout = function(ime, prezime, dressSize, footwearSize, email){
		return $http({
			method: 'POST',
			url: 'api/korisnik/aboutChange/' + ime + '/' + prezime + '/' + dressSize + '/' + footwearSize + '/' + email
		    
		});
	}
	
	loginService.changeAboutGuest = function(ime, prezime, email){
		return $http({
			method: 'POST',
			url: 'api/korisnik/aboutChangeGuest/' + ime + '/' + prezime + '/' + email
		    
		});
	}
	
	loginService.changeAboutBidder = function(ime, email){
		return $http({
			method: 'POST',
			url: 'api/korisnik/aboutBidderChange/' + ime + '/' + email
		    
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
	
	menuCategoryService.getAllMenuCategories = function(idMenu){
		return $http({
			method: 'GET',
			url: 'api/menu/category/allCategoriesInMenu/'+idMenu		
		});	
	}
	
	return menuCategoryService;
});

angular.module('Milica').factory('mealService' , function mealService($http){
	
	mealService.mealCategoryId = {};
	mealService.mealCategory = {};
	
	mealService.activeMealCategory = {};
	mealService.meal = {};
	
	mealService.updateMeal = function(mealID, mealName, mealPrice, mealDescription, idMenuCategory, mc){
		return $http({
			method: 'POST',
			url: 'api/meal/updateMeal',
			data: {
				"id" : mealID,
				"idMenuCategory" : idMenuCategory,
				"mealName" : mealName,
				"mealDescription" : mealDescription,
				"price" : mealPrice,
				"mc" : mc
			}
			
		});
	}
	
	mealService.addMeal = function(idMenuCategory, mealName, mealDescription, mealPrice){
		alert('Id menu cat: ' + idMenuCategory.id);
		return $http({
			method: 'POST',
			url: 'api/menu/addMeal',
			data: {
				"id" : null,
				"idMenuCategory" : idMenuCategory.id,
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
	
	tableService.getTableByRestaurantIdAndNumberWhichIsNotReserved = function(restaurantId, number, cT, lT){
		return $http({
			method: 'GET',
			url: '/api/restaurant/getRestaurantTableNotReserved/' + restaurantId +'/'+number+'/'+cT+'/'+lT
		});
	}
	

	
	return tableService;
});

angular.module('Milica').factory('friendRequestService' , function friendRequestService($http){
	
	
	friendRequestService.deleteRequest = function(requestId){
		return $http({
			method: 'POST',
			url: 'api/friendRequests/deleteRequest/'+requestId
		});
	}
	
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

angular.module('Milica').factory('reservationService' , function reservationService($http){
	
	reservationService.addReservationByIdOfOther = function(idReservation, guestEmail) {
		return $http({
			method: 'POST',
			url: 'api/reservation/addReservationById/' + idReservation + '/' + guestEmail
		});
	}
	
	
	reservationService.addReservation = function(guestId, restaurantId, reservedTable, comingTime, leavingTime){
		return $http({
			method: 'POST',
			url: 'api/reservation/addReservation',
			data: {
				"id" : null,
				"guestId" : guestId,
				"restaurantId" : restaurantId,
				"reservedTable" : reservedTable,
				"comingTime" : comingTime,
				"leavingTime" : leavingTime
			}
			
		});
	}
	
	reservationService.getReservationByGuestIdAndComingTime = function(guestId, comingTime){
		
		return $http ({
			method: 'GET',
			url: 'api/reservation/getByGuestIdAndComingTime/' + guestId +'/'+comingTime
		});
	}
	
	reservationService.cancelReservation = function(id){
		return $http ({
			method: 'POST',
			url: 'api/reservation/cancelReservation/' + id
		});
	}
	
	reservationService.getAllTermReservations = function(id){
		return $http ({
			method: 'GET',
			url: 'api/reservation/getAllTermReservations/' + id
		});
	}
	
	return reservationService;
});

angular.module('Milica').factory('invitationService' , function invitationService($http){
	
	invitationService.addInvitation = function(senderId, reservationId, accepted, recieverId){
		return $http({
			method: 'POST',
			url: 'api/invitation/addInvitation',
			data: {
				"id" : null,
				"senderId" : senderId,
				"reservationId" : reservationId,
				"accepted" : accepted,
				"recieverId" : recieverId
			}
			
		});
	}
	
	
	return invitationService;
});

angular.module('Milica').factory('drinkOrderService' , function drinkOrderService($http){
	
	drinkOrderService.addDrinkOrderItem = function(drink, preparationDeadline, isPrepared, listId, price, quantity){
		return $http({
			method: 'POST',
			url: 'api/drinkOrder/addListItem/' + listId,
			data: {
				"id" : null,
				"drink" : drink,
				"preparationDeadline" : preparationDeadline,
				"isPrepared" : isPrepared,
				"price" : price,
				"quantity" : quantity
			}

		});
	}

	drinkOrderService.addDrinkOrderList = function(isServed, guestId, restaurantId, tableNumber){
		return $http({
			method: 'POST',
			url: 'api/drinkOrderList/addList',
			data: {
				"id" : null,
				"isServed" : isServed,
				"guestId" : guestId,
				"restaurantId" : restaurantId,
				"tableNumber" : tableNumber,
				"isPaid": false,
				"isRated" : false
			}

		});
	}
	
	drinkOrderService.ratingOrders = function(email){
		return $http({
			method: 'GET',
			url: 'api/drinkOrderList/getAllUserOrdersForRating/' + email
		});
	}
	
	drinkOrderService.setRated = function(orderListId){
		return $http({
			method: 'POST',
			url: 'api/drinkOrderList/setIsRated/' + orderListId
		});
	}
	
	drinkOrderService.setPreparedForListItem = function(id, prepared){
		return $http({
			method: 'POST',
			url: 'api/drinkOrder/setPreparedForListItem/' + id +'/'+prepared
		});
	}
	
	drinkOrderService.setServedAndPaid = function(served, paid, id, waiterEmail, datePaid){
		return $http({
			method: 'POST',
			url: 'api/drinkOrderList/setServedOrPaid/' + served + '/' + paid + '/' + id + '/' + waiterEmail + '/' + datePaid
		});
	}
	
	drinkOrderService.getNonservedLists = function(restaurantId){
		return $http({
			method: 'GET',
			url: 'api/drinkOrderList/getAllRestaurantNonservedLists/' + restaurantId
		});
	}
	
	drinkOrderService.getNonservedOrNonpaidLists = function(restaurantId){
		return $http({
			method: 'GET',
			url: 'api/drinkOrderList/getAllRestaurantNonservedOrNonpaidLists/' + restaurantId
		});
	}

	drinkOrderService.getProfitsInRange = function(restaurantId, date1, date2){
		return $http({
			method: 'GET',
			url: 'api/drinkOrderList/getProfitsInRange/' + restaurantId + '/' + date1 + '/' + date2
		});
	}
	
	drinkOrderService.getVisitsInRange = function(restaurantId, date1, date2){
		return $http({
			method: 'GET',
			url: 'api/drinkOrderList/getVisitsInRange/' + restaurantId + '/' + date1 + '/' + date2
		});
	}
	
	drinkOrderService.getProfitsForWaiter = function(restaurantId, waiterEmail){
		return $http({
			method: 'GET',
			url: 'api/drinkOrderList/getProfitsForWaiter/' + restaurantId + '/' + waiterEmail
		});
	}
	
	return drinkOrderService;
	
	
});

angular.module('Milica').factory('mealOrderService' , function mealOrderService($http){
	
	mealOrderService.addMealOrderItem = function(meal, preparationDeadline, isPrepared, listId, price, quantity){
		return $http({
			method: 'POST',
			url: 'api/mealOrder/addListItem/' + listId,
			data: {
				"id" : null,
				"meal" : meal,
				"preparationDeadline" : preparationDeadline,
				"isPrepared" : isPrepared,
				"isPreparing" : false,
				"price" : price,
				"quantity" : quantity
			}

		});
	}

	mealOrderService.addMealOrderList = function(isServed, guestId, restaurantId, tableNumber){
		return $http({
			method: 'POST',
			url: 'api/mealOrderList/addList',
			data: {
				"id" : null,
				"isServed" : isServed,
				"guestId" : guestId,
				"restaurantId" : restaurantId,
				"tableNumber" : tableNumber,
				"isPaid": false,
				"isRated" : false
			}

		});
	}
	
	mealOrderService.ratingOrders = function(email){
		return $http({
			method: 'GET',
			url: 'api/mealOrderList/getAllUserOrdersForRating/' + email
		});
	}
	
	mealOrderService.setRated = function(orderListId){
		return $http({
			method: 'POST',
			url: 'api/mealOrderList/setIsRated/' + orderListId
		});
	}
	
	mealOrderService.setPreparedForListItem = function(id, prepared){
		return $http({
			method: 'POST',
			url: 'api/mealOrder/setPreparedForListItem/' + id +'/'+prepared
		});
	}
	
	mealOrderService.setPreparingForListItem = function(id, preparing){
		return $http({
			method: 'POST',
			url: 'api/mealOrder/setPreparingForListItem/' + id +'/'+preparing
		});
	}
	
	mealOrderService.setServedAndPaid = function(served, paid, id, waiterEmail, datePaid){
		return $http({
			method: 'POST',
			url: 'api/mealOrderList/setServedOrPaid/' + served + '/' + paid + '/' + id + '/' + waiterEmail + '/' + datePaid
		});
	}
	
	mealOrderService.getNonservedLists = function(restaurantId){
		return $http({
			method: 'GET',
			url: 'api/mealOrderList/getAllRestaurantNonservedLists/' + restaurantId
		});
	}
	
	mealOrderService.getNonservedOrNonpaidLists = function(restaurantId){
		return $http({
			method: 'GET',
			url: 'api/mealOrderList/getAllRestaurantNonservedOrNonpaidLists/' + restaurantId
		});
	}

	mealOrderService.getProfitsInRange = function(restaurantId, date1, date2){
		return $http({
			method: 'GET',
			url: 'api/mealOrderList/getProfitsInRange/' + restaurantId + '/' + date1 + '/' + date2
		});
	}
	
	mealOrderService.getVisitsInRange = function(restaurantId, date1, date2){
		return $http({
			method: 'GET',
			url: 'api/mealOrderList/getVisitsInRange/' + restaurantId + '/' + date1 + '/' + date2
		});
	}
	
	mealOrderService.getProfitsForWaiter = function(restaurantId, waiterEmail){
		return $http({
			method: 'GET',
			url: 'api/mealOrderList/getProfitsForWaiter/' + restaurantId + '/' + waiterEmail
		});
	}
	
	return mealOrderService;
	
	
});

angular.module('Milica').factory('orderService' , function orderService($http){

	orderService.activeReservation = {};
	orderService.reservedTablesIds = [];
	
	return orderService;
	
});

angular.module('Milica').factory('shiftService' , function shiftService($http){
	
	shiftService.addShift = function(restaurantId, employee, color, region, startsAt, endsAt){
		return $http({
			method: 'POST',
			url: 'api/shift/addShift',
			data: {
				"id" : null,
				"restaurantId": restaurantId,
				"employee" : employee,
				"color" : color,
				"region" : region,
				"startsAt" : startsAt,
				"endsAt" : endsAt			
			}
			
		});
	}
	
	shiftService.findShifts = function(id){
		return $http ({
			method: 'GET',
			url: 'api/shift/findShifts/' + id
		});
	}
	
	shiftService.findShiftsForEmployee = function(email, restaurantId){
		return $http ({
			method: 'GET',
			url: 'api/shift/findShiftsForEmployee/' + email + '/' + restaurantId
		});
	}

	shiftService.findActiveShiftForEmployee = function(email, restaurantId, currentTime){
		return $http ({
			method: 'GET',
			url: 'api/shift/getActiveShiftForEmployee/' + email + '/' + restaurantId  + '/' + currentTime
		});
	}
	
	return shiftService;
	
});

angular.module('Milica').factory('groceriesService' , function groceriesService($http){
	
	groceriesService.addGroceriesCategory = function(categoryName){
		return $http({
			method: 'POST',
			url: 'api/groceriesCategory/addGroceriesCategory',
			data: {
				"id" : null,
				"categoryName": categoryName	
			}
			
		});
	}
	
	groceriesService.getAllCategories = function(){
		return $http({
			method: 'GET',
			url: 'api/groceriesCategory/allCategories'
		});
	}
	
	groceriesService.getAllCategoriesByStartingTime = function(startingTime){
		return $http({
			method: 'GET',
			url: 'api/groceries/getListsByStartingTime/'+startingTime
		});
	}
	
	groceriesService.getAllCategoriesByRestaurantId = function(restaurantId){
		return $http({
			method: 'GET',
			url: 'api/groceries/getListsByRestaurantId/' + restaurantId
		});
	}
	
	
	
	groceriesService.addGroceries = function(groceriesName, gCategory){
		return $http({
			method: 'POST',
			url: 'api/groceries/addGroceries/' + gCategory.id,
			data: {
				"id" : null,
				"groceriesName": groceriesName,
				"gCategory" : gCategory
			}
			
		});
	}
	
	groceriesService.addList = function(listName, restaurantId, startingTime, endingTime){
		return $http({
			method: 'POST',
			url: 'api/groceries/addList',
			data: {
				"id" : null,
				"restaurantId" : restaurantId,
				"listName": listName,
				"startingTime" : startingTime,
				"endingTime" : endingTime,
				"active" :true
			}
			
		});
	}
	
	groceriesService.setListActiveToFalse = function(id){
		return $http({
			method: 'POST',
			url: 'api/groceries/addListActive/' + id
		});
	}
	
	groceriesService.addListItem = function(grListId, groceries, quantity, gl){
		return $http({
			method: 'POST',
			url: 'api/groceries/addListItem/' + grListId,
			data: {
				"id" : null,
				"groceries": groceries,
				"quantity" : quantity,
				"gl" : gl
			}
			
		});
	}
	
	groceriesService.activeCategory = {};
	
	
	
	return groceriesService;
	
});


angular.module('Milica').factory('bidderService' , function bidderService($http){
	
	bidderService.addBidder = function(email, ime, lozinka, tip, restaurantId){
		return $http({
			method: 'POST',
			url: 'api/bidder/addBidder',
			data: {
				"email" : email,
				"ime": ime,
				"lozinka" : lozinka,
				"tip" : "bidder",
				"firstLogin" : 0,
				"restoran" : restaurantId
			}
			
		});
	}
	
	
	return bidderService;
	
});

angular.module('Milica').factory('offerService' , function offerService($http){
	
	offerService.addOffer = function(price, deliveryDate, bidder, gl, warranty){
		return $http({
			method: 'POST',
			url: 'api/offer/addOffer/'+gl.id,
			data: {
				"id" : null,
				"price": price,
				"deliveryDate" : deliveryDate,
				"bidder" : bidder, 
				"gl" : gl ,
				"warranty" : warranty,
				"accepted" : false
			}
			
		});
	}
	
	offerService.updateOffer = function(price, bpTime, warranty, offerId){
		return $http({
			method: 'POST',
			url: 'api/offer/updateOffer/'+ price + '/' + bpTime + '/' + warranty + '/' + offerId
		});
	}
	
	
	offerService.acceptOffer = function(offerId){
		return $http({
			method: 'POST',
			url: 'api/offer/addOfferAccepted/'+offerId,
		});
	}
	
	
	return offerService;
	
});

angular.module('Milica').factory('markService' , function markService($http){
	
	markService.addDrinkMark = function(userEmail, drinkId, mark){
		return $http({
			method: 'POST',
			url: 'api/marks/addDrinkMark',
			data: {
				"id" : null,
				"drinkId" : drinkId,
				"userEmail": userEmail,
				"mark" : mark
			}
			
		});
	}
	
	markService.addWaiterMark = function(userEmail, waiterEmail, mark){
		return $http({
			method: 'POST',
			url: 'api/marks/addWaiterMark',
			data: {
				"id" : null,
				"waiterEmail" : waiterEmail,
				"userEmail": userEmail,
				"mark" : mark
			}
			
		});
	}
	
	markService.addRestaurantMark = function(userEmail, restaurantId, mark){
		return $http({
			method: 'POST',
			url: 'api/marks/addRestaurantMark',
			data: {
				"id" : null,
				"restaurantId" : restaurantId,
				"userEmail": userEmail,
				"mark" : mark
			}
			
		});
	}
	
	markService.getRestaurantMarkForUser = function(userEmail, restaurantId){
		return $http({
			method: 'GET',
			url: 'api/marks/getRestaurantMarkForUser/' + '/' + userEmail  + '/' + restaurantId
		});
	}
	
	markService.getRestaurantMark = function(restaurantId){
		return $http({
			method: 'GET',
			url: 'api/marks/getRestaurantMark/' + restaurantId
		});
	}
	
	markService.getWaiterMark = function(waiterEmail){
		return $http({
			method: 'GET',
			url: 'api/marks/getWaiterMark/' + waiterEmail
		});
	}
	
	markService.getDrinkMark = function(drinkId){
		return $http({
			method: 'GET',
			url: 'api/marks/getDrinkMark/' + drinkId
		});
	}
	
	return markService;
	
});


