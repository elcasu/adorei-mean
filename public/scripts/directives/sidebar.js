'use strict';

angular.module('directives')

  .directive("sidebar", [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/sidebar.html'
      };
    }
  ])
;
