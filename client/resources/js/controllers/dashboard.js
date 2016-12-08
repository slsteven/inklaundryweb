app.controller('dashboardController', ['$scope', 'ordersList', '$css', function ($scope, ordersList, $css) {
  var dashboard = this;

  $css.removeAll();

  dashboard.ordersList = ordersList;
}])
