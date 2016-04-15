Template.post_page.helpers({
  video: function () {
    var media = this.media;
    return media && this.media.type === "video" && media;
  },
  showThumbnail: function () {
    return this.thumbnailUrl && !(this.media && this.media.type === "video");
  },
  isYoutube: function(){
    return this.html.indexOf('killer@youtube') > -1;
  },
  youtubeId: function(){
    return 'M7lc1UVf-VE';
  }

});

Template.post_page.onRendered(function () {
  $(".js-video").fitVids({ customSelector: "iframe.embedly-embed"});

  var post = Posts.findOne(FlowRouter.getParam("_id"));
  $(".body-overlay").css("background-image", "url("+post.thumbnailUrl+")");
 ;
});

Template.post_page.onDestroyed(function () {
  $(".body-overlay").css("background-image", "");
});