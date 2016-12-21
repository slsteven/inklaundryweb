var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupOrderSchema = new Schema({
  name: String,
  email: String,
  quantity: Number,
  student_id: Number,
  size: String,
  _order: {type: Schema.Types.ObjectId, ref: 'Order'},
})

module.exports = mongoose.model('GroupOrder', GroupOrderSchema);
