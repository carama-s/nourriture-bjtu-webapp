var loginViewControllers = angular.module('loginViewControllers', []);

loginViewControllers.controller('LoginViewCtrl', ['$scope', 'userService',
  function($scope, userService) {
    $scope.user = userService;

    $scope.connect = function() {
      userService.token = "000000";
    };
  }
]);

app.controller("LogInFormCtrl", ['$scope', function($scope) {
  $scope.submitLogIn = function(isValid) {
    $scope.submitted = true;
    if (isValid) {
      alert("OK LogIn Form !");
    }
  };
}]);
