var registerUserViewControllers = angular.module('registerUserViewControllers', []);

registerUserViewControllers.controller('RegisterUserViewCtrl', ['$scope', 'refreshInputForms',
  function($scope, refreshInputForms) {
    refreshInputForms();
  }
]);

registerUserViewControllers.controller("RegisterFormCtrl", ['$scope', 'apiFactory', "globalFactory", function($scope, apiFactory, glob) {
  var initData = glob.pop("forRegisterUser");
  var facebookMode = undefined;
  if (initData === undefined) {
    facebookMode = false;
    $scope.registerInputGender = "male";
  } else {
    facebookMode = true;
    $scope.registerInputGender = initData.gender;
    $scope.registerInputFirstname = initData.firstname;
    $scope.registerInputLastname = initData.lastname;
    $scope.registerInputEmail = initData.email;
  }

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
      var fn = undefined;
      if (facebookMode) {
        fn = apiFactory.user.signupFB($scope.registerInputFirstname, $scope.registerInputLastname, $scope.registerInputGender,
                                    $scope.registerInputUsername, $scope.registerInputEmail, $scope.registerInputPassword,
                                    initData.facebook_id, initData.facebook_token);
      } else {
        fn = apiFactory.user.signup($scope.registerInputFirstname, $scope.registerInputLastname, $scope.registerInputGender,
                                    $scope.registerInputUsername, $scope.registerInputEmail, $scope.registerInputPassword);
      }
      fn.then(function(res) {
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
