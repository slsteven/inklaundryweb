var staticClassYear = ['2018','2019','2020', '2021', '2022', '2023', '2024', '2025'];

var staticSchools = [
  'Silver Creek High School',
  'Independence High School',
  'Mt. Pleasant High School',
  'Andrew Hill High School'
  ];

var staticApparelModels = [
  ['Bella Canvas', 'Unisex Triblend Tee', '3413'],
  ['Bella Canvas', 'Unisex Jersey Tee', '3001'],
  ['Bella Canvas', 'Unisex Poly-Cotton Fleece Full Zip Hoodie', '3739'],
  ['Independent Trading Co', 'Zip Hoodie', 'SS2200Z'],
  ['Independent Trading Co', 'Full Zip Hood with Draw Cord', 'AFX90UNZ']
];

var staticApparelColors = {
  'Bella Canvas': {
    '3413': ['red', 'black', 'white', 'charcoal'],
    '3001': ['green', 'white', 'tan', 'asphalt', 'heather', 'cobalt']
  },
  'Independent Trading Co': {
    'SS2200Z': ['orange', 'charcoal', 'dark blue'],
    'AFX90UNZ': ['teal', 'purple', 'gray']
  }
};

var staticPrintLocations = {
  'Front': ['Full Front', 'Medium Front', 'Center Chest', 'Across Chest', 'Left Chest', 'Right Chest'],
  'Back': ['Full Back', 'Medium Back', 'Across Shoulders', 'Locker Patch Area'],
  'Left': ['Left Sleeve', 'Left Vertical'],
  'Right': ['Right Sleeve', 'Right Vertical']
};

app.controller('ordersController', ['$scope', 'multipartFormService', '$location', '$mdDialog', 'ordersService', 'Upload',

  function($scope, multipartFormService, $location, $mdDialog, ordersService, Upload) {

    var orders = this;

    orders.order = {};
    orders.schoolList = staticSchools;
    orders.classList = staticClassYear;
    orders.modelList = staticApparelModels;
    orders.printLocations = staticPrintLocations;

    orders.changedModel = function() {
      var parsedModel = JSON.parse(orders.order.selectedModel);
      orders.order.colorList = staticApparelColors[parsedModel[0]][parsedModel[2]];
      orders.parsedSelectedModel = parsedModel;
    }

    orders.order.sizeBreakdown = {
      xsmall: 0,
      small: 0,
      medium: 0,
      large: 0,
      xlarge: 0,
      xxlarge: 0,
      xxxlarge: 0
    };

    // test data
    // orders.order.title = "testing"
    orders.order.invoice = 1234
    orders.order.selectedSchool = "Silver Creek High School"
    orders.order.selectedClass = 2018
    orders.order.selectedGrade = "Freshmen"
    orders.order.location = {}
    // orders.order.location.front = {}
    orders.order.location.back = {}
    // orders.order.location.front.placement = "full_front"
    // orders.order.location.front.dimension = "5x5"
    // orders.order.location.front.digitalProof = "https://s3-us-west-1.amazonaws.com/inklaundry/gallery_img_coding_front_shirt.png"
    // orders.order.location.front.artOnly = "https://s3-us-west-1.amazonaws.com/inklaundry/logo_only_sample.png"
    orders.order.location.back.placement = "full_back"
    orders.order.location.back.dimension = "15x15"
    orders.order.location.back.digitalProof = "https://s3-us-west-1.amazonaws.com/inklaundry/gallery_img_slice_front_shirt.png"
    orders.order.location.back.artOnly = "https://s3-us-west-1.amazonaws.com/inklaundry/gallery_img_slice_art.jpg"

    orders.newOrder = function() {
      console.log("controller, create order: ", orders.order)
      // repack  so views is an array of objections without double nested object
      var viewList = [];
      for (var loc in orders.order.location) {
        orders.order.location[loc]['side'] = loc;
        viewList.push(orders.order.location[loc]);
      };
      console.log("viewList", viewList)
      orders.order.views = viewList;
      ordersService.new(orders.order, function (data) {
        console.log("data", data)
      })

      // multipartFormService.upload('/orders', orders.order)
    }

    $scope.showTabDialog = function(ev) {
      $mdDialog.show({
        // controller: DialogController,
        templateUrl: 'resources/views/dialog/orderTabDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    // function DialogController($scope, $mdDialog) {
    //   $scope.hide = function() {
    //     $mdDialog.hide();
    //   };

    //   $scope.cancel = function() {
    //     $mdDialog.cancel();
    //   };

    //   $scope.answer = function(answer) {
    //     $mdDialog.hide(answer);
    //   };
    // }

    orders.imgPreviewList = {};

    $scope.imgPreview = function (element) {
      console.log("element", element.target.files)
      var reader = new FileReader();
      reader.onload = function (event) {
        console.log("event", event)
        $scope.image_source1 = event.target.result;
        $scope.$apply(function($scope) {
          console.log("ELEMENT", element.files)
          $scope.imgPreviewList = element.files;
        });
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  // $scope.newOrder = function() {
  //   multipartFormService.upload('/order/new', $scope.order)
  //     .then(function(result) {
  //       console.log("succcess", result)
  //     }, function(error) {
  //       console.log("controller", error)
  //     }, function(progressComplete) {
  //       console.log("CLIENT", progressComplete)
  //       $scope.progress = progressComplete;
  //     });
  // };



}])




