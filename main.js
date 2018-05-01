var SpacebookApp = function () {
  
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];
  var STORAGE_ID = 'spacebook';
  var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(posts));
  }
  var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }
  // the current id to assign to a post
  var currentId = 0;
  var commentId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }

    currentId += 1;

    posts.push(post);
    saveToLocalStorage();
  }

  var renderPosts = function () {
    $posts.empty();
    posts = getFromLocalStorage();

   var source = $('#posts-template').html();
   var template = Handlebars.compile(source);
  
   for(let i=0; i <posts.length; i++){
     var newHTML = template(posts[i]);
     $posts.append(newHTML);
   }

   console.log(posts);
  }
  




  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
    saveToLocalStorage();
  }


  var createComment = function (comment, postId) {
    var post = _findPostById(postId);
    console.log(post);

    var commentObj = {
      text: comment,
      id: commentId
    };
    post.comments.push(commentObj);
    commentId += 1;
    saveToLocalStorage();
    console.log(posts);
  }


  var renderComments = function (comments) {
    let commentString = '';
    for (let i = 0; i < comments.length; i++) {
      commentString += '<p class="comments-list" data-id=' + comments[i].id + '> ' + comments[i].text + '<button class="btn btn-warning remove-comment">Remove</button>' + '</p>';
    }
    return commentString;
  }


  var removeComment = function (currentComment) {
    var postPid = $(currentComment).closest('.post').data().id;

    var commPid = $(currentComment).parent('.comments-list').data().id;

    posts[postPid].comments.splice(posts.indexOf(commPid), 1);
    console.log(posts);
    saveToLocalStorage();
    $(currentComment).parent().remove();
   
  }




  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('showit');
  }




  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    posts: posts,
    getFromLocalStorage: getFromLocalStorage,

    // TODO: Implement
    createComment: createComment,

    // TODO: Implement
    renderComments: renderComments,

    // TODO: Implement
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}


var app = SpacebookApp();
// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
  $('#post-name').val('');
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  var comment = $(this).parent().find('.comment-name').val();
  var postId = $(this).closest('.post').data().id;

  app.createComment(comment, postId);
  app.renderPosts();

})

$('.posts').on('click', '.remove-comment', function () {
  app.removeComment(this);
})