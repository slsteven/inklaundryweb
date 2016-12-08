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
      .success(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })
      // handle error
      .error(function (data) {
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
      .success(function (data, status) {
        if (status == 200 && data.status) {
          user = true;
          deferred.resolve();
        } else {
          user = false;
          deferred.reject();
        }
      })
      .error(function (data) {
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
      .success(function (resp) {
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
      .success(function (resp) {
        callback(resp);
      })
  }
}])

// =====================================
// MULTIPART FORM UPLOAD ===============
// =====================================
app.service('multipartFormService', ['$http', '$q', '_', function ($http, $q, _) {

  this.upload = function (url, data) {
    console.log("form", data)
    var imgData = _.pick(data, 'myFile')

    var deferred = $q.defer();

    var fd = new FormData()

    var model = _.omit(data, 'myFile')
    fd.append('model', angular.toJson(model))

    for (var key in data) {
      fd.append(key, data[key]);
    }

    console.log("multipartFormService FD", fd)

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


app.service('orderService', ['$http', 'multipartFormService', function ($http, multipartFormService) {

  this.new = function (data, callback) {
    multipartFormService.upload().success
    // $http.post('/orders', data).success(function (data, status) {
      // callback(status)
    // })
  };

}])
