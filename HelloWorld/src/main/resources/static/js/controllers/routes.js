app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/login.html",
        controller: 'LoginController'
    })
    .when("/home", {
        templateUrl : "views/home.html"
    })
    .when("/schedule", {
        templateUrl : "views/schedule.html"
    })
    .when("/menu", {
        templateUrl : "views/menu.html"
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
        templateUrl : "views/restaurantManager.html",
        controller: 'RestaurantController'
    })
    .when("/addEmployed", {
        templateUrl : "views/addEmployed.html"
    })
    .when("/orderRestaurant", {
        templateUrl : "views/restaurantOrder.html"
    })
    .when("/drinkCard", {
        templateUrl : "views/drinkCard.html"
    });
    
    
   
});