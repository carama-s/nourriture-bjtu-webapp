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

homeViewControllers.controller("BestRecipesCtrl", ["$scope", 'apiFactory', 'apiSocketFactory',
  function($scope, apiFactory, socket) {
    $scope.recipes = [];

    socket.subscribe(["timeline.create"], $scope);

    $scope.$on("apiSocket:timeline.create", function(event, data) {
      if (event.domain == "recipe_rate") {
        getBestRecipes();
      }
    });

    function getBestRecipes() {
      apiFactory.recipe.find({
        params: {
          sort: "rate DESC",
          limit: 10
        }
      }).then(function(res) {
        $scope.recipes = res.data;
      });
    }

    getBestRecipes();
  }
]);

homeViewControllers.controller("LatestCommentsCtrl", ["$scope", 'apiFactory', 'apiSocketFactory',
  function($scope, apiFactory, socket) {
    $scope.comments = [];

    socket.subscribe(["timeline.create"], $scope);

    $scope.$on("apiSocket:timeline.create", function(event, data) {
      if (event.domain == "recipe_comment") {
        if (event.name == "create") {
          $scope.comments.unshift(data);
          if ($scope.comments.length > 10) {
            $scope.comments.pop();
          }
        } else {
          getLatestComments();
        }
      }
    });

    function getLatestComments() {
      apiFactory.recipe_comment.find({
        params: {
          sort: "createdAt DESC",
          limit: 10
        }
      }).then(function(res) {
        $scope.comments = res.data;
      });
    }

    getLatestComments();
  }
]);

homeViewControllers.controller("SocketTimelineCtrl", ['$scope', 'apiFactory', 'apiSocketFactory', 'socket_domain_mapper', 'socket_name_mapper',
  function($scope, apiFactory, apiSocketFactory, socket_domain_mapper, socket_name_mapper) {

    var domains = ["ingredient", "recipe"];

    function checkDestroyed(elements) {
      var destroyed = [];
      _(elements).forEach(function(value, i) {
        if (value.name == 'destroy') {
          destroyed.push(value.data.id);
          value.destroyed = true;
        } else {
          value.destroyed = _.contains(destroyed, value.data.id);
        }
      });
      return elements;
    }

    apiSocketFactory.subscribe(["timeline.create"], $scope);
    $scope.$on("apiSocket:timeline.create", function(event, data) {
      if (_.contains(domains, event.domain)) {
        $scope.timeline.unshift(data);
        $scope.timeline = checkDestroyed($scope.timeline);
      }
    });

    $scope.socket_domain_mapper = socket_domain_mapper;
    $scope.socket_name_mapper = socket_name_mapper;
    var config = {
      params: {
        sort: "createdAt DESC",
        limit: 10,
        domain: domains
      }
    };

    apiFactory.timeline.find(config).then(function(res) {
      $scope.timeline = checkDestroyed(res.data);
    });

  }
]);

homeViewControllers.controller("HomeNavUserCtrl", ['$scope', '$location', 'apiFactory',
  function($scope, $location, apiFactory) {

    $scope.logOut = function() {
      apiFactory.logout("/");
    };
  }
]);
