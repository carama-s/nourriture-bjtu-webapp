var addIngredientViewControllers = angular.module('addIngredientViewControllers', []);

addIngredientViewControllers.controller('addIngredientViewCtrl', ['$scope', 'apiFactory', 'refreshInputForms',
  function($scope, apiFactory, refreshInputForms) {
    refreshInputForms();
  }
]);

addIngredientViewControllers.controller("AddIngredientFormCtrl", ['$scope', 'apiFactory', 'categories_mapper',
  function($scope, apiFactory, categories_mapper) {
    $scope.months = [{name: "Jan", active: false},
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
                     {name: "Dec", active: false}];

    $scope.categories_mapper = categories_mapper;

    $scope.changeCategory = function($event, value) {

      var parent = $event.currentTarget.parentNode;
      for (var i = 0; i < parent.children.length; i++) {
        parent.children[i].style.backgroundColor = "#DADADA";
      }
      $event.currentTarget.style.backgroundColor = categories_mapper[value].color;
      $scope.categoryIngredient = value;
    };

    $scope.changeMonth = function(index) {
      $scope.months[index].active = !$scope.months[index].active;
    }

    $scope.simulateClickFile = function() {
      $("#uploadImage").click();
    };


    $scope.submitAddIngredient = function() {
      var period = [];
      for(var i = 0; i < $scope.months.length; i++) {
        period[i] = ($scope.months[i].active ? 1 : 0);
      }

      var fd = new FormData();
      fd.append('photo', $scope.photoIngredient);
      if ($scope.nameIngredient != undefined)
        fd.append('name', $scope.nameIngredient);
      fd.append('category', $scope.categoryIngredient);
      fd.append('period', JSON.stringify(period));


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
