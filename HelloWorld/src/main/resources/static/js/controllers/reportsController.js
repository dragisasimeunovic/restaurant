app.controller('reportsController',['$scope', 'friendsService', 'managerService', '$location', '$mdDialog', 'menuService','menuCategoryService','loginService', '$route', 'restaurantsService', '$window', 'tableService', 'dateFilter', 'drinkCategoryService', 'reservationService', 'invitationService', 'drinkOrderService', 'orderService','$cookies', '$cookieStore','$window', 'markService', 'korisnikService','mealOrderService', function($scope, friendsService, managerService, $location, $mdDialog, menuService, menuCategoryService, loginService, $route, restaurantsService, $window, tableService, dateFilter, drinkCategoryService, reservationService, invitationService, drinkOrderService, orderService, $cookies, $cookieStore, $window, markService, korisnikService, mealOrderService){
	
	$scope.novDate = new Date();
	
	$scope.novDateOpened = false;
	
	$scope.openNovDate = function() {
	    $scope.novDateOpened = true;
	};
	
	$scope.emailVisitsCounter = [];
	
	$scope.getChart = function() {
		
		var dateString = dateFilter($scope.novDate, 'yyyy-MM-ddT');
		var timeString = dateFilter($scope.novDate, '00:00:00.000');
		var bpTime = dateString + timeString + 'Z';
		
		for (var i = 0; i < $scope.dateRange; i++) {
			
		
			var bpMoment = moment(bpTime);
			var endDate = moment(bpMoment).add(1, 'd').toDate();
			var endDateString = moment(endDate).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
			
			mealOrderService.getVisitsInRange(loginService.user.restoran, bpTime, endDateString).then(function(response){
			  
				if (!angular.isUndefined(response.data)){
					for(var i = 0; i < response.data.length; i++){
						var index = $scope.emailVisitsCounter.indexOf(response.data[i].guestId);
						if (index != -1) {
						}
						else {
							$scope.emailVisitsCounter.push(response.data[i].guestId);
						}
					}
					
				}
				
				Highcharts.chart('container', {
				    chart: {
				        type: 'column'
				    },
				    title: {
				        text: 'Restaurant visiting'
				    },
				    subtitle: {
				        text: 'Graph'
				    },
				    xAxis: {
				        categories: ['Visits number'],
				        crosshair: true
				    },
				    yAxis: {
				        min: 0,
				        title: {
				            text: 'Visits number'
				        }
				    },
				    tooltip: {
				        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
				        footerFormat: '</table>',
				        shared: true,
				        useHTML: true
				    },
				    plotOptions: {
				        column: {
				            pointPadding: 0.2,
				            borderWidth: 0
				        }
				    },
				    series: [{name: 'Visits number', data: [$scope.emailVisitsCounter.length]}]
				});
		
				
			 });	
			
			
			
			drinkOrderService.getVisitsInRange(loginService.user.restoran, bpTime, endDateString).then(function(response){
				  
				if (!angular.isUndefined(response.data)){
					for(var i = 0; i < response.data.length; i++){
						var index = $scope.emailVisitsCounter.indexOf(response.data[i].guestId);
						if (index != -1) {
						}
						else {
							$scope.emailVisitsCounter.push(response.data[i].guestId);
						}
					}
					
				}
				
				Highcharts.chart('container', {
				    chart: {
				        type: 'column'
				    },
				    title: {
				        text: 'Restaurant visiting'
				    },
				    subtitle: {
				        text: 'Graph'
				    },
				    xAxis: {
				        categories: ['Visits number'],
				        crosshair: true
				    },
				    yAxis: {
				        min: 0,
				        title: {
				            text: 'Visits number'
				        }
				    },
				    tooltip: {
				        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
				        footerFormat: '</table>',
				        shared: true,
				        useHTML: true
				    },
				    plotOptions: {
				        column: {
				            pointPadding: 0.2,
				            borderWidth: 0
				        }
				    },
				    series: [{name: 'Visits number', data: [$scope.emailVisitsCounter.length]}]
				});
		
				
			 });
			
			bpTime = endDateString;
			
		}	
		
	}
	
	
	$scope.dateRange = 1;
	
	restaurantsService.getRestaurantById(loginService.user.restoran).then(function(response){
		  $scope.restaurantName = response.data.ime;  
	 });
	
	
	markService.getRestaurantMark(loginService.user.restoran).then(function(response){
		var sum = 0;  
		for (var i = 0; i < response.data.length; i++) {
			  sum += response.data[i].mark;
		}
		$scope.rate = sum / response.data.length;
	 });
	
	korisnikService.gettAllRestaurantEmployeesWithType(loginService.user.restoran, "Waiter").then(function(response){
		$scope.waiters = response.data;
	});
	
	$scope.selectedWaiterChanged = function() {
		drinkOrderService.getProfitsForWaiter(loginService.user.restoran, $scope.selectedWaiter.email).then(function(response){
			var sum = 0; 
			for (var i = 0; i < response.data.length; i++) {
				for (var j = 0; j < response.data[i].items.length; j++) {
					sum +=  response.data[i].items[j].price;
				}
			}
			$scope.waiterProfit = sum;
		});
		
		markService.getWaiterMark($scope.selectedWaiter.email).then(function(response){
			var sum = 0;  
			for (var i = 0; i < response.data.length; i++) {
				sum += response.data[i].mark;
			}
			$scope.waiterRate = sum / response.data.length;
		});
	}
	
	$scope.selectedDrinkChanged = function() {
		
		markService.getDrinkMark($scope.selectedDrink.id).then(function(response){
			var sum = 0;  
			for (var i = 0; i < response.data.length; i++) {
				sum += response.data[i].mark;
			}
			$scope.drinkRate = sum / response.data.length;
		});
	}
	
	drinkCategoryService.getAllDrinkCategories(loginService.user.restoran).then(function(response){
		$scope.categories = response.data;
	});
	
	$scope.fromDateOpened = false;
	$scope.openFromDate = function() {
	    $scope.fromDateOpened = true;
	};
	
	$scope.toDateOpened = false;
	$scope.openToDate = function() {
	    $scope.toDateOpened = true;
	};
	
	$scope.calculate = function() {
		var fromDateString = moment($scope.fromDate).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
		var toDateString = moment($scope.toDate).format('YYYY-MM-DDTHH:mm:ss.sss')+'Z';
		
		drinkOrderService.getProfitsInRange(loginService.user.restoran, fromDateString, toDateString).then(function(response){
			var sum = 0; 
			for (var i = 0; i < response.data.length; i++) {
				for (var j = 0; j < response.data[i].items.length; j++) {
					sum +=  response.data[i].items[j].price;
				}
			}
			$scope.rangeProfits = sum;
		});
		
	}
	
	$scope.fromDate = new Date();
	$scope.toDate = new Date();
	

	
}]);