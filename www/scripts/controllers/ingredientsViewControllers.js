var ingredientsViewControllers = angular.module('ingredientsViewControllers', []);


ingredientsViewControllers.controller('IngredientsViewCtrl', ['$scope', 'apiFactory', 'categories_mapper',
  function($scope, apiFactory, categories_mapper) {
    $scope.ingredients = [];
    $scope.categories_mapper = categories_mapper;
    $scope.selectedCategory = "All";
    $scope.modeDisplay = 'module';

    var currentCategory = undefined;

    $scope.currentPage = 0;
    $scope.perPage = 9;
    $scope.nbPage = 0;
    $scope.nbElements = 0;

    function loadIngredient() {
      var config = {
        params: {
          sort: "name ASC",
          limit: $scope.perPage,
          skip: $scope.currentPage * $scope.perPage,
          category: currentCategory
        }
      };

      apiFactory.ingredient.find(config).then(function(res) {
        $scope.ingredients = res.data;
      });
    }

    $scope.switchView = function(mode) {
      $scope.modeDisplay = mode;
    };

    $scope.canGoPreviousPage = function() {
      return $scope.currentPage > 0;
    }

    $scope.goPreviousPage = function() {
      if ($scope.canGoPreviousPage()) {
        $scope.currentPage -= 1;
        loadIngredient();
      }
    };

    $scope.canGoNextPage = function() {
      return ($scope.currentPage + 1) < $scope.nbPage;
    }

    $scope.goNextPage = function() {
      if ($scope.canGoNextPage()) {
        $scope.currentPage += 1;
        loadIngredient();
      }
    };

    $scope.changeCategory = function(category_name) {
      if (category_name == "all") {
        currentCategory = undefined;
        $scope.selectedCategory = "All"
      } else {
        currentCategory = category_name;
        $scope.selectedCategory = categories_mapper[category_name].name;
      }
      $scope.currentPage = 0;

      var config = {
        params: {
          category: currentCategory
        }
      };

      apiFactory.ingredient.count(config).then(function(count) {
        $scope.nbElements = count;
        $scope.nbPage = Math.ceil(count / $scope.perPage);
        loadIngredient();
      });
    };

    $scope.changeCategory('all');
  }
]);
