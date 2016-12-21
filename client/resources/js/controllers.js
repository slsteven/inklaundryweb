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

  // disable section--items hover for devices 600px and less
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

  // show dialog to browse items
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

  // customer contact form
  $scope.newContact = function (submission) {
    mainService.sendEmail(submission, function (response) {
      if (response.status === 200) {
        $scope.error = true;
        $scope.statusMessage = response.data.message;
      } else {
        $scope.error = true;
        $scope.statusMessage = response.data.message
      }
    })
  };

  // options for gallery
  $scope.conf = {
      thumbnails  :   true,
      inline      :   false,
      bubbles     :   true,
      imgBubbles  :   true,
      bgClose     :   false,
      imgAnim     :   'fadeup'
    };

    $scope.methods = {};

    $scope.openGallery = function () {
      $scope.methods.open();
    }

    $scope.images = [
      {
        'url': 'resources/img/gallery_img_trans_base.png',
        'thumbUrl': 'resources/img/gallery_img_base_art.jpg'
      },{
        'url': 'resources/img/gallery_img_coding_front_shirt.png',
        'thumbUrl': 'resources/img/gallery_img_coding_front_art.png'
      },{
        'url': 'resources/img/gallery_img_3.png',
        'thumbUrl': 'resources/img/gallery_img_3.png'
      },{
        'url': 'resources/img/gallery_img_3.png',
        'thumbUrl': 'resources/img/gallery_img_3.png'
      },{
        'url': 'resources/img/gallery_img_4.png',
        'thumbUrl': 'resources/img/gallery_img_4.png'
      },{
        'url': 'resources/img/gallery_img_5.png',
        'thumbUrl': 'resources/img/gallery_img_5.png'
      },{
        'url': 'resources/img/gallery_img_6.png',
        'thumbUrl': 'resources/img/gallery_img_6.png'
      },{
        'url': 'resources/img/gallery_img_7.png',
        'thumbUrl': 'resources/img/gallery_img_7.png'
      },{
        'url': 'resources/img/gallery_img_8.png',
        'thumbUrl': 'resources/img/gallery_img_8.png'
      },{
        'url': 'resources/img/gallery_img_9.png',
        'thumbUrl': 'resources/img/gallery_img_9.png'
      },{
        'url': 'resources/img/gallery_img_10.png',
        'thumbUrl': 'resources/img/gallery_img_10.png'
      },{
        'url': 'resources/img/gallery_img_11.png',
        'thumbUrl': 'resources/img/gallery_img_11.png'
      },{
        'url': 'resources/img/gallery_img_12.png',
        'thumbUrl': 'resources/img/gallery_img_12.png'
      },{
        'url': 'resources/img/gallery_img_13.png',
        'thumbUrl': 'resources/img/gallery_img_13.png'
      },{
        'url': 'resources/img/gallery_img_14.png',
        'thumbUrl': 'resources/img/gallery_img_14.png'
      },{
        'url': 'resources/img/gallery_img_15.png',
        'thumbUrl': 'resources/img/gallery_img_15.png'
      },
    ]

}])


app.controller('multipartFormController', ['$scope', 'multipartFormService',
  function($scope, multipartFormService) {
  $scope.uploadForm = function() {
    var file = $scope.order.file;
    multipartFormService.upload('/order/new', file)
  };
}])




