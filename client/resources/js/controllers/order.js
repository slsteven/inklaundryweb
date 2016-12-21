var placementImgPath = {
  default: "resources/img/locations/center_chest.png",
  full_front: "resources/img/locations/full_front.png",
  full_back: "resources/img/locations/full_back.png",
  left_chest: "resources/img/locations/left_chest.png",
  medium_front: "resources/img/locations/medium_front.png",
  center_chest: "resources/img/locations/center_chest.png",
  across_chest: "resources/img/locations/across_chest.png",
  medium_back: "resources/img/locations/medium_back.png",
};

app.controller('orderController', ['$scope', 'orderById', 'orderService', '$stateParams',

    function ($scope, orderById, orderService, $stateParams) {

      var order = this;

      order.orderDetails = orderById;

      order.currentView = {};

      order.viewsData = [];

      // loop through orderById views to setup default image for pageview
      if (orderById.views !== undefined) {
        var setDefaultView = false;
        for (var v in orderById.views) {
          // add placementImgPath to view object
          var viewDetails = orderById.views[v];
          viewDetails['placementImgPath'] = placementImgPath[viewDetails.placement]

          // set default image to full front view
          if (viewDetails.side === 'front') {
            setDefaultView = true;
            viewDetails['default'] = true;
            order.currentView = orderById.views[v];
          }
          order.viewsData.push(viewDetails);
        }
        // add default view if full front does not exsit
        if (!setDefaultView) {
          var defaultViewDetails = {
            default: true,
            placement: 'full_front',
            side: 'front',
            artOnly: '',
            digitalProof: 'resources/img/front_view.jpeg',
            placementImgPath: 'resources/img/locations/full_front.png',
          }
          order.currentView = defaultViewDetails;
          order.viewsData.push(defaultViewDetails);
        }
      }


      order.changeView = function (view) {
        order.currentView = view
      };

      // group order form
      order.newGroupOrder = function () {
        order.groupOrder.orderId = $stateParams.id;
        orderService.new(order.groupOrder, function (data) {
          console.log("status", data)
          order.message = true;
          order.groupOrder = {};
          //update summary
          order.groupOrderSummary();
        });
      };


      console.log("view", orderById)


      // temporary hard coded data
      $scope.images = [
      {
        'url': 'resources/img/gallery_img_2.png',
        'thumbUrl': 'resources/img/gallery_img_1.png'
      },{
        'url': 'resources/img/gallery_img_2.png',
        'thumbUrl': 'resources/img/gallery_img_2.png'
      },{
        'url': 'resources/img/gallery_img_3.png',
        'thumbUrl': 'resources/img/gallery_img_3.png'
      },{
        'url': 'resources/img/gallery_img_4.png',
        'thumbUrl': 'resources/img/gallery_img_4.png'
      },{
        'url': 'resources/img/gallery_img_5.png',
        'thumbUrl': 'resources/img/gallery_img_5.png'
      }
    ];

    console.log("controller loaded")

    order.size = {
      xs: '',
      s: '',
      m: '',
      l: '',
      xl: '',
      xxl: ''
    };
    order.changeQty = function (size) {
      console.log(size)
      switch(size) {
        case 'xs':
          if (order.size.xs === '') {
            order.size.xs = 1;
          } else {
            order.size.xs += 1;
          }
          break;
        case 's':
          if (order.size.s === '') {
            order.size.s = 1;
          } else {
            order.size.s += 1;
          }
          break;
        case 'm':
          if (order.size.m === '') {
            order.size.m = 1;
          } else {
            order.size.m += 1;
          }
          break;
        case 'l':
          if (order.size.l === '') {
            order.size.l = 1;
          } else {
            order.size.l += 1;
          }
          break;
        case 'xl':
          if (order.size.xl === '') {
            order.size.xl = 1;
          } else {
            order.size.xl += 1;
          }
          break;
        case 'xxl':
          if (order.size.xxl === '') {
            order.size.xxl = 1;
          } else {
            order.size.xxl += 1;
          }
          break;
      };
    };

}])
