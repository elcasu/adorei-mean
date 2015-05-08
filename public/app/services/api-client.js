'use strict';

angular.module("services")

  // REST API client
  .factory("StockApiClient", ["appConfig", "$http", "ipCookie",
    function(appConfig, $http, ipCookie) {
      var apiUrl = appConfig.apiUrl;

      return {
        submitLogin: function(form) {
          return $http.post(apiUrl + "authenticate", {
            "email": form.email,
            "password": form.password
          });
        },
        getProducts: function() {
          return $http.get(apiUrl + "products");
        },
        getProduct: function(id) {
          return $http.get(apiUrl + "products/" + id);
        },
        removeProduct: function(product) {
          return $http.delete(apiUrl + 'products/' + product.id);
        },
        addProduct: function(product) {
          $http.post(apiUrl + "products", {
            product: {
              name: product.name,
              category_id: product.category.id,
              price: product.price
            },
            tmp_image: product.tmp_image
          });
        },
        updateProduct: function(product) {
          $http.put(apiUrl + "products/" + product.id, {
            "product": {
              code: product.code,
              name: product.name,
              category_id: product.category.id,
              cost_price: product.cost_price,
              price: product.price,
              stock: product.stock
            },
            tmp_image: product.tmp_image
          });
        },
        getCategories: function() {
          return $http.get(apiUrl + 'categories');
        },
        addCategory: function(category) {
          $http.post(apiUrl + "categories", {
            category: {
              name: category.name,
              description: category.description
            }
          });
        },
        updateCategory: function(category) {
          return $http.put(apiUrl + "categories/" + category.id, {
            category: {
              name: category.name,
              description: category.description
            }
          });
        },
        getCategory: function(id) {
          return $http.get(apiUrl + "categories/" + id);
        },
        removeCategory: function(category) {
          return $http.delete(apiUrl + 'categories/' + category.id);
        },
        signout: function() {
          return $http.delete(apiUrl + 'auth/sign_out');
        }
      }
    }
  ])
;
