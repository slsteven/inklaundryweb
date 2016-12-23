app.controller('galleryController', ['$scope',

  function($scope) {

    var gallery = this;

    $scope.conf = {
      // thumbnails  :   true,
      inline      :   false,
      bubbles     :   true,
      imgBubbles  :   false,
      bgClose     :   false,
      imgAnim     :   'fadeup'
    };

    $scope.methods = {};

    $scope.openGallery = function () {
      console.log("OPEN")
      $scope.methods.open();
    }

    // $scope.images = [
    //   {
    //     'url': 'resources/img/gallery_img_2.png',
    //     'thumbUrl': 'resources/img/gallery_img_1.png'
    //   },{
    //     'url': 'resources/img/gallery_img_2.png',
    //     'thumbUrl': 'resources/img/gallery_img_2.png'
    //   },{
    //     'url': 'resources/img/gallery_img_16.png',
    //     'thumbUrl': 'resources/img/gallery_img_16.png'
    //   },{
    //     'url': 'resources/img/gallery_img_4.png',
    //     'thumbUrl': 'resources/img/gallery_img_4.png'
    //   },{
    //     'url': 'resources/img/gallery_img_5.png',
    //     'thumbUrl': 'resources/img/gallery_img_5.png'
    //   },{
    //     'url': 'resources/img/gallery_img_6.png',
    //     'thumbUrl': 'resources/img/gallery_img_6.png'
    //   },{
    //     'url': 'resources/img/gallery_img_7.png',
    //     'thumbUrl': 'resources/img/gallery_img_7.png'
    //   },{
    //     'url': 'resources/img/gallery_img_8.png',
    //     'thumbUrl': 'resources/img/gallery_img_8.png'
    //   },{
    //     'url': 'resources/img/gallery_img_9.png',
    //     'thumbUrl': 'resources/img/gallery_img_9.png'
    //   },{
    //     'url': 'resources/img/gallery_img_10.png',
    //     'thumbUrl': 'resources/img/gallery_img_10.png'
    //   },{
    //     'url': 'resources/img/gallery_img_11.png',
    //     'thumbUrl': 'resources/img/gallery_img_11.png'
    //   },{
    //     'url': 'resources/img/gallery_img_12.png',
    //     'thumbUrl': 'resources/img/gallery_img_12.png'
    //   },{
    //     'url': 'resources/img/gallery_img_13.png',
    //     'thumbUrl': 'resources/img/gallery_img_13.png'
    //   },{
    //     'url': 'resources/img/gallery_img_14.png',
    //     'thumbUrl': 'resources/img/gallery_img_14.png'
    //   },{
    //     'url': 'resources/img/gallery_img_15.png',
    //     'thumbUrl': 'resources/img/gallery_img_15.png'
    //   },
    // ]

}])
