var editUserViewControllers = angular.module('editUserViewControllers', []);

editUserViewControllers.controller('EditUserViewCtrl', ['$scope', 'apiFactory',
  function($scope, apiFactory) {
    $scope.apiFactory = apiFactory;
  }
]);

editUserViewControllers.controller("EditUserFormCtrl", ['$scope', '$timeout', 'apiFactory', 'refreshInputForms',
  function($scope, $timeout, apiFactory, refreshInputForms) {
    $scope.editUserInputFirstname = apiFactory.getUser().firstname;
    $scope.editUserInputLastname = apiFactory.getUser().lastname;
    $scope.editUserInputGender = apiFactory.getUser().gender;
    $scope.editUserInputEmail = apiFactory.getUser().email;

    $scope.emailAlreadyExists = false;

    $scope.submitEditUser = function(isValid) {
      $scope.submitted = true;

      if (isValid) {
        apiFactory.user.editUser({'firstname': $scope.editUserInputFirstname, 'lastname': $scope.editUserInputLastname, 'gender': $scope.editUserInputGender, 'email': $scope.editUserInputEmail })
          .then(function(res) {
            alert("success change user info");
          }, function(res) {
              if (res.data.name == "ValidationError") {
                var mapping = {email: "emailAlreadyExists"};
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
    }
    $timeout(refreshInputForms);
  }
]);

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
