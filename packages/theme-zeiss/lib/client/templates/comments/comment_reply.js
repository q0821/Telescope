Template.comment_reply.helpers({
  video: function () {
    return this.media && this.media.type === "video" && this.media;
  },
  showThumbnail: function () {
    return this.thumbnailUrl && !(this.media && this.media.type === "video");
  }
});

Template.comment_reply.onRendered(function () {
  $(".js-video").fitVids({ customSelector: "iframe.embedly-embed"});

  var post = Posts.findOne(FlowRouter.getParam("_id"));
  $(".body-overlay").css("background-image", "url("+post.thumbnailUrl+")");
});

Template.comment_reply.onDestroyed(function () {
  $(".body-overlay").css("background-image", "");
});