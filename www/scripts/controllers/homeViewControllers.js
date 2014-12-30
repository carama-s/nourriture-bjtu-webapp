var homeViewControllers = angular.module('homeViewControllers', []);

homeViewControllers.controller('HomeViewCtrl', ['$scope', 'apiFactory', 'apiSocketFactory',
  function($scope, apiFactory, socket) {
    $scope.apiFactory = apiFactory;

    socket.subscribe(["ingredient.create", "ingredient.update", "ingredient.destroy"], $scope);

    $scope.$on("apiSocket:ingredient.create", function(event, data) {
      console.log("ingredient.create");
      console.log(data);
    });
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
