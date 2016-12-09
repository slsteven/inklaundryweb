// var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');
// var Schema   = mongoose.Schema;

// var UserSchema = new Schema({
//   name: {type: String },
//   // topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],

//   local: {
//     email: String,
//     password: String,
//   },
//   facebook: {
//     id: String,
//     token: String,
//     email: String,
//     name: String
//   }
// });

// //methods =============================
//   //generate hash
// UserSchema.methods.generateHash = function(password){
//   return
// };

//   // checking if password is valid
// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// // module.exports = mongoose.model('User', UserSchema)
