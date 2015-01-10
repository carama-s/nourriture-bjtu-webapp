var recipeViewControllers = angular.module('recipeViewControllers', []);

recipeViewControllers.controller('RecipeViewCtrl', ['$scope', '$routeParams', '$location', '$document', 'apiFactory', 'recipe_categories_mapper',
  function($scope, $routeParams, $location, $document, apiFactory, recipe_categories_mapper) {
    $scope.loaded = false;
    $scope.recipeId = $routeParams.id;
    $scope.recipe_categories_mapper = recipe_categories_mapper;
    apiFactory.recipe.findById($routeParams.id).then(function(res) {
      $scope.recipe = res.data;
      $scope.rate = res.data.rate;

      var ingredients = _.pluck(res.data.ingredients, "ingredient");
      var quantities = _.mapValues(_.groupBy(res.data.ingredients, "ingredient"), function(ings) {
        return ings[0].quantity;
      });
      var config = {
        params: {
          where: JSON.stringify({id: ingredients})
        }
      };
      apiFactory.ingredient.find(config).then(function(res) {
        $scope.recipe.ingredients = _.map(res.data, function(ing) {
          ing.quantity = quantities[ing.id];
          return ing;
        });
        $scope.loaded = true;
      });
    });

    $scope.deleteRecipe = function() {
      apiFactory.recipe.deleteById($routeParams.id).then(function(res) {
        $location.url("/recipes");
      });
    };
]);

recipeViewControllers.controller('FormPostComment', ['$scope', '$routeParams', '$location', 'apiFactory',
  function($scope, $routeParams, $location, apiFactory) {
    $scope.submitted = false;

    $scope.submitPostComment = function() {
      alert("lol");
      $scope.submitted = true;
      console.log(rate);
      console.log(comment);
    };

    $scope.max = 5;
    $scope.ratingStates = [
      {stateOn: 'glyphicon-star rating-star-selected', stateOff: 'glyphicon-star rating-star-unselected'},
      {stateOn: 'glyphicon-star rating-star-selected', stateOff: 'glyphicon-star rating-star-unselected'},
      {stateOn: 'glyphicon-star rating-star-selected', stateOff: 'glyphicon-star rating-star-unselected'},
      {stateOn: 'glyphicon-star rating-star-selected', stateOff: 'glyphicon-star rating-star-unselected'},
      {stateOn: 'glyphicon-star rating-star-selected', stateOff: 'glyphicon-star rating-star-unselected'}
    ];
  }
]);
