Template.post_thumbnail.helpers({
  getDuration: function () {
    if (this.media && this.media.duration) {
      var duration = moment.duration(this.media.duration, 'seconds');
      return duration.humanize();
    }
  },
  youtubeClass: function() {
    return (this.thumbnailUrl.indexOf('i.ytimg.com')>-1) ? 'youtube-thumb' : '';
  }
});