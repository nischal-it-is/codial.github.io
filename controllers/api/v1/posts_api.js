const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

//finding out a list of posts
module.exports.index=async function(req,res){
    
    let post=await Post.find({})
            .populate('user')
            .populate({
                path: 'comment',
                populate: {
                    path: 'user'
                }
            });
    return res.json(200,{
        message: "lists of posts",
        posts:post
    })
}
// module.exports.destroy = async function(req, res){

//     try{
//         let post = await Post.findById(req.params.id);
//             post.remove();

//             await Comment.deleteMany({post: req.params.id});
//             return res.json(200,{
//                 message:"Post and its content deleted"
//             })
//         // else{
//         //     return res.redirect('back');
//         // }
    
//     }catch(err){
//         console.log(err);
//         return res.json(500,{
//             message: "Internal Server error"
//         });
//     }
    

// }
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


    
            return res.json(200, {
                message: "Post and associated comments deleted successfully!"
            });
        }else{
            return res.json(401,{
                message: "you cannot delte this post"
            })
        }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}