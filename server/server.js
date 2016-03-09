const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/gallery_app_dev');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

const picGalleryRouter = require(__dirname + '/routes/pic_gallery_routes');

app.use('/api', picGalleryRouter);

var PORT = process.env.PORT || 3000;
module.exports.server = app.listen(PORT, () => console.log('server up on port: ' + PORT));
