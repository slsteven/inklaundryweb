// =====================================
// AUTHORIZATION SERVICE ===============
// =====================================
app.service('authService', ['$http', '$q',

  function($http, $q) {

  // create user variable
  this.user = null;
  this.userProfile = {};

  this.isLoggedIn = function() {
    console.log("is logged in USER", this.user)
    var deferred = $q.defer();

    if (this.user) {
      return true;
    } else {
      deferred.reject(false)
    }
    return deferred.promise;
  };
  // =====================================
  // CHECK USER STATUS ===================
  // =====================================
  this.getUserProfile = function() {

    var deferred = $q.defer();

    $http.get('/status') //returns a promise
      // handle success
      .then(function (result) {
        console.log("Service get user data", result.data.user)
        deferred.resolve(result.data.user)
      },
      function (result) {
        deferred.reject(result);
      })
    return deferred.promise;
  }

  // user = {email: 'example@email.com', password: 'password'}
  // =====================================
  // SIGNUP SERVICE ======================
  // =====================================
  this.signup = function (user) {

    var deferred = $q.defer(); // create a new instance of deferred

    $http.post('/signup', { email: user.email, password: user.password })
      .success(function (data, status) {
        if (status == 200 && data.status) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      .error(function (data) {
        deferred.reject(data);
      });
    return deferred.promise;
  }

  // =====================================
  // LOGIN SERVICE =======================
  // =====================================
  this.login = function (user) {

    var deferred = $q.defer();

    var _this = this;

    $http.post('/login', { email: user.email, password: user.password })
      .then(function (data) {
        console.log("data", data)
        if (data.status == 200 && data.data.status) {
          _this.getUserProfile()
            .then(function(userInfo) {
              _this.user = true;
              _this.userProfile = userInfo
              deferred.resolve(data);
            })
        } else {
          _this.user = false;
          deferred.reject();
        }
      },
      function (data) {
        _this.user = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };

  // =====================================
  // LOGOUT SERVICE ======================
  // =====================================
  this.logout = function (callback) {
    var _this = this;
    $http.get('/logout')
      .then(function (resp) {
        _this.user = false;
        callback(resp);
      })
  }

}])


// =====================================
// EMAILER =============================
// =====================================
app.service('mainService', ['$http', function ($http) {

  this.sendEmail = function (email, callback) {
    var repackEmail = {
      to: 'inklaundry@gmail.com',
      from: email.email,
      subject: email.title,
      description: email.description,
      school: email.school
    }
    $http.get('/contact/sendemail', { params: repackEmail })
      .then(function (resp) {
        callback(resp);
      })
  }
}])

// =====================================
// MULTIPART FORM UPLOAD ===============
// =====================================
app.service('multipartFormService', ['$http', '$q', '_', function ($http, $q, _) {

  this.upload = function (url, data) {
    var imgData = _.pick(data, 'myFile')

    var deferred = $q.defer();

    var fd = new FormData()

    var model = _.omit(data, 'myFile')
    fd.append('model', angular.toJson(model))

    for (var key in data) {
      fd.append(key, data[key]);
    }

    $http.post(url, fd, {
      transFormRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      },
      data: {},
      uploadEventHandlers: {
        progress: function (e) {
          if (e.lengthComputable) {
            progressBar = (e.loaded / e.total) * 100;
            progressCounter = progressBar;
            deferred.notify(progressCounter);
          }
        }
      },
    })
    .success(function (data, status) {
      deferred.resolve(data);
    })
    return deferred.promise;
  }
}])


app.service('ordersService', ['$http', 'multipartFormService',

  function ($http, multipartFormService) {
    // create new customer order
    this.new = function (data, callback) {
      $http.post('/orders', data)
        .then(function (data, status) {
          console.log("Data", data)
          console.log("status", status)
          callback(data)
        })
    };

}])


app.service('orderService', ['$http',

  function ($http) {
    // create new group orders based on customer order id
    this.new = function (data, callback) {
      console.log("order Service")
      $http.post('/order', data)
        .then(function (data, status) {
          callback(data)
        })
    };

    this.summary = function (id, callback) {
      console.log("client service: summary", id)
      $http.get('/order/summary/' + id)
        .then(function (data, status) {
          console.log("status", status)
          callback(data);
        })
    }
}])
