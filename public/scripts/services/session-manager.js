'use strict';

angular.module("services")

  .factory("sessionManager", ['ipCookie',
    function(ipCookie) {
      return {
        userIsAuthenticated: function() {
          var requiredHeaders = [
            'access-token',
            'token-type',
            'uid',
            'client'
          ];
          var valid = true;
          for(var h in requiredHeaders) {
            if(!ipCookie(requiredHeaders[h])) {
              valid = false;
            }
          }
          if(!valid) {
            ipCookie.remove('access-token');
            ipCookie.remove('token-type');
            ipCookie.remove('client');
            ipCookie.remove('uid');
          }
          return valid;
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
