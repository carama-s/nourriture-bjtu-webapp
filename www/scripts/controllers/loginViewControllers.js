var loginViewControllers = angular.module('loginViewControllers', []);

loginViewControllers.controller('LoginViewCtrl', ['$scope', 'apiFactory', 'refreshInputForms', 'Facebook', "globalFactory", "$location",
  function($scope, apiFactory, refreshInputForms, Facebook, glob, $location) {
    refreshInputForms();

    $scope.loginWithFB = function() {
      console.log("Button FB clicked");
      Facebook.login({scope: 'public_profile,email'})
      .then(function(res) {
        apiFactory.user.authenticateFB(res.authResponse.userID, res.authResponse.accessToken)
          .then(function(data) {
            console.log("Success");
            if (data.need_signup == true) {
              // the user is authenticated on facebook but don't exists in our app
              glob.set("forRegisterUser", data.user);
              $location.path('/registerUser');
            } else {
              apiFactory.setToken(data.token);
              apiFactory.setUser(data.user);
              if ($scope.loginInputRemember === true) {
                ipCookie("token", data.token, {expirationUnit: 'hours', expires: 240});
              }
              $location.path('/');
            }
          });
      });
    };
  }
]);

loginViewControllers.controller("LogInFormCtrl", ['$scope', '$location', 'ipCookie', 'apiFactory', function($scope, $location, ipCookie, apiFactory) {
  $scope.submitLogIn = function(isValid) {
    $scope.submitted = true;
    if (isValid) {
      apiFactory.user.authenticate($scope.loginInputEmail, $scope.loginInputPassword)
        .then(function(data) {
          apiFactory.setToken(data.token);
          apiFactory.setUser(data.user);
          if ($scope.loginInputRemember === true) {
            ipCookie("token", data.token, {expirationUnit: 'hours', expires: 240});
          }
          $location.path('/');
        }, function(data) {
          $scope.badPassword = true;
          ipCookie.remove("token");
        });
    }
  };
}]);
