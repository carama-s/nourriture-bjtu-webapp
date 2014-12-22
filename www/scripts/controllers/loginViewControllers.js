var loginViewControllers = angular.module('loginViewControllers', []);

loginViewControllers.controller('LoginViewCtrl', ['$scope', 'apiFactory', 'refreshInputForms', 'Facebook',
  function($scope, apiFactory, refreshInputForms, Facebook) {
    refreshInputForms();

    $scope.loginWithFB = function() {
      console.log("Hello world !");
      Facebook.login({scope: 'public_profile,email'})
      .then(function(res) {
        console.log("Logged with Facebook !");
        apiFactory.user.authenticateFB(res.authResponse.userID, res.authResponse.accessToken)
          .then(function(data) {
            console.log("Success");
            if (data.need_signup == true) {
              // the user is authenticated on facebook but don't exists in out app
            } else {
              apiFactory.setToken(data.token);
              apiFactory.setUser(data.user);
              if ($scope.loginInputRemember === true) {
                ipCookie("token", data.token, {expirationUnit: 'hours', expires: 240});
              }
              $location.path('/');
            }
          }, function(data) {
            console.error("Failure");
          });
      }, function(res) {
        console.log("Failed to log with Facebook !");
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
