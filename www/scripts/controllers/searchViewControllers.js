var searchViewControllers = angular.module('searchViewControllers', []);

searchViewControllers.controller("SearchViewCtrl", [function() {}]);

searchViewControllers.controller("SearchBarCtrl", ["$scope", "$location",
  function($scope, $location) {
    var qs = $location.search();
    $scope.searchValue = qs.q || "";

    $scope.onSubmit = function() {
      if ($scope.searchValue.length > 0) {
        $location.url("/search?q=" + encodeURI($scope.searchValue));
      }
    };
  }
]);

searchViewControllers.controller('SearchViewResult', ['$scope', "$location", 'apiFactory',
  function($scope, $location, apiFactory) {
    var qs = $location.search();
    if (!qs.q) return $location.url("/");

    apiFactory.common.search({
      params: {search: qs.q}
    }).then(function(res) {
      $scope.results = res.data;
    });
  }
]);
