Posts.views.add("short", function (terms) {
  return {
    find: {"media.duration": {$lte: 180}},
    options: {sort: {sticky: -1, score: -1}}
  };
});

Posts.views.add("nogood", function (terms) {
  return {
    options: {sort: {sticky: -1, score: 1}}
  };
});