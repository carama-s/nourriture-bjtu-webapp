var homeViewControllers = angular.module('homeViewControllers', []);

homeViewControllers.controller('HomeViewCtrl', ['$scope', 'apiFactory', 'apiSocketFactory',
  function($scope, apiFactory, socket) {
    $scope.apiFactory = apiFactory;

    socket.subscribe(["timeline.create"], $scope);

    $scope.$on("apiSocket:timeline.create", function(event, data) {
      console.log("timeline.create");
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
