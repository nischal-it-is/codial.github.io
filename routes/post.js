const express=require('express');
const router=express.Router();
const passport=require('passport');
//console.log("router loaded");
//const homeController=require('../controllers/home_controller');
const postController=require('../controllers/post_controller');

//router.get('/',homeController.home);
router.post('/create',passport.checkAuthenticate,postController.create);
router.get('/destroy/:id',passport.checkAuthenticate,postController.destroy);
module.exports=router;