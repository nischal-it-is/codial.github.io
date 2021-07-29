const Post=require('../models/post');
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // return res.render('home',{ 
        //     return res.render('home',{
        //         title: "Codial||Home",
        //         post:post
        //     })
        // })
        Post.find({})
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        }).exec(function(err, post){
            return res.render('home', {
                title: "Codeial | Home",
                post:post
            });
        })
    
    
}
