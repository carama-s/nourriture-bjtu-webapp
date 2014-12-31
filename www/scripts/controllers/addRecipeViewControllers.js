var addRecipeViewControllers = angular.module('addRecipeViewControllers', []);

addRecipeViewControllers.controller('AddRecipeViewCtrl', ['$scope', '$location', 'apiFactory',
  function($scope, $location, apiFactory) {

  }
]);

addRecipeViewControllers.controller('ingredientAutocompleteController', ['$scope', '$http', function($scope, $http) {
  $scope.recipeIngredients = [];

  $scope.addIngredientToRecipe = function(selected) {
    $scope.$broadcast('angucomplete-alt:clearInput');

    var new_ingredient = {
      'name': selected.originalObject.name,
      'quantity': '1'
    }
    if (selected.originalObject.photo_url) {
      new_ingredient.photo_url = selected.originalObject.photo_url;
    }
    else {
      new_ingredient.photo_url = '/images/default-preview.png';
    }

    $scope.recipeIngredients.push(new_ingredient);
  }

  $scope.checkQuantity = function(data) {
    if (!data || data == '') {
      return "Quantity can't be empty.";
    }
  };

  $scope.removeIngredientFromRecipe = function(index) {
    $scope.recipeIngredients.splice(index, 1);
  };


}]);
