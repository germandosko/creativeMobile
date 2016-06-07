angular.module('creativeApp', ['ngRoute', 'ngCookies', 'ngResource', 'ngMaterial', 'ngMessages', 'angularMoment', 'ui.mask'])
	.config (function($routeProvider, $locationProvider, $mdDateLocaleProvider) {
		$routeProvider
			.when('/user', {
				controller: 'UserController',
				templateUrl: 'views/users.html'
			}).when('/login', {
				controller: 'LoginController',
				templateUrl: 'views/login.html'
			}).when('/car', {
				controller: 'CarController',
				templateUrl: 'views/car.html'
			}).when('/car/new', {
				controller: 'CarController',
				templateUrl: 'views/car-new.html'
			}).when('/car/:id', {
				controller: 'CarController',
				templateUrl: 'views/car-services.html'
			}).when('/home', {
				controller: 'HomeController',
				templateUrl: 'views/home.html'
			}).otherwise({ redirectTo: '/login' });
		$locationProvider.html5Mode(true);
	    $mdDateLocaleProvider.formatDate = function(date) {
       		return moment(date).format('DD-MM-YYYY');
    	};
	}).run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
        	$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);