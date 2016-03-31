Template.posts_list.helpers({
  shouldAddAd: function(index){
    //console.log(index);
    //var rand = Number.parseInt(Math.random() * 4);
    //console.log(rand);
    //return  rand=== index;
    return index === 0;
  }
});