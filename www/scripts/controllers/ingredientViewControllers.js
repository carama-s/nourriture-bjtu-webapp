var ingredientViewControllers = angular.module('ingredientViewControllers', []);


ingredientViewControllers.controller('IngredientViewCtrl', ['$scope', '$routeParams', 'apiFactory',
  function($scope, $routeParams, apiFactory) {
    $scope.ingredientId = $routeParams.id;

    apiFactory.ingredient.findIngredientById($routeParams.id).then(function(res) {
      $scope.ingredient = res.data;
    });


  }
]);
