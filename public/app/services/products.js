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
          $http.post(appConfig.apiUrl + "products", {
            product: {
              name: product.name,
              category_id: product.category._id,
              price: product.price
            },
            tmp_image: product.tmp_image
          });
        },
        update: function(product) {
          $http.put(appConfig.apiUrl + "products/" + product._id, {
            "product": {
              code: product.code,
              name: product.name,
              category: product.category._id,
              cost_price: product.cost_price,
              price: product.price,
              stock: product.stock
            },
            tmp_image: product.tmp_image
          });
        }
      };
    }
  ]);
