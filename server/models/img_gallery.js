const mongoose = require('mongoose');
const normalizeUrl = require("normalizeurl");

var imgSchema= new mongoose.Schema({
  date: { type: Date, default: Date.now },
  url: String,
});

imgSchema.methods.normalizeLink = function(url) {
  var url = this.url = normalizeUrl(url);
  return url;
};
