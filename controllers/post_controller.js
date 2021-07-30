const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
      let post=await Post.create({
        content:req.body.content,
        user: req.user._id
    });
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message:"Post created succesfully"
        });
    }
        return res.redirect('back');
    }
    catch(err)
    {
        console.log(err);
        return;
    }
}

// module.exports.destroy=function(req,res){
//     Post.findById(req.params.id,function(err,post){
//         if(post.user==req.user.id)
//         {
//             post.remove();
//             Comment.deleteMany({post:req.param.id},
//                 function(err){
//                     return res.re('back');
//                 })
//         }
//         else
//         {
//             return res.redirect('back');
//         }
//     })
// }
// module.exports.destroy = async function(req, res){
//     //console.log(req.params.id);
//     //founded the req by a particular id
//     try{
//         let post= await Post.findById(req.params.id, function(err, post){
//             // .id means converting the object id into string
//             //console.log(post.user)
//             if (post.user == req.user.id){
//                 post.remove();
    
//                 await Comment.deleteMany({post: req.params.id})
//                 return res.redirect('back');
//             }else
//             {
//                 res.redirect('back');
//             }
    
//         });
//     }
//     catch(err){
//         console.log(err);
//         return;
//     }
    
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error', err);
        return;
    }
    
}
