'use strict';

angular.module("controllers")

  // Category list
  .controller("CategoryListCtrl", ['$scope', '$modal', 'Category',
    function($scope, $modal, Category) {
      function getCategories() {
        Category.all().success(function(categories) {
          $scope.categories = categories;
        });
      }
      $scope.removeCategory = function(category) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/shared/modal_confirm.html',
          controller: 'ModalConfirmCtrl'
        });
        modalInstance.result.then(function() {
          StockApiClient.removeCategory(category).then(function(response) {
            getCategories();
            modalInstance.close();
          });
        }, function() {
          modalInstance.close();
        });
      }
      getCategories();
    }
  ])

  // New category
  .controller("CategoryNewCtrl", ['$scope', '$window', '$state', 'StockApiClient',
    function($scope, $window, $state, StockApiClient) {
      $scope.addCategory = function(category) {
        StockApiClient.addCategory(category);
        $window.location.assign($state.href("admin.categories"));
      }
      $scope.category = {};
    }
  ])

  // Edit category
  .controller("CategoryEditCtrl", ['$scope', '$stateParams', '$window', '$state', 'StockApiClient',
    function($scope, $stateParams, $window, $state, StockApiClient) {
      $scope.updateCategory = function(category) {
        StockApiClient.updateCategory(category).success(function() {
          $window.location.assign($state.href("admin.categories"));
        });
      }
      StockApiClient.getCategory($stateParams.id).success(function(category) {
        $scope.category = category;
      });
    }
  ])
;

