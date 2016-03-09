const mongoose = require('mongoose');
const normalizeUrl = require('normalizeurl');

var picSchema= new mongoose.Schema({
  name: String,
  url: String,
  id: Number
});

picSchema.methods.normalizeLink = function(url) {
  var normalurl = this.url = normalizeUrl(url);
  return mormarlurl;
};

module.exports = exports = mongoose.model('PicGallery', picSchema);
