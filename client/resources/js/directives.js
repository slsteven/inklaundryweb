// directive to validate password conformation matches password
app.directive('pwCheck', function() {
  return {
    require: 'ngModel',
    link: function(scope, ele, attr, mCtrl) {
      mCtrl.$parsers.unshift(function(viewValue, $scope) {
        var noMatch = scope.userSignupForm.password_confirmation.$viewValue != scope.userSignupForm.password.$viewValue;
        mCtrl.$setValidity('noMatch', !noMatch)
      })
    }
  }
})

// directive for file upload
app.directive('fileModel', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, ele, attr) {
      var model = $parse(attr.fileModel)
      var modelSetter = model.assign
      ele.bind('change', function() {
        //Call apply on scope, it checks for value changes and reflect them on UI
        scope.$apply(function() {
          //set the model value
          modelSetter(scope, ele[0].files[0])
        })
      })
    }
  }
}])
