var loginViewControllers = angular.module('loginViewControllers', []);

loginViewControllers.controller('LoginViewCtrl', ['$scope', 'apiFactory',
  function($scope, apiFactory) {

  }
]);

loginViewControllers.controller("LogInFormCtrl", ['$scope', 'apiFactory', function($scope, apiFactory) {
  $scope.submitLogIn = function(isValid) {
    $scope.submitted = true;
    if (isValid) {
      apiFactory.user.authenticate($scope.loginInputEmail, $scope.loginInputPassword)
        .then(function(token) {
          console.log(token);
        }, function(data) {
          console.log(data);
        });
    }
  };
}]);
