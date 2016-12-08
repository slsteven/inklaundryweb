app.factory('ordersResource', function($resource) {
  return $resource('/orders/:id');
})
