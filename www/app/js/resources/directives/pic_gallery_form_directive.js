module.exports = function(app) {
  app.directive('picForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/pic_gallery/directives/pic_gallery_form.html',
      scope: {
        buttonText: '@',
        pic: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.pic = $scope.pic || {name: 'Unknown'};
      }
    };
  });
};
