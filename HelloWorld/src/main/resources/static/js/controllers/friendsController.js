app.controller('friendsController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'orderByFilter', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, orderBy){
	
		friendsService.getAllFriends(loginService.user.email).then(function(response){
			$scope.friendships = response.data;
		});
		
		$scope.sort = function() {
			if ($scope.sortByNameChecked == true && $scope.sortBySurnameChecked == true){
				$scope.friendships = orderBy($scope.friendships, ['secondUserFS.ime','secondUserFS.prezime']);
			}
			else if($scope.sortByNameChecked == true) {
				$scope.friendships = orderBy($scope.friendships, 'secondUserFS.ime');
			}
			else if ($scope.sortBySurnameChecked == true) {
				$scope.friendships = orderBy($scope.friendships, 'secondUserFS.prezime');
			}
		 };
		
		$scope.deleteFriend = function(deletedFriendEmail) {
			friendsService.deleteFriendship(loginService.user.email, deletedFriendEmail).then(function(response){
				alert('Obrisan iz liste prijatelja!');
				$route.reload();
			});
		}
}]);