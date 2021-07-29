const Post=require('../models/post');
const User=require('../models/user');
// module.exports.home=function(req,res){
//     // console.log(req.cookies);
//     // return res.render('home',{ 
//         //     return res.render('home',{
//         //         title: "Codial||Home",
//         //         post:post
//         //     })
//         // })
//         Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comment',
//             populate: {
//                 path: 'user'
//             }
//         })
//         .exec(function(err, posts){

//             User.find({}, function(err, users){
//                 return res.render('home', {
//                     title: "Codeial | Home",
//                     post:  posts,
//                     all_users: users
//                 });
//             });
    
           
//         })
    
    
           //using async and await
           module.exports.home=async function(req,res){
            try{
            let post=await Post.find({})
                    .populate('user')
                    .populate({
                        path: 'comment',
                        populate: {
                            path: 'user'
                        }
                    });
             let user=await User.find();        
             return res.render('home', {
                title: "Codeial | Home",
                post:  post,
                all_users: user
            });
        }catch(err){
            console.log(err);
        }
    
    
}
