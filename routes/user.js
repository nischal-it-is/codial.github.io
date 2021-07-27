const express=require('express');
const router=express.Router();
const passport=require('passport');
//console.log("router loaded");
//const homeController=require('../controllers/home_controller');
const userController=require('../controllers/user_controller');

//router.get('/',homeController.home);
router.get('/profile',passport.checkAuthenticate,userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create',userController.create);//this /create etc. are matched from views
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},//if fails to authenticate
), userController.createSession);//flow is if done then usercontroller.createsession otherwise failureRedirect
router.get('/sign-out',userController.destroySession);

module.exports=router;