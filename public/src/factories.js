angular.module('creativeApp')	
	.factory('Contact', function($resource) {
		return $resource('/api/contacts/:id', {id: '@id'}, {

		});
	})
	.factory('User', function($resource) {
		return $resource('/api/user/:id', {id: '@id'}, {
		});
	});



