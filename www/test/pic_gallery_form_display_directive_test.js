var angular = require('angular');
var template = require('../app/templates/pic_gallery/directives/pic_gallery_form.html');

describe('pic form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('picGalleryApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.when('GET', '/templates/pic_gallery/directives/pic_gallery_form.html').respond(200, template);

    var element = $compile('<pic-form data-pic="{}" data-button-text="test button"></pic-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/pic_gallery/directives/pic_gallery_form.html').respond(200, template);
    var called = false;
    scope.pic = {name: 'inside scope'};

    scope.testSave = function(input) {
      scope.pic = input;
      called = true;
    };

    var element = $compile('<pic-form data-pic="{name: \'inside directive\'}" data-save=testSave></pic-form>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().save(scope)({name: 'test pic'});
    expect(called).toBe(true);
    expect(scope.pic.name).toBe('test pic');
  });

});
