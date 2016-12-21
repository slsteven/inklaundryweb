var mongoose = require('mongoose');
var GroupOrder = mongoose.model('GroupOrder');
var Order = mongoose.model('Order');
// var id = mongoose.Types.ObjectId();

module.exports = (function () {

  return {

    new: function (req, res) {
      console.log("server", req.body)
      Order.findOne({'_id': req.body.orderId}, function (err, order) {
        var groupOrder = new GroupOrder({
          name: req.body.name,
          email: req.body.email,
          quantity: req.body.quantity,
          student_id: req.body.studentId,
          size: req.body.size,
          _order: req.body.orderId
        })

        order.group_orders.push(groupOrder);
        groupOrder.save(function (err, result) {
          order.save(function (err, result) {
            console.log("err", err)
            console.log("result", result)
            res.json(result)
          })
        })

      })
    },

    summary: function (req, res) {
      var orderId = new mongoose.mongo.ObjectId(req.params.id)
      GroupOrder.aggregate([
        { $match: { _order: orderId} },
        // { $group: { _id: "$size", total: { $sum: '$quantity' } } }
      ], function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      })
    }
  }
})()
