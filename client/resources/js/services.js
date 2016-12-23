// =====================================
// AUTHORIZATION SERVICE ===============
// =====================================
app.service('authService', ['$http', '$q',

  function($http, $q) {

  // create user variable
  var user = null;

  this.isLoggedIn = function() {
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  // =====================================
  // CHECK USER STATUS ===================
  // =====================================
  this.getUserStatus = function() {
    return $http.get('/status') //returns a promise
      // handle success
      .then(function (data) {
        console.log("Service get user data", data)
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      },
      function (data) {
        user = false;
      });
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

    $http.post('/login', { email: user.email, password: user.password })
      .then(function (data) {
        console.log("data", data)
        if (data.status == 200 && data.data.status) {
          user = true;
          deferred.resolve(data);
        } else {
          user = false;
          deferred.reject();
        }
      },
      function (data) {
        user = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };

  // =====================================
  // LOGOUT SERVICE ======================
  // =====================================
  this.logout = function (callback) {
    $http.get('/logout')
      .then(function (resp) {
        user = false;
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
