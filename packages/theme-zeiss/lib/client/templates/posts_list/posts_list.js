Template.posts_list.helpers({
  shouldAddAd: function(index){
    return (index === 0 || index % 16 === 15);
  }
});