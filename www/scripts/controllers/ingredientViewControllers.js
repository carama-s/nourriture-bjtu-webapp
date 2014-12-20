var ingredientViewControllers = angular.module('ingredientViewControllers', []);


ingredientViewControllers.controller('IngredientViewCtrl', ['$scope', '$routeParams', 'apiFactory',
  function($scope, $routeParams, apiFactory) {
    $scope.ingredientId = $routeParams.id;
    $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    apiFactory.ingredient.findIngredientById($routeParams.id).then(function(res) {
      $scope.ingredient = res.data;
    });


  }
]);
