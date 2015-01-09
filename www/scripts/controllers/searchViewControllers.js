var searchViewControllers = angular.module('searchViewControllers', []);

searchViewControllers.controller('SearchViewCtrl', ['$scope', "$location", 'apiFactory',
  function($scope, $location, apiFactory) {
    var qs = $location.search();
    if (!qs.q) return $location.url("/");

    var where = _.map(qs.q.split(" "), function(e) {
      return {name: {contains: e}};
    });
    apiFactory.recipe.find({
      params: {
        where: JSON.stringify({or: where})
      }
    }).then(function(res) {
      $scope.recipes = res.data;
    });
  }
]);
