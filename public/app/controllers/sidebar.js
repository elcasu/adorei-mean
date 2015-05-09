'use strict';

angular.module("controllers")

  // Sidebar
  .controller("SidebarCtrl", ['$scope', '$window', '$state', 'sessionManager',
    function($scope, $window, $state, sessionManager) {
      $scope.signout = function() {
        sessionManager.signout().success(function() {
          $window.location.assign($state.href("admin"));
        });
      }
    }
  ]);
;
