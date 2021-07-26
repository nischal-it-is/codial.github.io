const Post=require('../models/post');
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // return res.render('home',{
        // Post.find({}.popoulate('user').exec(function(err,post){
        //     return res.render('home',{
        //         title: "Codial||Home",
        //         post:post
        //     })
        // })
        Post.find({}).populate('user').exec(function(err, post){
            return res.render('home', {
                title: "Codeial | Home",
                post:post
            });
        })
    
    
}
