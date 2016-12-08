
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider

  .state('landing', {
    url: '/',
      views: {
        content: {
          controller: 'mainController',
          controllerAs: 'mainCtrl',
          templateUrl: 'resources/views/partials/main.html',
          // css: ['vendors/css/lato.css','vendors/css/normalize.css', 'resources/css/landingPageStyles.css']
        }
      },
      css: [
        {
          href: 'resources/css/queries.css',
          media: 'screen and (max-width : 1200px)'
        }
      ]
  })
  .state('contact', {
    url: '/contact',
      views: {
        content: {
          templateUrl: 'resources/views/partials/contact.html',
          controller: 'mainController',
          controllerAs: 'mainCtrl'
        }
      }
  })
  .state('gallery', {
    url: '/gallery',
    views: {
      content: {
        templateUrl: 'resources/views/partials/gallery.html',
        controller: 'mainController',
        controllerAs: 'mainCtrl'
      }
    }
  })
  .state('login', {
    url: '/login',
    views: {
      header: {
        templateUrl: 'resources/views/partials/header.html'
      },
      content: {
        templateUrl: 'resources/views/partials/login.html',
        controller: 'authController',
        controllerAs: 'authCtrl',
        access: { restricted: false },
      },
    }
  })
  .state('signup', {
    url: '/signup',
    views: {
      header: {
        templateUrl: 'resources/views/partials/header.html'
      },
      content: {
        templateUrl: 'resources/views/partials/signup.html',
        controller: 'authController',
        controllerAs: 'authCtrl',
        access: { restricted: false },
      }
    }
  })
  .state('home',{
    url: '/home',
    views: {
      header: {
        templateUrl: 'resources/views/partials/header.html'
      },
      content: {
        templateUrl: 'resources/views/partials/home.html'
      }
    }
  })
  .state('home.dashboard', {
    url: '/dashboard',
    templateUrl: 'resources/views/partials/dashboard.html',
    controller: 'dashboardController',
    controllerAs: 'dashboardCtrl',
    resolve: {
      ordersResource: 'ordersResource',
      ordersList: function (ordersResource) {
        return ordersResource.query().$promise;
      }
    }
  })
  .state('orders', {
    url: '/orders',
    templateUrl: 'resources/views/partials/orders.html'
  })
  .state('ordersNew', {
    url: '/orders/new',
    views: {
      header: {
        templateUrl: 'resources/views/partials/header.html'
      },
      content: {
        templateUrl: 'resources/views/partials/order_new.html',
        controller: 'ordersController',
        controllerAs: 'ordersCtrl'
      }
    }
  })
  .state('orderDetails', {
    url: '/orders/:id',
    views: {
      header: {
        templateUrl: 'resources/views/partials/header.html'
      },
      content: {
        templateUrl: 'resources/views/partials/order_show.html',
        controller: 'orderController',
        controllerAs: 'orderCtrl',
        resolve: {
          ordersResource: 'ordersResource',
          orderById: function (ordersResource, $stateParams) {
            return ordersResource.get({id: $stateParams.id}).$promise
          }
        }
      }
    }
  })
  .state('ordersEdit', {
    url: '/orders/:id/edit',
    templateUrl: 'resources/views/partials/order_edit.html'
  })
  // .state('/admin/upload', {
  //   templateUrl: 'resources/views/partials/upload.html'
  // })

  $urlRouterProvider.otherwise("/");

  // $locationProvider.html5Mode(true);

});

// app.run(function($rootScope, $location, $route, authService) {
//   $rootScope.$on('$routeChangeStart', function(event, next, current) {
//     if ($location.path() !== '/') {
//       authService.getUserStatus()
//         .then(function() {
//           if (next.access.restricted && !authService.isLoggedIn()) {
//             $location.path('/login');
//           }
//         })
//     }
//   })
// })
