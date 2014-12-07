var app = angular.module('nourritureApp', [
  'ngRoute',
  'loginViewControllers',
  'registerUserViewControllers',
  'homeViewControllers'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginViewCtrl'
      }).
      when('/registerUser', {
        templateUrl: '/views/registerUser.html',
        controller: 'RegisterUserViewCtrl'
      }).
      when('/home', {
        templateUrl: '/views/home.html',
        controller: 'HomeViewCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }])

app.factory("apiFactory", ['$http', "$q", function ($http, $q) {
    var host = "http://api.nourriture.dennajort.fr";
    var urlUser = host + "/user";
    var apiFactory = {user: {}};
    var token = undefined;

    function httpGet(url, config) {
      config = config || {};
      config.headers = config.headers || {};
      if (token !== undefined)
        config.headers.Authorization = "Bearer " + token;
      return $http.get(url, config);
    }

    function httpPost(url, data, config) {
      config = config || {};
      config.headers = config.headers || {};
      if (token !== undefined)
        config.headers.Authorization = "Bearer " + token;
      return $http.post(url, data, config);
    }

    apiFactory.getToken = function() {
      return token;
    };

    apiFactory.setToken = function(t) {
      token = t;
    };

    apiFactory.user.find = function(config) {
      return httpGet(urlUser, config);
    };

    apiFactory.user.signup = function(data) {

    };

    apiFactory.user.authenticate = function(email, passwd) {
      return httpPost(urlUser + "/get_token", {
        email: email,
        passwd: passwd
      }).then(function(data) {
        token = data.token;
        return token;
      });
    };

    /*
    function signUpAndAuthenticate(data) {
      return signup(data)
        .then(function(user) {
          return authenticate(user.email, data.passwd)
            .then()
        })
        .then(null, function)
    }
    */

    /*
    apiFactory.user.authenticate("toto@toto.com", "azerty")
      .success(function(token) {

      })
      .error(fuction(data) {
        data.error
      });
    */

    return apiFactory;
  }
]);

app.controller('RouteCtrl', ['$scope', '$location', 'apiFactory', function($scope, $location, apiFactory) {
  $scope.apiFactory = apiFactory;
  $scope.isActive = function(route) {
    return route === $location.path();
  }
}]);
