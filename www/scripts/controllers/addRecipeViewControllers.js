var addRecipeViewControllers = angular.module('addRecipeViewControllers', []);

addRecipeViewControllers.controller('AddRecipeViewCtrl', ['$scope', '$location', 'apiFactory',
  function($scope, $location, apiFactory) {

  }
]);

addRecipeViewControllers.controller('ingredientAutocompleteController', ['$scope', '$http', function($scope, $http) {
  $scope.recipeIngredients = [];
  $scope.idIngredientExclude = [];
  $scope.urlIngredientExclude = "";

  function updateIdIngredientExclude() {
    $scope.idIngredientExclude = [];
    for (var i = 0; i < $scope.recipeIngredients.length; i++) {
      if ($scope.recipeIngredients[i].id) {
        $scope.idIngredientExclude.push($scope.recipeIngredients[i].id);
      }
    }
    $scope.urlIngredientExclude = "";
    if ($scope.idIngredientExclude.length > 0) {
      $scope.urlIngredientExclude = $.param({ exclude: $scope.idIngredientExclude }) + '&';
    }
  }

  $scope.addIngredientToRecipe = function(selected) {
    $scope.$broadcast('angucomplete-alt:clearInput');

    var new_ingredient = {
      'name': selected.originalObject.name,
      'quantity': '1'
    }

    if (selected.originalObject.id) {
      new_ingredient.id = selected.originalObject.id;
    }

    if (selected.originalObject.photo_url) {
      new_ingredient.photo_url = selected.originalObject.photo_url;
    }
    else {
      new_ingredient.photo_url = '/images/default-preview.png';
    }

    $scope.recipeIngredients.push(new_ingredient);
    updateIdIngredientExclude();
  }

  $scope.checkQuantity = function(data) {
    if (!data || data == '') {
      return "Quantity can't be empty.";
    }
  };

  $scope.removeIngredientFromRecipe = function(index) {
    $scope.recipeIngredients.splice(index, 1);
    updateIdIngredientExclude();
  };


}]);
