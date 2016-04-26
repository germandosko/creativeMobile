angular.module('creativeApp')
	.controller ('ContactsController', function($scope, Contact) {
		
		$scope.data = Contact.query();
		/*
		var cont = Contact.get({ id : $scope.id }, function(){
			console.log(cont);
		});
		
		var conts = Contact.query(function(){
			console.log(conts)
		});

		$scope.contNew = new Contact();

		Scope.contNew.name = "newGerman";

		Contact.save($cope.contNew, function(){
			console.log('the new contact was saved')
		});
		
		*/
		//$scope.fields = ['firstName', 'lastName'];
		/*
		$scope.contacts = Contact.query();
		$scope.fields = ['firstName', 'lastName'];
		$scope.sort = function (field) {
			$scope.sort.field = field;
			$scope.sort.order = !$scope.sort.order;				
		};

		//$scope.sort.field = firstName;
		$scope.sort.order = false;
		*/
			
	})
	.controller ('UserController', function($scope, User) {
		$scope.user = new User({
			name: ['','text'],
			lastName: ['','text'],
			age: ['','text']			
		});

		User.get({}, function(data){
			console.log(data);
		});

		$scope.save = function () {
			$scope.data = User.save($scope.newUser);
		}
	});
