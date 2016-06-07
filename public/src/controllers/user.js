angular.module('creativeApp')
	.controller ('UserController', function($scope, User) {
		/*
		$scope.user = new User({
			name: ['','text'],
			lastName: ['','text'],
			company: ['','text'],
			email: ['','text'],
			phone: ['','text'],
			nickname: ['','text'],
			nickname: ['','text'],
			nickname: ['','text'],			
		});
		*/
		User.get({}, function(data){
			console.log(data);
		});

		$scope.save = function () {
			$scope.data = User.save($scope.newUser);
		}
	});
