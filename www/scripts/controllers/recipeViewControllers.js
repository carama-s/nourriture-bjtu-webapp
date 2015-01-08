var recipeViewControllers = angular.module('recipeViewControllers', []);


recipeViewControllers.controller('RecipeViewCtrl', ['$scope', '$routeParams', '$location', '$document', 'apiFactory', 'recipe_categories_mapper',
  function($scope, $routeParams, $location, $document, apiFactory, recipe_categories_mapper) {
    $scope.loaded = false;
    $scope.recipeId = $routeParams.id;
    $scope.recipe_categories_mapper = recipe_categories_mapper;
    apiFactory.recipe.findById($routeParams.id).then(function(res) {
      $scope.recipe = res.data;
      $scope.loaded = true;
    });

    $scope.deleteRecipe = function() {
      apiFactory.recipe.deleteById($routeParams.id).then(function(res) {
        $location.path("/recipes");
      });
    };


    $scope.rate = 4;
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.ratingStates = [
      {stateOn: 'glyphicon-star rating-star-selected', stateOff: 'glyphicon-star rating-star-unselected'},
      {stateOn: 'glyphicon-star rating-star-selected', stateOff: 'glyphicon-star rating-star-unselected'},
      {stateOn: 'glyphicon-star rating-star-selected', stateOff: 'glyphicon-star rating-star-unselected'},
      {stateOn: 'glyphicon-star rating-star-selected', stateOff: 'glyphicon-star rating-star-unselected'},
      {stateOn: 'glyphicon-star rating-star-selected', stateOff: 'glyphicon-star rating-star-unselected'}
    ];
  }
]);
