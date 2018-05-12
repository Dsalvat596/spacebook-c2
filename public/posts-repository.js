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
           return $.ajax({
                method: "POST",
                url: '/posts',
                data: newPost
            }) .then(function(postFromServer){
                console.log(postFromServer);
                this.posts.push(postFromServer);
                return this.posts;
            })
            
          
        }

        removePost(index) {
           return $.ajax({
                method: "DELETE",
                url: '/posts/' + index,
                
            })
            this.posts.splice(index, 1);
        }

        addComment(newComment, postIndex) {
            this.posts[postIndex].comments.push(newComment);
        };

        deleteComment(postIndex, commentIndex) {
            this.posts[postIndex].comments.splice(commentIndex, 1);
        };
    }

    export default PostsRepository