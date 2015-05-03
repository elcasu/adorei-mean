'use strict';

angular.module('directives', [])

  .directive("authSrc", ["$http",
    function($http) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var url = attrs.authSrc;
          $http.get(url, {
            headers: {
              accept: 'image/jpg;base64'
            }
          }).success(function(responseData) {
            // Since we sent a base64 accept header,
            // the image is given in base64 from the server
            attrs.$set("src", "data:image/gif;base64," + responseData);
          });
        }
      };
    }
  ])
;
