var angular = require('angular');

module.exports = function(app) {
  app.controller('PicGalleryController', ['$scope', '$http', 'cfResource', function($scope, $http, Resource) {
    $scope.gallery = [];
    var picService = Resource('/gallery');

    $scope.getAllPic = function() {
      picService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.gallery = res;
      });
    };

    $scope.createPic = function(pic) {
      picService.create(pic, function(err, res) {
        if (err) return console.log(err);
        $scope.gallery.push(res);
        $scope.newPic = null;
      });
    };

    $scope.deletePic = function(pic) {
      picService.delete(pic, function(err, res) {
        if (err) return console.log(err);
        $scope.gallery = $scope.gallery.filter((i) => i !== pic);
      });
    };

    $scope.updatePic = function(pic) {
      picService.update(pic, function(err, res) {
        pic.editing = false;
        if (err) return console.log(err);
      });
    };

  }]);
};
