angular.module('creativeApp')	
	.factory('User', function($resource) {
		return $resource('/api/user/:id', {id: '@id'}, {			
		});
	});
