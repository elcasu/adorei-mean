'use strict';

angular.module("controllers")

  // Login
  .controller("SigninCtrl", ['$scope', '$window', '$state', 'flash', 'sessionManager',
    function($scope, $window, $state, flash, sessionManager) {
      $scope.loginForm = {};
      $scope.submitLogin = function() {
        sessionManager.login($scope.loginForm)
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
