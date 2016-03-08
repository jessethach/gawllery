const express = require('express');
const ImgGallery = require(__dirname + '/../models/img_gallery');
const jsonParser = require('body-parser').json();
const errorHandle = require(__dirname + '/../lib/error_handle');
const handleDBError = require(__dirname + '/../lib/db_error');

var imgGalleryRouter = module.exports = exports = express.Router();

imgGalleryRouter.get('/gallery', (req, res) => {
  ImgGallery.find({}, (err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});

imgGalleryRouter.post('/gallery', jsonParser, (req, res) => {
  var newImg = new ImgGallery(req.body);
  newImg.forceID = req.user._id;
  newImg.save((err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});


imgGalleryRouter.put('/gallery/:id', jsonParser, (req, res) => {
  var imgData = req.body;
  delete imgData._id;
  ImgGallery.update({_id: req.params.id}, imgData, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({msg: 'success'});
  });
});

imgGalleryRouter.delete('/gallery/:id', (req, res) => {
  ImgGallery.remove({_id: req.params.id}, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({msg: 'success'});
  });
});
