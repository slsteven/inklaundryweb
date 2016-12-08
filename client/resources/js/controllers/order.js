var staticViewPath = {
  default: "resources/img/locations/CENTER_CHEST.png",
  fullfront: "resources/img/locations/FULL_FRONT.png",
  mediumfront: "resources/img/locations/MEDIUM_FRONT.png",
  centerchest: "resources/img/locations/CENTER_CHEST.png",
  acrosschest: "resources/img/locations/ACROSS_CHEST.png",
  mediumback: "resources/img/locations/MEDIUM_BACK.png",
  lockerpatcharea: "resources/img/locations/LOCKER_PATCH_AREA.png"
};

app.controller('orderController', ['$scope', 'orderById',  function ($scope, orderById) {

  var order = this;

  order.orderDetails = orderById;
  order.currentView = {};
  order.filtered = {};
  order.filtered.imageDataList = [];

  if (orderById.print_locations !== undefined) {
    var defaultImage = false;
    for (var pos in orderById.print_locations) {
      var imageDetail = orderById.print_locations[pos];
      // set default image to full front view
      if (imageDetail.view === 'fullfront') {
        defaultImage = true;
        order.currentView.view = imageDetail.view
        order.currentView.main = imageDetail.artAndApparelFile;
        order.currentView.sub = imageDetail.artFile;
      };
      imageDetail['viewImage'] = staticViewPath[imageDetail.view];
      order.filtered.imageDataList.push(imageDetail);
    };
    // add default view if full front does not exsit
    if (!defaultImage) {
      order.currentView.main = staticViewPath.fullfront;
    }
  }

  order.changeView = function (view) {
    // order.currentView.orderDetails =
    order.currentView.main = view.artAndApparelFile;
    order.currentView.sub = view.artFile;
    order.currentView.view = view.view
  };

  console.log(order)
}])
