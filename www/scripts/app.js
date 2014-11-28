var app = angular.module('nourritureApp', [
  'ngRoute',
  'loginViewControllers',
  'homeViewControllers'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginViewCtrl'
      }).
      when('/home', {
        templateUrl: '/views/home.html',
        controller: 'HomeViewCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]).
  controller('routeController', ['$scope', '$location', function($scope, $location) {
    $scope.currentLocation = "OK";
  }]);

app.service("userService", [
  function () {
    var user = {};

    user.token = undefined;
    user.login = undefined;

    user.isLogged = function() { return user.token ? true : false; };

    return user;
  }
]);

app.controller('RouteCtrl', function($scope, $location) {
  $scope.isActive = function(route) {
    return route === $location.path();
  }
});
