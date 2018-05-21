    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
    class PostsRepository {
        constructor() {
            this.posts = [];

        }

      

        getPosts() {
            return $.get('/posts')
                .then(function (postsFromServer) {
                    this.posts = postsFromServer;
                    return this.posts;
                })
                
        }

        addPost(postText) {
            var newPost = {text: postText};
             $.ajax({
                method: "POST",
                url: '/posts',
                data: newPost
            }) .then(function(postFromServer){
                console.log(postFromServer);
                this.posts.push(postFromServer);
                return this.posts;
            })
            
          
        }

        removePost(Id) {
           return $.ajax({
                method: "DELETE",
                url: '/posts/' + Id,
                
            });
        }

        addComment(newComment, postIndex) {
            this.posts[postIndex].comments.push(newComment);
        };

        deleteComment(postIndex, commentIndex) {
            this.posts[postIndex].comments.splice(commentIndex, 1);
        };
    }

    export default PostsRepository