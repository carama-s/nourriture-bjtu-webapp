var ingredientViewControllers = angular.module('ingredientViewControllers', []);


ingredientViewControllers.controller('IngredientViewCtrl', ['$scope', '$routeParams', '$location', '$document', 'apiFactory', 'categories_mapper',
  function($scope, $routeParams, $location, $document, apiFactory, categories_mapper) {
    $scope.loaded = false;
    $scope.ingredientId = $routeParams.id;
    $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $scope.categories_mapper = categories_mapper;


    $document.on('scroll', function() {
      console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
    });
    var container = angular.element(document.getElementById('container'));
    container.on('scroll', function() {
      console.log('Container scrolled to ', container.scrollLeft(), container.scrollTop());
    });

    apiFactory.ingredient.findById($routeParams.id).then(function(res) {
      $scope.ingredient = res.data;

      $scope.ingredient.nutritions = [
        {designation: 'Vitamin A', value: '5 %', dailyValue: '50 %'},
        {designation: 'Vitamin B', value: '15 %', dailyValue: '20 %'},
        {designation: 'Vitamin C', value: '35 %', dailyValue: '40 %'},
        {designation: 'Vitamin D', value: '55 %', dailyValue: '10 %'}
      ];

      $scope.hasSeasonPeriod = function() {
        if ($scope.ingredient.category == 'fruit' || $scope.ingredient.category == 'vegetable')
          return true;
        return false;
      };
      $scope.loaded = true;
    });

    $scope.deleteIngredient = function() {
      apiFactory.ingredient.deleteById($routeParams.id).then(function(res) {
        $location.path("/ingredients");
      });
    };
  }
]);
