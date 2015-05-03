'use strict';

angular.module("services")

  // Http interceptor for handling responses
  .factory("apiHttpInterceptor", ["$window", "$location", "ipCookie", "appConfig",
    function($window, $location, ipCookie, appConfig) {
      var authHeaders = ['access-token', 'client', 'uid', 'expiry', 'token-type'];
      function getRemoteDomain(remoteUrl) {
          return remoteUrl.replace(/^(https?:\/\/[^\/]+\/).*$/, "$1");
      }
      return {
        request: function(req) {
          var remoteUrl = getRemoteDomain(req.url);
          if(remoteUrl == appConfig.apiUrl) {
            for(var a in authHeaders) {
              var hdr = authHeaders[a];
              if(ipCookie(hdr)) {
                req.headers[hdr] = ipCookie(hdr);
              }
            }
          }
          return req;
        },
        response: function(resp) {
          if(resp.status == 401) {
            // If access denied, redirect to login page
            $window.location.assign($state.href("admin"));
            return resp;
          }
          var remoteUrl = getRemoteDomain(resp.config.url);
          if(remoteUrl == appConfig.apiUrl) {
            for(var a in authHeaders) {
              var hdr = authHeaders[a];
              ipCookie(hdr, resp.headers(hdr));
            }
          }
          return resp;
        }
      };
    }
  ])

  .config(["$httpProvider",
    function($httpProvider) {
      $httpProvider.interceptors.push('apiHttpInterceptor');
    }
  ])
;
