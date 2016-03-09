var angular = require('angular');

describe('resource service', () => {

  var testService;
  var $httpBackend;
  var Resource;

  beforeEach(angular.mock.module('picGalleryApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, cfResource) {
    $httpBackend = _$httpBackend_;
    Resource = cfResource;
    testService = Resource('/test');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a service', () => {
    expect(typeof Resource).toBe('function');
  });

  it('should let service have prop of resourceName', () => {
    expect(testService.resourceName).toBe('/test');
  });

  it('should service the getAll function', () => {
    var successPic = {name: 'success pic!'};
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(200, successPic);
    testService.getAll((err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe(successPic.name);
    });
    $httpBackend.flush();
  });

  it('should service the handlerror helper function', () => {
    var successPic = {name: 'success pic!'};
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(404, 'what the what?');
    testService.getAll((err, res) => {
      expect(err.data).toBe('what the what?');
      expect(err.status).not.toBe(undefined);
      expect(res).toBe(undefined);
    });
    $httpBackend.flush();
  });

  it('should service the create function', () => {
    var pic = {name: 'created pic'};
    $httpBackend.expectPOST('http://localhost:3000/api/test', pic).respond(200, pic);
    testService.create(pic, (err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe(pic.name);
    });
    $httpBackend.flush();
  });

  it('should service the update function', () => {
    var pic = {name: 'updatepic', _id: 1};
    $httpBackend.expectPUT('http://localhost:3000/api/test/1', pic).respond(200, pic);
    testService.update(pic, (err, res) => {
      expect(err).toBe(null);
      expect(res._id).toBe(1);
    });
    $httpBackend.flush();
  });

  it('should service the delete function', () => {
    var pic = {name: 'deletepic', _id: 1};
    $httpBackend.expectDELETE('http://localhost:3000/api/test/1').respond(200, pic);
    testService.delete(pic, (err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe('deletepic');
    });
    $httpBackend.flush();
  });

});
