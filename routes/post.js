const express=require('express');
const router=express.Router();
//console.log("router loaded");
//const homeController=require('../controllers/home_controller');
const postController=require('../controllers/post_controller');

//router.get('/',homeController.home);
router.get('/post',postController.post);
module.exports=router;