const express=require('express');
const router=express.Router();
const passport=require('passport');
//console.log("router loaded");
//const homeController=require('../controllers/home_controller');
const commentController=require('../controllers/comment_controller');

//router.get('/',homeController.home);
router.post('/create',passport.checkAuthenticate,commentController.create);
module.exports=router;