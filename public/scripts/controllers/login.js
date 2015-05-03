'use strict';

angular.module("controllers", [])

  // Login
  .controller("SigninCtrl", ['$scope', '$window', '$state', 'flash', 'StockApiClient',
    function($scope, $window, $state, flash, StockApiClient) {
      $scope.loginForm = {};
      $scope.submitLogin = function() {
        StockApiClient.submitLogin($scope.loginForm)
          .then(function(response) {
            $window.location.assign($state.href("admin.products"));
          })
          .catch(function(response) {
            console.log("Wrong credentials");
            flash("alert alert-danger", "Email o contraseña inválidos");
          })
        ;
      };
    }
  ])
;
