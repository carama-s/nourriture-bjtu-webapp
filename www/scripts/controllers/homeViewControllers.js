var homeViewControllers = angular.module('homeViewControllers', []);

homeViewControllers.controller('HomeViewCtrl', ['$scope', 'apiFactory',
  function($scope, apiFactory) {
    $scope.apiFactory = apiFactory;
  }
]);

homeViewControllers.controller("HomeNavUserCtrl", ['$scope', '$location', 'ipCookie', 'apiFactory',
  function($scope, $location, ipCookie, apiFactory) {

    $scope.logOut = function() {
      ipCookie.remove('token');
      apiFactory.setToken(undefined);
      $location.path('/');
    };
  }
]);
