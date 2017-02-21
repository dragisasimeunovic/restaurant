app.controller('bidderController', ['$scope','$location', 'loginService', 'bidderService', 'groceriesService', function($scope, $location, loginService, bidderService, groceriesService){
	
	$scope.name = loginService.user.ime;
	var currentDateAndTime = new Date();
	var curDateString = moment(currentDateAndTime).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
	
	groceriesService.getAllCategoriesByStartingTime(curDateString).then(function(response){
		$scope.lists = response.data;
	});
	
	
}]);