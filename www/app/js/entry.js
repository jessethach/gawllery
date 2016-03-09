const angular = require('angular');
require('angular-route');
const picGalleryApp = angular.module('picGalleryApp', ['ngRoute']);

require('./services')(picGalleryApp);

require('./resources')(picGalleryApp);

picGalleryApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'PicGalleryController',
      templateUrl: '/views/pic_gallery_view.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);
