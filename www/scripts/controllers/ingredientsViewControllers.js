var ingredientsViewControllers = angular.module('ingredientsViewControllers', []);


ingredientsViewControllers.controller('IngredientsViewCtrl', ['$scope', 'apiFactory', 'categories_mapper',
  function($scope, apiFactory, categories_mapper) {
    $scope.ingredients = [];
    $scope.categories_mapper = categories_mapper;
    $scope.selectedCategory = "All";

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

      apiFactory.ingredient.find(config).then(function(res) {
        $scope.ingredients = res.data;
        (category_name != "all") ? ($scope.selectedCategory = categories_mapper[category_name].name) : ($scope.selectedCategory = "All");
      });
    };

    $scope.changeCategory('all');
  }
]);
