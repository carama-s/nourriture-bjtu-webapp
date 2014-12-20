var ingredientViewControllers = angular.module('ingredientViewControllers', []);


ingredientViewControllers.controller('IngredientViewCtrl', ['$scope', '$routeParams', '$location', 'apiFactory', 'categories_mapper',
  function($scope, $routeParams, $location, apiFactory, categories_mapper) {
    $scope.ingredientId = $routeParams.id;
    $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $scope.categories_mapper = categories_mapper;

    apiFactory.ingredient.findIngredientById($routeParams.id).then(function(res) {
      $scope.ingredient = res.data;
    });


  $scope.deleteIngredient = function() {
    apiFactory.ingredient.deleteById($routeParams.id).then(function(res) {
      $location.path("/ingredients");
    });
  };


  }
]);
