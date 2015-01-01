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

homeViewControllers.controller("SocketTimelineCtrl", ['$scope', 'apiFactory', 'apiSocketFactory', 'socket_domain_mapper', 'socket_name_mapper',
  function($scope, apiFactory, apiSocketFactory, socket_domain_mapper, socket_name_mapper) {

    function checkDestroyed(elements) {
      var destroyed = [];
      _(elements).forEach(function(value, i) {
        if (value.name == 'destroy') {
          destroyed.push(value.ingredient.id);
          value.destroyed = true;
        } else {
          value.destroyed = _.contains(destroyed, value.ingredient.id);
        }
      });
      return elements;
    }

    apiSocketFactory.subscribe(["timeline.create"], $scope);
    $scope.$on("apiSocket:timeline.create", function(event, data) {
      $scope.timeline.unshift(data);
      $scope.timeline = checkDestroyed($scope.timeline);
    });

    $scope.socket_domain_mapper = socket_domain_mapper;
    $scope.socket_name_mapper = socket_name_mapper;
    var config = {
      params: {
        sort: "createdAt DESC",
        limit: 10
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
      apiFactory.logout();
      $location.path('/');
    };
  }
]);
