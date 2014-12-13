var changePasswordUserViewControllers = angular.module('changePasswordUserViewControllers', []);

changePasswordUserViewControllers.controller('ChangePasswordUserViewCtrl', ['$scope',
  function($scope) {
  }
]);

changePasswordUserViewControllers.controller("ChangePasswordFormCtrl", ['$scope', 'apiFactory', function($scope, apiFactory) {

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
