module.exports = function(app) {
  app.directive('picGallery', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/pic_gallery/directives/pic_gallery.html',
      scope: {
        picData: '='
      }
    };
  });
};
