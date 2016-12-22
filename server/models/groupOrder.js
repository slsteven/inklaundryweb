var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupOrderSchema = new Schema({
  name: String,
  email: String,
  total_quantity: Number,
  student_id: Number,
  sizes: {
    xsmall: Number,
    small: Number,
    medium: Number,
    large: Number,
    xlarge: Number,
    xxlarge: Number
  },
  _order: {type: Schema.Types.ObjectId, ref: 'Order'},
})

module.exports = mongoose.model('GroupOrder', GroupOrderSchema);
