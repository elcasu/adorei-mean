'use strict';

angular.module("controllers")

  // Product list
  .controller("ProductListCtrl", ['$scope', '$state', '$modal', 'Product',
    function($scope, $state, $modal, Product) {
      $scope.removeProduct = function(product) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/shared/modal_confirm.html',
          controller: 'ModalConfirmCtrl'
        });
        modalInstance.result.then(function() {
          Product.remove(product).then(function(response) {
            $state.reload();
            modalInstance.close();
          });
        }, function() {
          modalInstance.close();
        });
      }
      Product.all().success(function(products) {
        $scope.products = products;
      });
    }
  ])

  // New product
  .controller("ProductNewCtrl", ['$scope', '$window', '$state', 'Category', 'Product', 'ImageUploader', 'appConfig',
    function($scope, $window, $state, Category, Product, ImageUploader, appConfig) {
      $scope.addProduct = function(product) {
        Product.create(product);
        $window.location.assign($state.href("admin.products"));
      }
      Category.all().success(function(categories) {
        $scope.categories = categories;
      });
      $scope.product = {};
      $scope.uploader = ImageUploader.getUploader(function(item, response) {
        $scope.product.tmp_image = response.tmp;
      });
    }
  ])

  // Edit product
  .controller("ProductEditCtrl", ['$scope', '$stateParams', '$window', '$state', 'Product', 'Category', 'ImageUploader',
    function($scope, $stateParams, $window, $state, Product, Category, ImageUploader) {
      $scope.productLoaded = false;
      $scope.updateProduct = function(product) {
        Product.update(product);
        $window.location.assign($state.href('admin.products'));
      }
      Category.all().success(function(categories) {
        $scope.categories = categories;
      });
      Product.find($stateParams.id).success(function(product) {
        $scope.product = product;
        $scope.productLoaded = true;
        angular.forEach($scope.categories, function(category) {
          if(category._id == product.category_id) {
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
