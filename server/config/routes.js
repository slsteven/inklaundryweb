var nodemailer    = require('nodemailer');

// controllers ===========================
var users = require('../controllers/users.js');
var orders = require('../controllers/orders.js');
var groupOrder = require('../controllers/groupOrder.js');

module.exports = function(app, passport, upload, s3bucket) {

  // =====================================
  // SIGNUP ==============================
  // =====================================
  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return res.json({ message: err });
      }
      if (!user) {
        return res.status(401).json({ err: info.message });
      } else {
        res.status(200).json({ message: 'registration successful'});
      }
    })(req, res);
  });


  // =====================================
  // LOGIN ===============================
  // =====================================
  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return res.json({ message: err });
      }
      if (!user) {
        return res.status(401).json({ err: info.message });
      }
      req.logIn(user, function(err) {
        if (err) {
          res.json({ message: 'could not login user' });
        } else {
          res.status(200).json({ status: 'login successful', user: user});
        }
      });
    })(req, res, next);
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({ status: 'logged out' })
  });


  // =====================================
  // PERSISTENT USERS ====================
  // =====================================
  app.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
      return res.status(200).json({ status: false });
    }
    res.status(200).json({ status: true, user: req.user });
  });

  // =====================================
  // SEND EMAIL  =========================
  // =====================================
  app.get('/contact/sendemail', function(req, res) {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'inklaundry@gmail.com',
        pass: process.env.EMAILPdASS,
      }
    })

    // can send as plain text or html
    var mailOptions = {
      from: req.query.from,   // sender address
      to: req.query.to,       // list of receivers
      subject: 'Website: ' + req.query.subject, // Subject line
      html:
        '<b>From: </b><p>' + req.query.from + '</p>' +

        '<br>Body: </b> <p>' + req.query.description + '</p>'
    };

    transporter.sendMail(mailOptions, function(err, info) {
      console.log("err", err)

      if (err) {
        res.json({
          status: false,
          message: err.response
        });
      } else {
        res.json({
          status: true,
          message: 'Thank you for contacting us. We will reach out to you as soon as possible. Have a great day!'
       })
      }
    })
  });


  // =====================================
  // ORDER ROUTES ========================
  // =====================================
  // app.post('/orders', upload.single('myFile'), function(req, res) {
  //   console.log("body", req.body)
  //   console.log("file", req.file)
  //   orders.new(req, res, s3bucket)
  // });
  app.post('/orders', function (req, res) {
    console.log("orders route", req.body)
    orders.create(req, res);
  });
  app.get('/orders', function (req, res) {
    orders.all(req, res);
  });
  app.get('/orders/:id', function (req, res) {
    orders.get(req, res);
  });


  app.post('/order', function (req, res) {
    groupOrder.new(req, res);
  });
  app.get('/order/summary/:id', function (req, res) {
    console.log("server routes: summary")
    groupOrder.summary(req, res);
  })

};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();
  // if they aren't send false status and redirect
  return res.status(200).json({ status: false })
}
