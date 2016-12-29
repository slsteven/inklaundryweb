
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider

  .state('landing', {
    url: '/',
      views: {
        content: {
          controller: 'mainController',
          controllerAs: 'mainCtrl',
          templateUrl: 'resources/views/partials/main.html',
          reloadOnSearch: false
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
  .state('learn_more', {
    url: '/learn_more',
    views: {
      content: {
        templateUrl: 'resources/views/partials/main_learn_more.html',
        controller: 'mainController',
        controllerAs: 'mainCtrl'
      }
    }
  })
  .state('contact', {
    url: '/contact',
    views: {
      content: {
        templateUrl: 'resources/views/partials/contact.html',
        controller: 'mainController',
        controllerAs: 'mainCtrl',
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
        templateUrl: 'resources/views/partials/header.html',
        controller: 'authController',
        controllerAs: 'authCtrl'
      },
      content: {
        templateUrl: 'resources/views/partials/home.html'
      }
    },
    resolve: {
      access: ['authService', function (authService) { return authService.isLoggedIn(); }],
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
      },
      access: ['authService', function (authService) { return authService.isLoggedIn(); }],
    }
  })
  .state('home.summary', {
    url: '/summary/:id',
    templateUrl: 'resources/views/partials/grouporder_summary.html',
    controller: 'groupController',
    controllerAs: 'groupCtrl',
    resolve: {
      ordersResource: 'ordersResource',
      orderById: function (ordersResource, $stateParams) {
        return ordersResource.get({id: $stateParams.id}).$promise
      }
    }
  })
  .state('home.ordersNew', {
    url: '/orders/new',
    templateUrl: 'resources/views/partials/order_new.html',
    controller: 'ordersController',
    controllerAs: 'ordersCtrl',
    resolve: {
      access: ['authService', function (authService) { return authService.isLoggedIn(); }],
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
