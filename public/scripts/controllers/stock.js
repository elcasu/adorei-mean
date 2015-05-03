'use strict';

angular.module("controllers")
  .controller("StockListCtrl", ['$scope', 'StockApiClient',
    function($scope, StockApiClient) {
    }
  ])
  .controller("StockNewCtrl", ['$scope', 'StockApiClient',
    function($scope, StockApiClient) {
      // Categories
      $scope.selectedCategory = {};
      StockApiClient.getCategories().success(function(categories) {
        $scope.categories = categories;
      });

      // Products
      $scope.selectedProduct = {};
    }
  ])
;
