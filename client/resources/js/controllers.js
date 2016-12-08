app.controller('authController', ['$scope', 'authService', '$location', '$css',
  function($scope, authService, $location, $css) {

  init();
  // initialize some values
  function init() {
    $scope.error = false;
  }

  $css.removeAll();

  $scope.signup = function(user) {
    authService.signup(user)
      .then(function() {
        $scope.error = false;
        $scope.user = {};
        $location.path('/dashboard')
      })
      .catch(function(errorMsg) {
        $scope.error = true;
        $scope.errorMessage = errorMsg.err;
        $scope.user = {};
      })
  };

  $scope.login = function(user) {
    authService.login(user)
      .then(function() {
        $scope.error = false;
        $scope.user = {}; // clear the form
        $location.path('/dashboard');
      })
      .catch(function(errorMsg) {
        $scope.error = true;
        $scope.errorMessage = errorMsg.err;
        $scope.user = {};
      })
  };

  $scope.logout = function() {
    authService.logout(function(response) {
      $location.path('/login');
    })
  }
}]);

app.controller('mainController', ['$scope', 'mainService', '$anchorScroll', '$location', '$css', '$mdDialog', '$mdPanel', '$window',  function($scope, mainService, $anchorScroll, $location, $css, $mdDialog, $mdPanel, $window) {


  var mainCtrl = this;
  // load css resources on demand
  $css.add('resources/css/landingPageStyles.css');
  $css.add('vendors/css/lato.css');
  $css.add('vendors/css/normalize.css');

  init();
  // initialize some values
  function init() {
    $scope.error = false;
  };

  // event on window width
  var w = angular.element($window);
  $scope.$watch(function () {
      return $window.innerWidth;
    },
    function (value) {
      $scope.windowWidth = value;
    },
    true
  );

  mainCtrl.windowWidth = $window.innerWidth

  if (mainCtrl.windowWidth > 600) {
    mainCtrl.isDisabled = false;
  } else {
    mainCtrl.isDisabled = true;
  }
  w.bind('resize', function (){
    $scope.$apply(function () {
      if (mainCtrl.windowWidth <= 600) {
        mainCtrl.isDisabled = true;
      } else {
        mainCtrl.isDisabled = false;
      }
    });
  });

  mainCtrl.dialogItemList = staticItems;


  mainCtrl.showItemsDialog = function() {
    var position = $mdPanel.newPanelPosition()
      .absolute()
      .center()
      .top('45%')
    var config = {
      parent: angular.element(document.body),
      controller: 'mainController',
      controllerAs: 'mainCtrl',
      disableParentScroll: false,
      templateUrl: 'resources/views/dialog/itemListDialog.html',
      hasBackdrop: true,
      panelClass: '',
      position: position,
      // trapFocus: true,
      zIndex: 150,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: true
      // fullscreen: true
    };

    $mdPanel.open(config);
  };


  mainCtrl.closeDialog = function () {
    var panelRef = mainCtrl.mdPanelRef;
    panelRef && panelRef.close().then(function() {
      angular.element(document.querySelector('.dialog--items__open')).focus();
      panelRef.destroy();
    });
  };

  $scope.scrollTo = function (id) {
    $location.hash(id);
  };

  $scope.newContact = function(submission) {
    mainService.sendEmail(submission, function(response){
      if (response.status === true) {
        $scope.error = true;
        $scope.contact = {};
        $scope.errorMessage = response.message;
      } else {
        $scope.error = true;
        $scope.errorMessage = response.message
      }
    })
  }
}])


app.controller('multipartFormController', ['$scope', 'multipartFormService',
  function($scope, multipartFormService) {
  $scope.uploadForm = function() {
    var file = $scope.order.file;
    multipartFormService.upload('/order/new', file)
  };
}])




