angular.module('predictiveApp')

.config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'homeController'
        })

        .state('restaurant', {
	        url: '/restaurant/:id',
	        templateUrl: 'restaurant.html',
	        controller: 'restaurantController'
    });

});