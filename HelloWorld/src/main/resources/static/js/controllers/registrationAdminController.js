app.controller('registrationAdminController', ['$scope','$location', 'registrationManagerService', 'restaurantsService', function($scope,$location,registrationManagerService,restaurantsService){
	
	
	
	$scope.registerAdmin = function(){
		
		var ime = $scope.name;
		var prezime = $scope.surname;
		var email = $scope.email;
		var lozinka = $scope.password1;
		
		registrationManagerService.registerAdmin(ime, prezime, email, lozinka).then(function(response){
			$location.path("/admin");
		});
		
	}
	
}]);