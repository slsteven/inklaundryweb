require('dotenv').config({path: __dirname + '/process.env'});
var express       = require('express');
var bodyParser    = require('body-parser');
var path          = require('path');
var app           = express();
var root          = __dirname;
var port          = process.env.PORT || 3000;
var mongoose      = require('mongoose');
var flash         = require('connect-flash');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var morgan        = require('morgan');
var multer        = require('multer');

// s3 image upload
var AWS = require('aws-sdk');
var multerS3 = require('multer-s3');

// Set aws region for future requests and access key/token.
AWS.config.region = 'us-west-2';
AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

var s3bucket = new AWS.S3({params: {Bucket: 'inklaundry'}});
s3bucket.createBucket();

// mongodb config
require('./server/config/mongoose_config.js');

// passport
var passport = require('./server/config/passport.js');

app.use(express.static(path.join(root, './client')));
app.use(express.static(path.join(root, './client/bower_components')));
app.use(bodyParser.urlencoded({extended: true}));  // get information from html forms
app.use(bodyParser.json());
app.use(morgan('dev'));  // log every request to the console
app.use(session({
  secret: 'inklaundry',
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser()); // read cookies (needed for auth)


app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// use this to remove # from angular routes
// app.get('/*', function(req, res){
//     res.sendFile(__dirname + '/client/index.html');
// });

var upload = multer({ dest: './uploads/' })

// routes
var routeSetter = require('./server/config/routes.js');
routeSetter(app, passport, upload, s3bucket);

app.listen(port, function() {
  console.log("listening on port 8000")
})
