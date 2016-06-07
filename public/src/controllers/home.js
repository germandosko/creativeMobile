'use strict';
  
angular.module('creativeApp')
  
.controller('HomeController',
    ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location, AuthenticationService) {

    	$scope.showLogin = function() {
    		$location.path('/login');
    	};

    }]);