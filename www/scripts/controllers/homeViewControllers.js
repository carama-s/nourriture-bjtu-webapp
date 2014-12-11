var homeViewControllers = angular.module('homeViewControllers', []);

homeViewControllers.controller('HomeViewCtrl', ['$scope', 'ipCookie', 'apiFactory',
  function($scope, ipCookie, apiFactory) {
    $scope.apiFactory = apiFactory;

    if (apiFactory.getToken()) {
      apiFactory.user.me()
        .then(function(data) { // token is the same
          apiFactory.setUser(data);
        }, function(data) { // invalid token
          //ipCookie.remove('token');
        });
    }
  }
]);

homeViewControllers.controller("HomeNavUserCtrl", ['$scope', '$location', 'ipCookie', 'apiFactory', function($scope, $location, ipCookie, apiFactory) {
  $scope.logOut = function() {
    ipCookie.remove('token');
    $location.path('/');
  };

}]);
