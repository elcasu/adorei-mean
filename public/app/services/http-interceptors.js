'use strict';

angular.module("services")

  // Http interceptor for handling responses
  .factory("apiHttpInterceptor", ["$window", "$location", "ipCookie", "appConfig",
    function($window, $location, ipCookie, appConfig) {
      var apiDomain = getRemoteDomain(appConfig.apiUrl);;
      var tokenParamName = "access-token";

      function getRemoteDomain(remoteDomain) {
          return remoteDomain.replace(/^(https?:\/\/[^\/]+\/).*$/, "$1");
      }
      return {
        request: function(req) {
          var remoteDomain = getRemoteDomain(req.url);

          // Only take care of requests to our backend
          if(remoteDomain == apiDomain) {
            console.log(ipCookie(tokenParamName));
            if(ipCookie(tokenParamName)) {
              req.headers[tokenParamName] = ipCookie(tokenParamName);
            }
          }
          return req;
        },
        response: function(resp) {
          if(resp.status == 403) {
            // If access denied, redirect to login page
            $window.location.assign($state.href("admin"));
            return resp;
          }
          var remoteDomain = getRemoteDomain(resp.config.url);

          // Only on backend responses
          if(remoteDomain == apiDomain) {
            if(resp.data.token) {
              ipCookie(tokenParamName, resp.data.token);
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
