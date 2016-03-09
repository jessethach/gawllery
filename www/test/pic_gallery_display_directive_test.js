var angular = require('angular');
var template = require('../app/templates/pic_gallery/directives/pic_gallery.html');

describe('pic display directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('picGalleryApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive with an appropriate scope', () => {
    $httpBackend.when('GET', '/templates/pic_gallery/directives/pic_gallery.html').respond(200, template);
    var scope = $rootScope.$new();
    scope.newPic = {name: 'test pic', url: 'green'};
    var element = $compile('<pic-gallery data-pic-data="newPic">This is a test</pic-gallery>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test pic');
    expect(element.html()).toContain('This is a test');
  });

  it('should load the directive with an appropriate object', () => {
    $httpBackend.when('GET', '/templates/pic_gallery/directives/pic_gallery.html').respond(200, template);
    var scope = $rootScope.$new();
    var element = $compile('<pic-gallery data-pic-data="{name: \'test\', url: \'blue\'}">inside directive</pic-gallery>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test');
    expect(element.html()).toContain('blue');
    expect(element.html()).toContain('inside directive');
  });
});
