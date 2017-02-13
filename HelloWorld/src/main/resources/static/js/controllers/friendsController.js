app.controller('friendsController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route){
	
		friendsService.getAllFriends(loginService.user.email).then(function(response){
			$scope.friendships = response.data;
		});
		
		$scope.deleteFriend = function(deletedFriendEmail) {
			friendsService.deleteFriendship(loginService.user.email, deletedFriendEmail).then(function(response){
				alert('Obrisan iz liste prijatelja!');
				$route.reload();
			});
		}
}]);