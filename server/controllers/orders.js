var mongoose = require('mongoose');
var Order    = mongoose.model('Order');
var fs       = require('fs');
var dateFormat    = require('dateformat')


module.exports = (function() {

  return {

    new: function(req, res, s3bucket) {
      console.log("server controller NEW", req)
      var x = JSON.stringify(eval("(" + req.body.model + ")"))
      console.log(JSON.parse(x).selectedLoc)
      var stream = fs.createReadStream(req.file.path)
      var params = {
        ACL: 'public-read',
        Key: req.file.originalname,
        Body: stream,
        bucket: 'inklaundry'
      };
      s3bucket.upload(params, function(err, data) {
        if (err) {
          res.send(err)
        } else {
          // check if order already exists in mongodb. If it does not, store
          // s3 image url and order details.
          var s3ImageUrl = data.Location;
          var date = dateFormat(new Date(), 'ddmmyyyy');
          var orderId = date + req.body.invoiceNumber
          Order.findOne({'order_Id': orderId}, function(err, order) {
            if (err) {
              res.json(err);
            }
            if (order) {
              console.log("already exists")
              res.send({ message: 'order ID already exists' })
            } else {
              var sizes = {
                xsmall: req.body.xsmall,
                small: req.body.small,
                medium: req.body.medium,
                large: req.body.large,
                xlarge: req.body.xlarge,
                xxlarge: req.body.xxlarge
              }
              // create a new instance of Order to save to mongodb
              var newOrder = new Order(req.body)
              newOrder.image_url = s3ImageUrl;
              newOrder.sizes = sizes;
              newOrder.save(function(errr, result) {
                if (errr) {
                  res.json(errr);
                } else {
                  res.json({'message': 'Upload successful'});
                }
              });
            }
          }) //end of Order.findOne()
        }
      });
    },

    create: function (req, res) {
      console.log("server controller", req.body)

      var order = {
        title: req.body.title,
        invoice: req.body.invoice,
        description: req.body.description,
        price: req.body.price,
        image_url: req.body.imageUrl,
        size_breakdown: req.body.sizeBreakdown,
        school_info: {
          school: req.body.selectedSchool,
          class: req.body.selectedClass,
          grade: req.body.selectedGrade
        },
        views: req.body.views,
        apparel_details: {
          brand: JSON.parse(req.body.selectedModel)[0],
          model: JSON.parse(req.body.selectedModel)[1],
          style: JSON.parse(req.body.selectedModel)[2],
          color: req.body.selectedColor
        }
      }
      var newOrder = new Order(order);
      newOrder.save(function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.json({message: 'upload successful'})
        }
      });
    },

    all: function (req, res) {
      Order.find(function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      })
    },
    get: function (req, res) {
      console.log("backend", req.params)
      Order.find({_id: req.params.id}, function (err, result) {
        if (err) {
          res.json(err);
        } else {
          console.log('res', result)
          res.json(result[0]);
        }
      })
    }
  }
})();
