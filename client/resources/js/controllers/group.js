app.controller('groupController', ['$scope', 'orderService', '$stateParams', 'orderById',

  function($scope, orderService, $stateParams, orderById) {

    var group = this;

    // details about order by ID
    group.orderDetails = orderById

    console.log("ORDER DETAILS", group.orderDetails)


    // summary of grouporder by orderID
    group.groupOrderSummary = function () {
      orderService.summary($stateParams.id, function (data) {
        group.summaryData = data;
        computeTotals();
      });
    };

    group.groupOrderSummary();

    computeTotals = function () {
      console.log("summary", group.summaryData)
      var sizeTotals = {
        xsmall: 0,
        small: 0,
        medium: 0,
        large: 0,
        xlarge: 0,
        xxlarge: 0
      };
      var totalQty = 0;
      for (var item in group.summaryData.data) {
        for (var size in group.summaryData.data[item].sizes) {
          console.log(group.summaryData.data[item].sizes[size])
          if (size === 'xsmall') {
            sizeTotals[size] += group.summaryData.data[item].sizes[size];
          } else if (size === 'small') {
            sizeTotals[size] += group.summaryData.data[item].sizes[size];
          } else if (size === 'medium') {
            sizeTotals[size] += group.summaryData.data[item].sizes[size];
          } else if (size === 'large') {
            sizeTotals[size] += group.summaryData.data[item].sizes[size];
          } else if (size === 'xlarge') {
            sizeTotals[size] += group.summaryData.data[item].sizes[size];
          } else if (size === 'xxlarge') {
            sizeTotals[size] += group.summaryData.data[item].sizes[size];
          }
        }
      }
      for (var tot in sizeTotals) {
        totalQty += sizeTotals[tot];
      }
      group.sizeTotals = sizeTotals;
      group.totalQty = totalQty;
      console.log(sizeTotals)
    }

}])
