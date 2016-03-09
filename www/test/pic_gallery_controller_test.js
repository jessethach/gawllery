var angular = require('angular');

describe('it should do some stuff', () => {
  it('should work after a build', () => {
    expect(true).toBe(true);
  });
});

describe('gallery controller', () => {
  var $httpBackend;//takes parameters from user such a GET request and returns a promise
  var $scope;
  var $ControllerConstructor;
  var pic;

  beforeEach(angular.mock.module('picGalleryApp'));

  beforeEach(angular.mock.inject(($rootScope, $controller) => {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var picGalleryController = $ControllerConstructor('PicGalleryController', {$scope});
      expect(typeof picGalleryController).toBe('object');
      expect(Array.isArray($scope.gallery)).toBe(true);
      expect(typeof $scope.getAllPic).toBe('function');

  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('PicGalleryController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/gallery', () => {
      $httpBackend.expectGET('http://localhost:3000/api/gallery').respond(200, [{name: 'test pic'}]);
      $scope.getAllPic();
      $httpBackend.flush();
      expect($scope.gallery.length).toBe(1);
      expect(Array.isArray($scope.gallery)).toBe(true);
      expect($scope.gallery[0].name).toBe('test pic');
    });

    it('should create a new pic', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/gallery', {name: 'the sent pic'}).respond(200, {name: 'the response pic'});
        $scope.newPic = {name: 'the new pic'};
        $scope.createPic({name: 'the sent pic'});
        $httpBackend.flush();
        expect($scope.gallery.length).toBe(1);
        expect($scope.newPic).toBe(null);
        expect($scope.gallery[0].name).toBe('the response pic');
    });

    it('should be able to update a pic', () => {
      var pic = {_id: 1, editing: true};
      $httpBackend.expectPUT('http://localhost:3000/api/gallery' + '/1').respond(200);
      $scope.updatePic(pic);
      $httpBackend.flush();
      expect(pic.editing).toBe(false);
    });

    it('should be able to delete a pic', () => {
      var pic = {_id: 1, name: 'test pic'};
      $scope.gallery = [pic];
      $httpBackend.expectDELETE('http://localhost:3000/api/gallery' + '/1').respond(200);
      $scope.deletePic(pic);
      $httpBackend.flush();
      expect($scope.gallery.length).toBe(0);
    });

  });
});
