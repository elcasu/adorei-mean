'use strict';

angular.module("services")
  .factory("Category", ['$http',
    function($http) {
      return {
        all: function() {
          return $http.get(apiUrl + 'categories');
        },
        find: function(id) {
          return $http.get(apiUrl + "categories/" + id);
        },
        create: function(category) {
          $http.post(apiUrl + "categories", {
            category: {
              name: category.name,
              description: category.description
            }
          });
        },
        update: function(category) {
          return $http.put(apiUrl + "categories/" + category.id, {
            category: {
              name: category.name,
              description: category.description
            }
          });
        },
        remove: function(category) {
          return $http.delete(apiUrl + 'categories/' + category.id);
        }
      };
    }
  ]);
