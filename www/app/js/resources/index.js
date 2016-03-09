module.exports = function(app) {
  require('./controllers/pic_gallery_controller')(app);
  require('./directives/pic_gallery_display_directive')(app);
  require('./directives/pic_gallery_form_directive')(app);
};
