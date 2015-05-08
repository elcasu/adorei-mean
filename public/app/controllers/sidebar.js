'use strict';

angular.module("controllers")

  // Sidebar
  .controller("SidebarCtrl", ['$scope', '$window', '$state', 'StockApiClient', 'sessionManager',
    function($scope, $window, $state, StockApiClient, sessionManager) {
      $scope.signout = function() {
        StockApiClient.signout().success(function() {
          $window.location.assign($state.href("admin"));
        });
      }
    }
  ]);
;
