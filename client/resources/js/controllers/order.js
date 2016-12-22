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
      };

      order.changeView = function (view) {
        order.currentView = view;
      };

      console.log("view", orderById);


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
      xsmall: '',
      small: '',
      medium: '',
      large: '',
      xlarge: '',
      xxlarge: '',
    };

    order.changeQty = function (size) {
      switch(size) {
        case 'xsmall':
          if (order.size.xsmall === '') {
            order.size.xsmall = 1;
          } else {
            order.size.xsmall += 1;
          }
          break;
        case 'small':
          if (order.size.small === '') {
            order.size.small = 1;
          } else {
            order.size.small += 1;
          }
          break;
        case 'medium':
          if (order.size.medium === '') {
            order.size.medium = 1;
          } else {
            order.size.medium += 1;
          }
          break;
        case 'large':
          if (order.size.large === '') {
            order.size.large = 1;
          } else {
            order.size.large += 1;
          }
          break;
        case 'xlarge':
          if (order.size.xlarge === '') {
            order.size.xlarge = 1;
          } else {
            order.size.xlarge += 1;
          }
          break;
        case 'xxlarge':
          if (order.size.xxlarge === '') {
            order.size.xxlarge = 1;
          } else {
            order.size.xxlarge += 1;
          }
          break;
      };
    };

    order.newGroupOrder = function () {

      var newOrder = order.groupOrder;

      newOrder.orderId = $stateParams.id;

      var totalQty = 0;
      var sizes = {}
      // replace any empty strings in sizes to 0 and compute sum for total qty
      for (var s in order.size) {
        if (order.size[s] === '') {
          sizes[s] = 0;
        } else {
          sizes[s] = order.size[s];
          totalQty += order.size[s];
        }
      };
      newOrder.totalQty = totalQty;

      newOrder.sizes = sizes;

      orderService.new(newOrder, function (data) {
        console.log("status", data)
        // order.message = true;
        // order.groupOrder = {};
        // //update summary
        // order.groupOrderSummary();
      });
    }


}])
