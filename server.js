var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));






var aPost = new Post({
  text: "This is a post"
})

var anotherPost = new Post({
  text: "I made a post, too!"
})

aPost.comments.push({text: "Nice post!", user: "Wilson"});
aPost.comments.push({text: "How is the weather?", user: "Phyllis"});
aPost.comments.push({text: "Theres a snake in my boot!", user: "Woody"});

anotherPost.comments.push({text: "this post is okay", user: "Nelson"});

/*
aPost.save()
anotherPost.save();
*/

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
app.get('/posts', function(req, res){
  Post.find({}, function(err, allPosts){
    if(err){
      console.log(err);
      res.sendStatus(500).send("sorry");
    } else {
      res.send(allPosts);
    }
  });
});
// 2) to handle adding a post
app.post('/posts', function(req, res){
  var postFromClient = req.body;
  console.log(postFromClient)

  var NewPost = new Post(postFromClient);
  NewPost.save(function(err, savedPost){
    console.log('did it save into the db?')
    console.log(savedPost);
    res.send(savedPost);
  }) 
  
})
// 3) to handle deleting a post
app.delete('/posts/:postId', function(req, res){
  
  let postId = req.params.postId;
  console.log(postId);
  Post.find({_id: postId}, function (err, post){
    if (err) throw err;
    console.log(post);
  });
  Post.findByIdAndRemove(postId, function(err, removedPost){
    if (err) throw err;
    console.log(postId + ' was removed!');
    res.send(removedPost);
  });
});



// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
})
