var ingredientsViewControllers = angular.module('ingredientsViewControllers', []);


ingredientsViewControllers.controller('IngredientsViewCtrl', ['$scope', 'apiFactory',
  function($scope, apiFactory) {
    $scope.ingredients = [];

    $scope.changeCategory = function(category_name) {
      var config = {
        params: {
          where: {},
          sort: "name",
          per_page: 12
        }
      }
      if (category_name != "all")
        config.params.where.category = category_name;
      console.log(config);

      apiFactory.ingredient.findIngredient(config).then(function(res) {
        $scope.ingredients = res.data;
        console.log(res.data);
      });
    };

    $scope.changeCategory('all');
  }
]);
