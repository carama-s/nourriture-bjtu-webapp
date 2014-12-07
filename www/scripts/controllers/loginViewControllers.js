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
        .success(function(token) {
        })
        .error(function(data) {
          console.log(data);
        });
    }
  };
}]);
