Template.comment_reply.helpers({
  video: function () {
    return this.media && this.media.type === "video" && this.media;
  },
  showThumbnail: function () {
    return this.thumbnailUrl && !(this.media && this.media.type === "video");
  },
  getParentContext: function () {
    console.log('in get ParentContext');
    console.log(this);
    return { comment: this};
  },
  commentFields: function () {
    return Comments.simpleSchema().getEditableFields(Meteor.user());
  },
});

Template.comment_reply.onRendered(function () {
  $(".js-video").fitVids({ customSelector: "iframe.embedly-embed"});

  var post = Posts.findOne(FlowRouter.getParam("_id"));
  $(".body-overlay").css("background-image", "url("+post.thumbnailUrl+")");
});

Template.comment_reply.onDestroyed(function () {
  $(".body-overlay").css("background-image", "");
});


AutoForm.hooks({
  replyCommentForm: {

    before: {
      method: function(doc) {

        var comment = doc;

        this.template.$('button[type=submit]').addClass('loading');
        this.template.$('input, textarea').not(":disabled").addClass("disabled").prop("disabled", true);

        var parent = this.formAttributes.parentContext;

        if (!!parent.comment) { // child comment
          var parentComment = parent.comment;
          comment.parentCommentId = parentComment._id;
          comment.postId = parentComment.postId;

          if(!parentComment.topLevelCommentId) { // root comment
            comment.topLevelCommentId = parentComment._id;
          } else { // nested comment
            comment.topLevelCommentId = parentComment.topLevelCommentId;
          }
        } else { // root comment
          var post = parent;
          comment.postId = post._id;
        }

        // ------------------------------ Checks ------------------------------ //

        if (!Meteor.user()) {
          Messages.flash(i18n.t('you_must_be_logged_in'), 'error');
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //

        // run all comment submit client callbacks on properties object successively
        comment = Telescope.callbacks.run("commentSubmitClient", comment);

        return comment;
      }
    },

    onSuccess: function(operation, comment) {
      this.template.$('button[type=submit]').removeClass('loading');
      this.template.$('.disabled').removeClass("disabled").prop("disabled", false);
      var post = Posts.findOne(comment.postId);
      console.log('onSuccess:');
      console.log(comment);
      Events.track("new comment", {'commentId': comment._id});
      FlowRouter.go('postPage', {_id: comment.postId, slug: post.slug});
      if (comment.status === Posts.config.STATUS_PENDING) {
        Messages.flash(i18n.t('thanks_your_post_is_awaiting_approval'), 'success');
      }
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      this.template.$('.disabled').removeClass("disabled").prop("disabled", false);

      Messages.flash(error.message.split('|')[0], 'error'); // workaround because error.details returns undefined
      Messages.clearSeen();
    }

  }
});