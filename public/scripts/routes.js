'use strict';

angular.module("routes", [])

  .config(["$stateProvider", "$urlRouterProvider", "sessionProvider",
    function($stateProvider, $urlRouterProvider, sessionProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('signin', {
          url: '/',
          templateUrl: 'partials/signin.html',
          controller: 'SigninCtrl'
        })
        .state('admin', {
          url: '/app',
          abstract: true,
          template: '<ui-view/>',
          resolve: {
            authenticated: function(sessionManager) {
              return sessionManager.userIsAuthenticated()
            }
          },
          controller: function($window, $state, authenticated) {
            if(!authenticated) {
              $window.location.assign($state.href("admin"));
            }
          }
        })

        // ------------- Products -------------
        .state('admin.products', {
          url: '/products',
          templateUrl: 'partials/products/list.html',
          controller: 'ProductListCtrl'
        })
        .state('admin.products_new', {
          url: '/products/new',
          templateUrl: 'partials/products/new.html',
          controller: 'ProductNewCtrl'
        })
        .state('admin.products_edit', {
          url: '/products/edit/:id',
          templateUrl: 'partials/products/edit.html',
          controller: 'ProductEditCtrl'
        })

        // ------------- Categories -------------
        .state('admin.categories', {
          url: '/categories',
          templateUrl: 'partials/categories/list.html',
          controller: 'CategoryListCtrl'
        })
        .state('admin.categories_new', {
          url: '/categories/new',
          templateUrl: 'partials/categories/new.html',
          controller: 'CategoryNewCtrl'
        })
        .state('admin.categories_edit', {
          url: '/categories/edit/:id',
          templateUrl: 'partials/categories/edit.html',
          controller: 'CategoryEditCtrl'
        })

        // ------------- Stock -------------
        .state('admin.stock', {
          url: '/stock',
          templateUrl: 'partials/stock/list.html',
          controller: 'StockListCtrl'
        })
        .state('admin.stock_new', {
          url: '/stock/new',
          templateUrl: 'partials/stock/new.html',
          controller: 'StockNewCtrl'
        })
      ;
    }
  ])
;
