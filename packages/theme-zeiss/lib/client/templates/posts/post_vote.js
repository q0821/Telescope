Template.post_vote.helpers({
  isLiked: function () {
    var user = Meteor.user();
    return user && user.hasUpvoted(this);
  },
  isDisliked: function(){
    var user = Meteor.user();
    return user && user.hasDownvoted(this);
  },
  voteCounts: function(){
    return this.upvotes - this.downvotes;
  }
});
