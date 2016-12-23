app.controller('dashboardController', ['$scope', 'ordersList', '$css', 'authService',

  function ($scope, ordersList, $css, authService) {

    var dashboard = this;

    $css.removeAll();

    dashboard.ordersList = ordersList;

    //get user data
    authService.getUserStatus()
      .then(function (data) {
        console.log("DATA FROM GET USER", data)
      })
}])
