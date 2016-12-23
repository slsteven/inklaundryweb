var app = angular.module('app', [
  'ui.router',
  'ngMessages',
  'ngMaterial',
  'ngResource',
  'md.data.table',
  'underscore',
  'ngMdIcons',
  'angularCSS',
  'ngAnimate',
  'ngTouch',
  'thatisuday.ng-image-gallery',
  'ngFileUpload',
  'ngRoute',
  'angular.filter'
]);

 var customBackground = {
  '50': '#ffffff',
  '100': '#ffffff',
  '200': '#ffffff',
  '300': '#ffffff',
  '400': '#ffffff',
  '500': '#fff',
  '600': '#f2f2f2',
  '700': '#e6e6e6',
  '800': '#d9d9d9',
  '900': '#cccccc',
  'A100': '#ffffff',
  'A200': '#ffffff',
  'A400': '#ffffff',
  'A700': '#bfbfbf'
}

app.config(function($mdThemingProvider) {
   $mdThemingProvider
    .definePalette('customBackground', customBackground);

  $mdThemingProvider
    .theme('default')
    .primaryPalette('grey', {
      'default': '500',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': '900'
    })
    .accentPalette('pink', {
      'default': 'A200'
    })
    .warnPalette('red')

    .backgroundPalette('grey')

});


app.constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
app.run(function ($rootScope) {
   $rootScope._ = window._;
});

// give the directive a name, pass in a function that returns an object. The object
// is the custom directive
app.directive('searchResult', function() {
  return {
    restrict: '',
    templateUrl: 'directives/searchresult.html',
    // setting replace to true removes the name of the directive in the DOM
    replace: false,
    scope: {
      // use the '=' to pass an object
      // use the '&' to pass text
      searchItem: "=",
      searchItemShow: "&",
    },
    link: function(scope, elements, attr) {
      console.log('linking');
    }
  }
})

app.directive('stickyText', function($mdSticky, $compile) {
  return {
    restrict: 'E',
    templateUrl: 'resources/views/partials/header.html',
    link: function(scope,element) {
      $mdSticky(scope, element);
    }
  }
})

// app.directive('sticky')





app.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}])

app.filter('changeViewName', [function() {
  return function(string) {
    if (string == 'fullfront') {
      return 'Full Front';
    } else if (string === 'centerchest') {
      return 'Center Chest';
    }
  }
}])
