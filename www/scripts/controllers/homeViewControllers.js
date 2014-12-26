var homeViewControllers = angular.module('homeViewControllers', []);

homeViewControllers.controller('HomeViewCtrl', ['$scope', 'apiFactory',
  function($scope, apiFactory) {
    $scope.apiFactory = apiFactory;
  }
]);

homeViewControllers.controller("HomeNavUserCtrl", ['$scope', '$location', 'ipCookie', 'apiFactory', "apiSocketFactory",
  function($scope, $location, ipCookie, apiFactory, apiSocket) {
    apiSocket.subscribe(["ingredient.new"], $scope);

    $scope.$on("apiSocket:ingredient.new", function(ev, data) {
      console.log("ingredient.new");
      console.log(data);
    });

    $scope.logOut = function() {
      ipCookie.remove('token');
      apiFactory.setToken(undefined);
      $location.path('/');
    };
  }
]);
