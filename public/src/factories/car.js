angular.module('creativeApp')	
	.factory('Car', function($resource) {
		return $resource('/api/car/:id', {id: '@id'}, {
			search: {method: 'post', url: '/api/car/search'},
			newcar: {method: 'post', url: '/api/car/newcar'},
			editCar: {method: 'post', url: '/api/car/editcar'},
			newservice: {method: 'post', url: '/api/car/newservice'},
			updateservice: {method: 'post', url: '/api/car/updateservice'},
			deleteservice: {method: 'post', url: '/api/car/deleteservice'}			
		});
	});

