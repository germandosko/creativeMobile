angular.module('creativeApp')
	.controller ('CarController', function($scope, $rootScope, $http, $window, Car, $routeParams, $mdDialog) {
		console.log($scope.currentUser);
		$scope.newService = {};
		$scope.newService.date = new Date();
		$scope.info = {};

		if($routeParams.id) {
			Car.get({'_id' : $routeParams.id}, function(res = null) {
				//todo: try to have a services object for this.
				angular.forEach(res.services, function(value, key) {
					value.date = new Date(value.date);
				});
				$scope.car = res;
			}, function(error) {
				$window.location.href = '/car';
			});
		}
	
		/**
		 * Function to search a new car
		 */
		$scope.searchCar = function () {
			if($scope.info.patent) {
				$scope.info.patent = $scope.info.patent.toUpperCase();
				Car.search({'patent' : $scope.info.patent, 'userId': $rootScope.globals.currentUser.id}, function(res = null) {
					// Todo: Verificar porque no esta cargado carsSearched, luego de redireccionar.
					$window.location.href = '/car/' + res._id;
				}, function(error) {
					$scope.searchNotFound = true;
				});
			}
		};

		$scope.SearchNewCar = function () {
			$window.location.href = '/car';
		};

		$scope.showNewCarForm = function () {
			$window.location.href = '/car/new';
		};

		$scope.cancelNewCarForm = function () {
			$window.location.href = '/car';
		};

		$scope.newCar = function () {
			$scope.info.patent = $scope.info.patent.toUpperCase();
			$scope.info.userId = $rootScope.globals.currentUser.id;
			Car.newcar($scope.info, function(res) {
				$window.location.href = '/car/' + res._id;
			});
		};

		$scope.editCar = function (car) {
            $scope.copyCar = angular.copy(car);
            car.isEditingCar = car.isEditingCar ? false : true; 
		};

		$scope.cancelEditCar = function (car) {
            //$("#carTable input").hide();
            angular.copy($scope.copyCar, car);
            $scope.copyCar.isEditingCar = $scope.copyCar.isEditingCar ? false : true;                   
		};

		$scope.saveEditCar = function (car) {
			car.patent = car.patent.toUpperCase();
			Car.editCar(car, function(res) {
				if(res.result) {
					$("#carTable input").hide();
					car.isEditingCar = car.isEditingCar ? false : true;
				}
			}); 
		};

		$scope.activeService = function (services) {
            angular.forEach(services, function(value, key) {
  				value.isEditingServ = false;
			});	
			if ($scope.isAddingService) {
				$scope.isAddingService = false;
			} else {
				$scope.newService.date  = new Date();
				$scope.newService.description  = "";
				$scope.newService.price  = "";
				$scope.isAddingService = true;
			}
		};

		$scope.saveService = function (id, serv) { 
			serv.carId = id;
			/*
			Car.newservice(serv)
				.then(function(res) {
					if(!res.result) {
						$scope.isAddingService = false;
						res.date = new Date(res.date);
						$scope.car.services.unshift(res);
					}
				});
			*/
			Car.newservice(serv, function(res){
				if(!res.result) {
					$scope.isAddingService = false;
					res.date = new Date(res.date);
					$scope.car.services.unshift(res);
				}
			});

		};

		$scope.updateService = function (id, serv) { 
			serv.carId = id;
			Car.updateservice(serv, function(res) {
				if(res.result) {
					$("#servicesTable input").hide();
					serv.isEditingServ = false;
				}
			});
		};

		$scope.editService = function (serv, services) { 
            angular.forEach(services, function(value, key) {
  				value.isEditingServ = false;
			});			
            $scope.copyService = angular.copy(serv);
            $scope.isAddingService = false;
            serv.isEditingServ = true;

		};

		$scope.cancelEditService = function (serv) { 
            $("#servicesTable input").hide();
            angular.copy($scope.copyService, serv);            
            serv.isEditingServ = false;			
		};
		
		$scope.deleteCar = function(car) {
			var confirm = $mdDialog.confirm({
			    title: 'Cuidado',
			    textContent: 'Realmente desea eliminar un AUTO?',
			    cancel: "Cancelar",
			    ok: 'Si'
			});
			$mdDialog
			.show( confirm )
			.then(function() {
				Car.remove(car, function(res) {
					if(res.result) {
						$window.location.href = '/car';
					}
				});
			});
		};

		$scope.deleteService = function(id, serv, index) {
			var confirm = $mdDialog.confirm({
			    title: 'Cuidado',
			    textContent: 'Realmente desea eliminar un SERVICIO?',
			    cancel: "Cancelar",
			    ok: 'Si'
			});
			$mdDialog
			.show( confirm )
			.then(function() {
				serv.carId = id;
				Car.deleteservice(serv, function(res) {
					if(res.result) {
						$scope.car.services.splice(index, 1);
					}
				});
			});
		};

		$scope.onlyNumber = function(event) {
			if((event.charCode <= 47 || event.charCode >= 58) && event.charCode != 0) {
				event.preventDefault();
			};
		};

		var defaultPatentMask = "AAA-999";
		$scope.patentMask = defaultPatentMask;
		$scope.changePatent = function() {
			if ($scope.patentMask == defaultPatentMask) {
				$scope.patentMask = "AA-999-AA";  
			} else {
				$scope.patentMask = defaultPatentMask;
			}
		}

	});
