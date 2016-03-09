const express = require('express');
const jsonParser = require('body-parser').json();
const PicGallery = require(__dirname + '/../models/pic_gallery');
const errorHandle = require(__dirname + '/../lib/error_handle');
const handleDBError = require(__dirname + '/../lib/db_error');

var picGalleryRouter = module.exports = exports = express.Router();

picGalleryRouter.get('/gallery', (req, res) => {
  PicGallery.find({}, (err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});

picGalleryRouter.post('/gallery', jsonParser, (req, res) => {
  var newPic = new PicGallery(req.body);
  newPic.save((err, data) => {
    if (err) return errorHandle(err, res);

    res.status(200).json(data);
  });
});


picGalleryRouter.put('/gallery/:id', jsonParser, (req, res) => {
  var picData = req.body;
  delete picData._id;
  PicGallery.update({_id: req.params.id}, picData, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({msg: 'success'});
  });
});

picGalleryRouter.delete('/gallery/:id', (req, res) => {
  PicGallery.remove({_id: req.params.id}, (err) => {
    if (err) return errorHandle(err, res);

    res.status(200).json({msg: 'success'});
  });
});
