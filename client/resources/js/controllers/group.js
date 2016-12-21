app.controller('groupController', ['$scope', 'orderService', '$stateParams',

  function($scope, orderService, $stateParams) {

    var group = this;
    // summary of grouporder by orderID
    group.groupOrderSummary = function () {
      console.log("client controller: Summary")
      orderService.summary($stateParams.id, function (data) {
        console.log("summary", data);
        group.summaryData = data;
      });
    };

    group.groupOrderSummary();

}])
