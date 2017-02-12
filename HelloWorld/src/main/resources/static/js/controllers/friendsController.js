app.controller('friendsController',['$scope','friendsService', 'managerService','$location','$mdDialog','menuService','menuCategoryService','loginService', function($scope,friendsService, managerService,$location, $mdDialog, menuService,menuCategoryService,loginService){
	
		friendsService.getAllFriends(loginService.user.email).then(function(response){
			$scope.friendships = response.data;
		});
		
}]);