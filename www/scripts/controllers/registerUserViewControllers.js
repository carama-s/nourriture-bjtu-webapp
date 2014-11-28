var registerUserViewControllers = angular.module('registerUserViewControllers', []);

registerUserViewControllers.controller('RegisterUserViewCtrl', ['$scope',
  function($scope) {

  }
]);

registerUserViewControllers.controller("RegisterFormCtrl", ['$scope', function($scope) {
  $scope.submitRegister = function(isValid) {
    $scope.submitted = true;
    if (isValid) {
      alert("OK LogIn Form !");
    }
  };
}]);
