'use strict';
  
angular.module('creativeApp')
  
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        //AuthenticationService.ClearCredentials();
  
        $scope.login = function () {
            
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response) {
                    console.log(response);
                    AuthenticationService.SetCredentials($scope.username, $scope.password, response._id);
                    $location.path('/car');
                } else {
                    $scope.error = "Username or password is incorrect";
                    $scope.dataLoading = false;
                }
            });
        };
    }]);