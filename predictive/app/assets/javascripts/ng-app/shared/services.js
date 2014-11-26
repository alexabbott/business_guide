angular.module('predictiveApp')

.service('api', function($http) {

     return {

          getRestaurants: function() {

               var promise = $http.get('/api/restaurants')
               .then(function(response) {
                    return response
               });
               return promise;
          },

          createRestaurant: function(restaurantAddress, restaurantCategory, restaurantPrice){
      		   $http.post('api/restaurants', {address: restaurantAddress, category: restaurantCategory, price: restaurantPrice})
    	    },

          showRestaurant: function(restaurantID){
            // STATUS OF PROMISE: Fulfilled, Rejected, Pending
            var promise = $http.get('/api/restaurants/' + restaurantID)
            .then(function(response) {
              return response;
            })

            return promise;

          }


     }

});