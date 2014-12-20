var ingredientViewControllers = angular.module('ingredientViewControllers', []);


ingredientViewControllers.controller('IngredientViewCtrl', ['$scope', '$routeParams', 'apiFactory', 'categories_mapper',
  function($scope, $routeParams, apiFactory, categories_mapper) {
    $scope.ingredientId = $routeParams.id;
    $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $scope.categories_mapper = categories_mapper;

    apiFactory.ingredient.findIngredientById($routeParams.id).then(function(res) {
      $scope.ingredient = res.data;
    });


  }
]);
