Template.posts_list.helpers({
  shouldAddAd: function(index){
    return (index === 0 || index % 16 === rand);
  }
});

Template.posts_list.onRendered(function(){
  rand = Number.parseInt(Math.random() * 9) + 5;
});