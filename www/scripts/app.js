var app = angular.module('nourritureApp', [
  'ngRoute',
  'ipCookie',
  'editUserViewControllers',
  'loginViewControllers',
  'registerUserViewControllers',
  'homeViewControllers',
  'ingredientViewControllers',
  'ingredientsViewControllers',
  'addIngredientViewControllers'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/editUser', {
        templateUrl: '/views/editUser.html',
        controller: 'EditUserViewCtrl'
      }).
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
      when('/ingredients', {
        templateUrl: '/views/ingredients.html',
        controller: 'IngredientsViewCtrl'
      }).
      when('/ingredient/:id', {
        templateUrl: '/views/ingredient.html',
        controller: 'IngredientViewCtrl'
      }).
      when('/addIngredient', {
        templateUrl: '/views/addIngredient.html',
        controller: 'addIngredientViewCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }])

app.run(["$rootScope", "$location", "apiFactory", function($rootScope, $location, apiFactory) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    if (apiFactory.getToken() != undefined) { // user logged
      if (next.templateUrl) {
        if (next.templateUrl == "/views/login.html" || next.templateUrl == "/views/registerUser.html") {
          $location.path("/");
        }
      }
    }
  });
}])

app.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
          scope.$apply(function(){
            console.log(model);
console.log(element[0].files[0]);

              modelSetter(scope, element[0].files[0]);
          });
      });
    }
  };
}]);

app.factory("refreshInputForms", [function() {
  return function() {
    var text_inputs = $('input[type=text], input[type=password], input[type=email], textarea');

    text_inputs.each(function(){
      if($(this).val().length !== 0) {
       $(this).siblings('label').addClass('active');
      }
    })

    text_inputs.focus(function () {
      $(this).siblings('label').addClass('active');
    });

    text_inputs.blur(function () {
      if ($(this).val().length === 0) {
        $(this).siblings('label').removeClass('active');
      }
    });
  }
}]);

app.factory("apiFactory", ['$http', "$q", "ipCookie", function ($http, $q, ipCookie) {
    var host = "http://api.nourriture.dennajort.fr";
    var urlUser = host + "/user";
    var urlIngredient = host + "/ingredient";

    var apiFactory = {user: {}, ingredient: {}};
    var token = undefined;
    var user = undefined;

    function httpGet(url, config) {
      config = config || {};
      config.headers = config.headers || {};
      var token = apiFactory.getToken();
      if (token !== undefined) {
        config.headers.Authorization = "Bearer " + token;
      }
      return $http.get(url, config);
    }

    function httpPost(url, data, config) {
      config = config || {};
      config.headers = config.headers || {};
      var token = apiFactory.getToken();
      if (token !== undefined)
        config.headers.Authorization = "Bearer " + token;
      return $http.post(url, data, config);
    }

    apiFactory.getToken = function() {
      if (token)
        return token;
      return ipCookie("token");
    };

    apiFactory.setToken = function(t) {
      token = t;
    };

    apiFactory.getUser = function() {
      return user;
    };

    /* API USER */

    apiFactory.setUser = function(u) {
      user = u;
    };

    apiFactory.user.find = function(config) {
      return httpGet(urlUser, config);
    };

    apiFactory.user.me = function() {
      return httpGet(urlUser + "/me").then(function(res) {
        return res.data;
      });
    };

    apiFactory.user.signup = function(firstname, lastname, gender, username, email, passwd) {
      return httpPost(urlUser + "/signup", {
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        username: username,
        email: email,
        passwd: passwd
      });
    };

    apiFactory.user.authenticate = function(email, passwd) {
      return httpPost(urlUser + "/get_token", {
        email: email,
        passwd: passwd
      }).then(function(res) {
        return res.data;
      });
    };

    apiFactory.user.changePassword = function(old_pwd, new_pwd) {
      return httpPost(urlUser + "/change_passwd", {
        old_passwd: old_pwd,
        new_passwd: new_pwd
      }).then(function(res) {
        return res;
      });
    };

    apiFactory.user.editUser = function(data) {
      return httpPost(urlUser + "/update", data);
    };

    /* API INGREDIENT */

    apiFactory.ingredient.findIngredient = function(config) {
      return httpGet(urlIngredient, config);
    };

    apiFactory.ingredient.findIngredientById = function(id, config) {
      return httpGet(urlIngredient + '/' + id, config);
    };


    apiFactory.ingredient.createIngredient = function(data, config) {
      return httpPost(urlIngredient + "/create", data, config);
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

app.controller('MainAppCtrl', ['$scope', 'ipCookie', 'apiFactory',
  function($scope, ipCookie, apiFactory) {
    $scope.loaded = true;
    $scope.apiFactory = apiFactory;
    if (apiFactory.getToken()) {
      $scope.loaded = false;
      apiFactory.user.me()
        .then(function(data) { // token is the same
          apiFactory.setUser(data);
        }, function(data) { // invalid token
          //ipCookie.remove('token');
        })
        .then(function() {
          $scope.loaded = true;
        });
    }
  }
]);

app.controller('RouteCtrl', ['$scope', '$location', 'apiFactory', function($scope, $location, apiFactory) {
  $scope.apiFactory = apiFactory;
  $scope.isActive = function(route) {
    return route === $location.path();
  };

  $scope.go = function (path) {
    $location.path(path);
  };
}]);
