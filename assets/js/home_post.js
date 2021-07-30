{
    
    //method to submit data of the form using ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e)
        {
            console.log("default prevented");
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText);
                } 
            })
        })


    }
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
        <p>
           
                <small>
                    <a class="delete-post-button" href="/post/destroy/${post.id}">X</a>
                </small>
                
             ${post.content}
            <br>
             <small>
                ${post.user.name}
            </small> 
        </p>
        <div class="post-comments">
            
                <form action="/comment/create" id="new-post-form" method="POST">
                    <textarea name="content" cols="30" rows="3" placeholder="What's on your mind..."></textarea>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add comment">
                </form>
            
        </div>
        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
                
            </ul>
        </div>
    
        
    </li>`)
    }
    createPost();
}

