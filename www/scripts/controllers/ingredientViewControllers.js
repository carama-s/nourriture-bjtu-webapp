var ingredientViewControllers = angular.module('ingredientViewControllers', []);


ingredientViewControllers.controller('IngredientViewCtrl', ['$scope', '$routeParams', 'apiFactory',
  function($scope, $routeParams, apiFactory) {
    $scope.ingredientId = $routeParams.id;
    $scope.months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

    apiFactory.ingredient.findIngredientById($routeParams.id).then(function(res) {
      $scope.ingredient = res.data;
    });


  }
]);
