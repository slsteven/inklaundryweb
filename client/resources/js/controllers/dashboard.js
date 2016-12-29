app.controller('dashboardController', ['$scope', 'ordersList', '$css', 'authService',

  function ($scope, ordersList, $css, authService) {

    var dashboard = this;

    $css.removeAll();

    dashboard.ordersList = ordersList;

    //get user data
    dashboard.user = authService.userProfile.local;
}])
