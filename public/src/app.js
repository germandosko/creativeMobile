angular.module('creativeApp', ['ngRoute', 'ngResource'])
	.config (function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/user', {
				controller: 'UserController',
				templateUrl: 'views/users.html'
			});
		$locationProvider.html5Mode(true);
	});
