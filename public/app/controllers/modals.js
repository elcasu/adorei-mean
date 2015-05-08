'use strict';

angular.module("controllers")

  // Controller for modals
  .controller("ModalConfirmCtrl", ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
      $scope.title = "Eliminar producto";
      $scope.message = "Seguro que desea eliminar el producto?";
      $scope.ok = function() {
        $modalInstance.close();
      };
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ])
;
