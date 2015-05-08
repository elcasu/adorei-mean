'use strict';

angular.module("controllers")

  // Product list
  .controller("ProductListCtrl", ['$scope', '$modal', 'StockApiClient',
    function($scope, $modal, StockApiClient) {
      function getProducts() {
        StockApiClient.getProducts().success(function(products) {
          $scope.products = products;
        });
      };

      $scope.removeProduct = function(product) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/shared/modal_confirm.html',
          controller: 'ModalConfirmCtrl'
        });
        modalInstance.result.then(function() {
          StockApiClient.removeProduct(product).then(function(response) {
            getProducts();
            modalInstance.close();
          });
        }, function() {
          modalInstance.close();
        });
      }
      getProducts();
    }
  ])

  // New product
  .controller("ProductNewCtrl", ['$scope', '$window', '$state', 'StockApiClient', 'ImageUploader', 'appConfig',
    function($scope, $window, $state, StockApiClient, ImageUploader, appConfig) {
      function getCategories() {
        StockApiClient.getCategories().success(function(categories) {
          $scope.categories = categories;
        });
      }
      $scope.addProduct = function(product) {
        StockApiClient.addProduct(product);
        $window.location.assign($state.href("admin.products"));
      }
      getCategories();
      $scope.product = {};
      $scope.uploader = ImageUploader.getUploader(function(item, response) {
        $scope.product.tmp_image = response.tmp;
      });
    }
  ])

  // Edit product
  .controller("ProductEditCtrl", ['$scope', '$stateParams', '$window', '$state', 'StockApiClient', 'ImageUploader',
    function($scope, $stateParams, $window, $state, StockApiClient, ImageUploader) {
      function getCategories() {
        StockApiClient.getCategories().success(function(categories) {
          $scope.categories = categories;
        });
      }

      $scope.productLoaded = false;
      $scope.updateProduct = function(product) {
        StockApiClient.updateProduct(product);
        $window.location.assign($state.href('admin.products'));
      }
      getCategories();
      StockApiClient.getProduct($stateParams.id).success(function(product) {
        $scope.product = product;
        $scope.productLoaded = true;
        angular.forEach($scope.categories, function(category) {
          if(category.id == product.category_id) {
            $scope.product.category = category;
          }
        });
      });
      $scope.uploader = ImageUploader.getUploader(function(item, response) {
        $scope.product.tmp_image = response.tmp;
      });

      function guid() {
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

      $scope.guid = guid();

    }
  ])
;
