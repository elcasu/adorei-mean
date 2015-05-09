'use strict';

angular.module("services")

  .factory("sessionManager", ['$http', 'ipCookie', 'appConfig',
    function($http, ipCookie, appConfig) {
      return {
        userIsAuthenticated: function() {
          return !!ipCookie('access-token');
        },
        login: function(form) {
          return $http.post(appConfig.apiUrl + "authenticate", {
            "email": form.email,
            "password": form.password
          });
        },
        logout: function() {
          return $http.delete(appConfig.apiUrl + 'auth/sign_out');
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
