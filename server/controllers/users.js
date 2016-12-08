var mongoose = require('mongoose');
var User     = mongoose.model('User')

module.exports = (function() {

  return {

    new: function(req, res) {
      //Check if user exists. If user does, then we just redirect
      User.findOne({'local.email': req.body.user.email}, function(err, user) {
        if (err) {
          res.json(err);
        };
        if (user) {
          res.json({ 'message': 'user already exists' });
        } else {
          // create a new user and save to database
          var newUser = new User();
          var u = req.body.user;
          newUser.name            = u.name;
          newUser.local.email     = u.email;
          newUser.local.password  = newUser.generateHash(u.password);

          newUser.save(function(err, result) {
            if(err) {
              res.json(err);
            }
            else {
              res.json({'message': 'Registration successful'});
            }
          });
        }
      });
    },
  }
})()
