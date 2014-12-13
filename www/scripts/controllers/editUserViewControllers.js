var editUserViewControllers = angular.module('editUserViewControllers', []);

editUserViewControllers.controller('EditUserViewCtrl', ['$scope', 'apiFactory',
  function($scope, apiFactory) {
    $scope.apiFactory = apiFactory;
  }
]);

editUserViewControllers.controller("EditUserFormCtrl", ['$scope', 'apiFactory', function($scope, apiFactory) {
  console.log(apiFactory);
  $scope.editUserInputFirstname = apiFactory.getUser().firstname;
  $scope.editUserInputLastname = apiFactory.getUser().lastname;
  $scope.editUserInputGender = apiFactory.getUser().gender;
  $scope.editUserInputUsername = apiFactory.getUser().username;
  $scope.editUserInputEmail = apiFactory.getUser().email;

  $scope.submitEditUser = function(isValid) {
    $scope.submitted = true;

    if (isValid) {
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

editUserViewControllers.controller("ChangePasswordFormCtrl", ['$scope', 'apiFactory', function($scope, apiFactory) {
  $scope.submitChangePassword = function(isValid) {
    $scope.submitted = true;
    $scope.passwordDontMatch = false;
    $scope.badCurrentPassword = false;

    if (isValid) {
      if ($scope.changePasswordInputNewPassword != $scope.changePasswordInputConfirmNewPassword) {
        $scope.passwordDontMatch = true;
        return;
      }
      apiFactory.user.changePassword($scope.changePasswordInputCurrentPassword, $scope.changePasswordInputNewPassword)
        .then(function(res) {
          alert("success change pwd");
        }, function(res) {
          $scope.badCurrentPassword = true;
        });
    }
  };
}]);
