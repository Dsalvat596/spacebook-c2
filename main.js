var posts = [];



const getTime = () => {
  var d = new Date();
  var n = d.getTime()
  return n;
}


var createPost = function (string, num) {
  var post = {
    text: string,
    id: num,
    comments: []
  };
  posts.push(post);
}



$('.add-post').click(function () {
  var postInput = $('#post-name').val();
  var postNum = getTime();

  createPost(postInput, postNum);
  renderPosts();
});

// on click, saves username and comment to array
$('.posts').on('click', '.comsubmit', function () {
  var clickedId = $(this).parent().data().id;
  var userNameTemp = $('.username').val();
  var commTemp = $('.comment').val();

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === clickedId) {
      var comObj = {
        user: userNameTemp,
        comment: commTemp
      };
      posts[i].comments.push(comObj);
    }
  };
 
    $('.post').append("<p>" + userNameTemp + ': ' + commTemp + "</p>")
});

var renderPosts = function () {
  $('.posts').empty();
  for (let i = 0; i < posts.length; i++) {
    $('.posts').append("<p " + "class='post' " + "data-id =" + posts[i].id + ">" + posts[i].text +
      ' <button type="button" class="btn btn-danger remove">REMOVE</button>' + 
      '<br> <input type="text" class="username" placeholder="username">' +
      '<input type="text" class="comment" placeholder="begin comment">' +
      '<button type="input" class="btn btn-success comsubmit">Submit</button></p>')
  }
}

// on click, selects the id# attribute, itereates and compares to find that obj in the array and splice it out
$('.posts').on('click', '.remove', function () {
  var clicked = $(this).parent().data().id;
  for (j = 0; j < posts.length; j++) {
    if (posts[j].id === clicked) {
      posts.splice(j, 1);
    }
  }
  renderPosts();

});