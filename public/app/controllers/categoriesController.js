'use strict';

angular.module("controllers")

  // Category list
  .controller("CategoryListCtrl", ['$scope', '$state', '$modal', 'Category',
    function($scope, $state, $modal, Category) {
      $scope.removeCategory = function(category) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/shared/modal_confirm.html',
          controller: 'ModalConfirmCtrl'
        });
        modalInstance.result.then(function() {
          Category.remove(category).then(function(response) {
            $state.reload();
            modalInstance.close();
          });
        }, function() {
          modalInstance.close();
        });
      }
      Category.all().success(function(categories) {
        $scope.categories = categories;
      });
    }
  ])

  // New category
  .controller("CategoryNewCtrl", ['$scope', '$window', '$state', 'Category',
    function($scope, $window, $state, Category) {
      $scope.addCategory = function(category) {
        Category.create(category);
        $window.location.assign($state.href("admin.categories"));
      }
      $scope.category = {};
    }
  ])

  // Edit category
  .controller("CategoryEditCtrl", ['$scope', '$stateParams', '$window', '$state', 'Category',
    function($scope, $stateParams, $window, $state, Category) {
      $scope.updateCategory = function(category) {
        Category.update(category).success(function() {
          $window.location.assign($state.href("admin.categories"));
        });
      }
      Category.find($stateParams.id).success(function(category) {
        $scope.category = category;
      });
    }
  ])
;

