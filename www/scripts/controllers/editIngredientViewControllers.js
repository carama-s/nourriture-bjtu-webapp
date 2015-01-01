var editIngredientViewControllers = angular.module('editIngredientViewControllers', []);

editIngredientViewControllers.controller('EditIngredientViewCtrl', function() {});

editIngredientViewControllers.controller('EditIngredientCtrl', ['$scope', '$routeParams', '$location', 'apiFactory', 'ingredient_categories_mapper',
  function($scope, $routeParams, $location, apiFactory, ingredient_categories_mapper) {
    $scope.loaded = false;
    $scope.ingredientId = $routeParams.id;
    $scope.emptyIngredientName = false;
    $scope.emptyIngredientDescription = false;
    // Categories
    $scope.ingredient_categories_mapper = ingredient_categories_mapper;
    $scope.changeCategory = function($event, value) {
      var parent = $event.currentTarget.parentNode;
      for (var i = 0; i < parent.children.length; i++) {
        parent.children[i].style.backgroundColor = "#DADADA";
      }
      $event.currentTarget.style.backgroundColor = ingredient_categories_mapper[value].color;
      $scope.categoryIngredient = value;
    };

    // Image
    $scope.simulateClickFile = function() {
      $("#uploadImage").click();
    };

    // Season Period
    $scope.months = [
      {name: "Jan", active: false},
      {name: "Fev", active: false},
      {name: "Mar", active: false},
      {name: "Apr", active: false},
      {name: "May", active: false},
      {name: "Jun", active: false},
      {name: "Jul", active: false},
      {name: "Aug", active: false},
      {name: "Sep", active: false},
      {name: "Oct", active: false},
      {name: "Nov", active: false},
      {name: "Dec", active: false}
    ];

    $scope.changeMonth = function(index) {
      $scope.months[index].active = !$scope.months[index].active;
    }

    $scope.hasSeasonPeriod = function() {
      if ($scope.categoryIngredient == 'fruit' || $scope.categoryIngredient == 'vegetable') {
        return true;
      }
      return false;
    };

    // Load data
    apiFactory.ingredient.findById($routeParams.id).then(function(res) {
      $scope.ingredient = res.data;
      $scope.nameIngredient = $scope.ingredient.name;
      $scope.categoryIngredient = $scope.ingredient.category;
      $scope.descriptionIngredient = $scope.ingredient.description;

      for (var i = 0; i < $scope.ingredient.period.length; i++) {
        ($scope.ingredient.period[i]) ? ($scope.months[i].active = true) : '';
      }

      $scope.ingredient.nutritions = [
        {designation: 'Vitamin A', value: '5 %', dailyValue: '50 %'},
        {designation: 'Vitamin B', value: '15 %', dailyValue: '20 %'},
        {designation: 'Vitamin C', value: '35 %', dailyValue: '40 %'},
        {designation: 'Vitamin D', value: '55 %', dailyValue: '10 %'}
      ];
      if ($scope.needNewRow()) {
        $scope.addNutrition();
      }
      $scope.loaded = true;
    });

    // Nutritions

    $scope.checkDesignation = function(data) {
      if (data == '' || data == undefined) {
        return ""; // This field cannot be empty.
      }
    };

    $scope.removeNutrition = function(index) {
      $scope.ingredient.nutritions.splice(index, 1);
    };

    $scope.needNewRow = function() {
      for (var i = 0; i < $scope.ingredient.nutritions.length; i++) {
        if ($scope.ingredient.nutritions[i].designation == '' || $scope.ingredient.nutritions[i].designation == undefined) {
          return false;
        }
      }
      return true;
    };

    $scope.onNutritionAdded = function() {
      if ($scope.needNewRow()) {
        $scope.addNutrition();
      }
    };

    $scope.addNutrition = function() {
      if ($scope.needNewRow()) {
        $scope.inserted = {
          designation: '',
          value: '',
          dailyValue: ''
        };
        $scope.ingredient.nutritions.push($scope.inserted);
      }
    };

    // Submit data
    $scope.submitEditIngredient = function() {
      $scope.submitted = true;
      // Verification
      if ($scope.nameIngredient == undefined || $scope.nameIngredient == '') {
        $scope.emptyIngredientName = true;
      }
      if ($scope.descriptionIngredient == undefined || $scope.descriptionIngredient == '') {
        $scope.emptyIngredientDescription = true;
      }
      if ($scope.emptyIngredientName || $scope.emptyIngredientDescription) {
        return;
      }

      var period = [];
      for(var i = 0; i < $scope.months.length; i++) {
        if ($scope.hasSeasonPeriod()) {
          period[i] = ($scope.months[i].active ? 1 : 0);
        }
        else {
          period[i] = 0;
        }
      }

      var fd = new FormData();
      fd.append('photo', $scope.photoIngredient);
      fd.append('name', $scope.nameIngredient);
      fd.append('category', $scope.categoryIngredient);
      fd.append('description', $scope.descriptionIngredient);
      fd.append('period', JSON.stringify(period));

      var config = {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      };
      apiFactory.ingredient.updateById($routeParams.id, fd, config).then(function(res) {
        console.log(res.data);
        $location.path("/ingredient/" + $routeParams.id);
      }, function(res) {
        console.error(res);
      });
    };
  }
]);
