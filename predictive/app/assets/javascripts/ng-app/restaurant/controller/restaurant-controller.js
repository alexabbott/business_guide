angular.module('predictiveApp')

// restaurant CONTROLLER
.controller('restaurantController',['$stateParams','$scope', 'api' ,function($stateParams, $scope, api) {
  $scope.showRestaurant = function(){
    api.showRestaurant($stateParams.id)
    .then(function(data){
      $scope.restaurant = data.data;
    });
  };
  
}]);