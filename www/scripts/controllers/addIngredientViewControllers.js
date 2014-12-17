var addIngredientViewControllers = angular.module('addIngredientViewControllers', []);

addIngredientViewControllers.controller('addIngredientViewCtrl', ['$scope', 'apiFactory',
  function($scope, apiFactory) {
  }
]);

addIngredientViewControllers.controller("AddIngredientFormCtrl", ['$scope', 'apiFactory',
  function($scope, apiFactory) {

    $scope.submitAddIngredient = function() {
      var fd = new FormData();
      fd.append('photo', $scope.photoIngredient);
      fd.append('name', $scope.nameIngredient);
      fd.append('category', $scope.categoryIngredient);

      var config = {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      };

      apiFactory.ingredient.createIngredient(fd, config).then(function(res) {
        console.log(res.data);
      }, function(res) {
        console.error(res);
      });
    };
  }
]);
