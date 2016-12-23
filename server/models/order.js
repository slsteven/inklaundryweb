var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  order_Id: Number,
  title: String,
  invoice: String,
  group_message: String,
  group_name: String,
  school_info: {
    school: String,
    class: String,
    grade: String,
  },
  apparel_details: {
    brand: String,
    model: String,
    style: String,
    color: String
  },
  size_breakdown: {
    xsmall: Number,
    small: Number,
    medium: Number,
    large: Number,
    xlarge: Number,
    xxlarge: Number,
    xxxlarge: Number
  },
  price: String,
  views: [],
  student_emails: [],
  group_orders:  [{type: Schema.Types.ObjectId, ref: 'GroupOrder'}],
})

module.exports = mongoose.model('Order', OrderSchema)
