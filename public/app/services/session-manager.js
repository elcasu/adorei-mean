'use strict';

angular.module("services")

  .factory("sessionManager", ['ipCookie',
    function(ipCookie) {
      return {
        userIsAuthenticated: function() {
          return !!ipCookie('access-token');
        }
      };
    }
  ])

  .provider('session',
    function sessionProvider() {
      this.$get = ["sessionManager", function(sessionManager) {
        return sessionManager;
      }]
    }
  )
;
