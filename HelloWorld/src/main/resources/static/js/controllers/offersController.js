app.controller('offersController', ['$scope','$location', 'loginService', 'bidderService', 'groceriesService', 'offerService', 'dateFilter', function($scope, $location, loginService, bidderService, groceriesService, offerService, dateFilter){
	
	
	$scope.acceptedBidder = function(offerId, listId){
		offerService.acceptOffer(offerId).then(function(response){
			alert('Offer accepted!');
		});	
		
		groceriesService.setListActiveToFalse(listId).then(function(response){
			alert('List deactivated!');
		});	
	}
	
	
	
	var currentDateAndTime = new Date();
	var curDateString = moment(currentDateAndTime).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
	
	groceriesService.getAllCategoriesByStartingTime(curDateString).then(function(response){
		$scope.lists = response.data;
	});
	
	
	
}]);