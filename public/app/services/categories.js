'use strict';

angular.module("services")
  .factory("Category", ['$http', 'appConfig',
    function($http, appConfig) {
      return {
        all: function() {
          return $http.get(appConfig.apiUrl + 'categories');
        },
        find: function(id) {
          return $http.get(appConfig.apiUrl + "categories/" + id);
        },
        create: function(category) {
          $http.post(appConfig.apiUrl + "categories", {
            category: {
              name: category.name,
              description: category.description
            }
          });
        },
        update: function(category) {
          return $http.put(appConfig.apiUrl + "categories/" + category.id, {
            category: {
              name: category.name,
              description: category.description
            }
          });
        },
        remove: function(category) {
          return $http.delete(appConfig.apiUrl + 'categories/' + category.id);
        }
      };
    }
  ]);
