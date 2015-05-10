'use strict';

angular.module("services")
  .factory("Product", ['$http', 'appConfig',
    function($http, appConfig) {
      return {
        all: function() {
          return $http.get(appConfig.apiUrl + "products");
        },
        find: function(id) {
          return $http.get(appConfig.apiUrl + "products/" + id);
        },
        remove: function(product) {
          return $http.delete(appConfig.apiUrl + 'products/' + product._id);
        },
        create: function(product) {
          product.category_id = product.category._id;
          $http.post(appConfig.apiUrl + "products", {
            product: product
          });
        },
        update: function(product) {
          product.category_id = product.category._id;
          $http.put(appConfig.apiUrl + "products/" + product._id, {
            product: product
          });
        }
      };
    }
  ]);
