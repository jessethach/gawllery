'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLABL_URI = 'mongodb://localhost/gallery_app_test';
const server = require(__dirname + '/../server');
const PicGallery = require(__dirname + '/../models/pic_gallery');
const request = chai.request;

describe('The Gallery API', () => {

  it('should be able to retrieve all gallery', (done) => {
    request('localhost:3000')
      .get('/api/gallery')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a pic with a POST', (done) => {
    request('localhost:3000')
      .post('/api/gallery')
      .send({name: 'test-jin'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test-jin');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a pic already in db', () => {

    beforeEach((done) => {
      PicGallery.create({name: 'test-beforeeach'}, (err, data) => {
        if (err) return console.log(err);
        this.testPicGallery = data;
        done();
      });
    });

    after((done) => {
      mongoose.connection.db.dropDatabase(done);
    });

    it('shoud be able to update a pic', (done) => {
      request('localhost:3000')
        .put('/api/gallery/' + this.testPicGallery._id)
        .send({name: 'new-test-beforeeach'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a pic', (done) => {
      request('localhost:3000')
        .delete('/api/gallery/' + this.testPicGallery._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

  });

  after((done) => {
    server.close(done);
  });

});
