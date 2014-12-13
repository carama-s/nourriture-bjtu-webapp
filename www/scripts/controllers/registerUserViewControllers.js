var registerUserViewControllers = angular.module('registerUserViewControllers', []);

registerUserViewControllers.controller('RegisterUserViewCtrl', ['$scope',
  function($scope) {
  }
]);

registerUserViewControllers.controller("RegisterFormCtrl", ['$scope', 'apiFactory', function($scope, apiFactory) {
  $scope.registerInputGender = "male";

  $scope.submitRegister = function(isValid) {
    $scope.submitted = true;
    $scope.usernameAlreadyExists = false;
    $scope.emailAlreadyExists = false;
    $scope.passwordDontMatch = false;

    if (isValid) {
      if ($scope.registerInputPassword != $scope.registerInputConfirmPassword) {
        $scope.passwordDontMatch = true;
        return;
      }
      apiFactory.user.signup($scope.registerInputFirstname, $scope.registerInputLastname, $scope.registerInputGender,
                             $scope.registerInputUsername, $scope.registerInputEmail, $scope.registerInputPassword)
        .then(function(res) {
          alert("success register");
        }, function(res) {
          if (res.data.name == "ValidationError") {
            var mapping = {username: "usernameAlreadyExists", email: "emailAlreadyExists"};
            for (fieldName in res.data.errors) {
              var field = res.data.errors[fieldName];
              if (field.type == "user defined") {
                // already exists
                var realName = mapping[fieldName];
                $scope[realName] = true;
              }
            }
          }
          else {
            // server problem
          }
        });
    }
  };
}]);
