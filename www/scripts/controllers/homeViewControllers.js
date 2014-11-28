var homeViewControllers = angular.module('homeViewControllers', []);

homeViewControllers.controller('HomeViewCtrl', ['$scope', 'userService',
  function($scope, userService) {
    $scope.user = userService;

  }]);
