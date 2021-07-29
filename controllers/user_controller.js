const User = require('../models/user');//importing user model


module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }
    else
    {
        return res.status(401).send('Unauthorized');
    }
}


/*manual authentication to render profile when signed in is matched
  module.exports.profile=function(req.res){
      if(req.cookies.user_id)
      {
          User.findByid(req.cookies.user_id,function(err,user){
              if(err){};
              return res.render('user_profile',}
              title: '',
              user: user
          }
          
      }
  }
*/


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }//if user is sign in then no sign up page for user
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }//if user is sign in then no sign in page for the user 
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        
        return res.redirect('back');
    }//if password is not equal to confirm password
    //finding that is there a user with current email and password and cnf pass match is done
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}
        //if user is not present then creating the user
        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return};
                //console.log(req.body);
                return res.redirect('/user/sign-in');//after authentication just redirect the sign-in page
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    // TODO later
    req.flash('success',"Logged In succesfully");
    return res.redirect('/');
}
/*manual authentication signin creation
    //find the user
     User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}
        //handle user found
        if(user)
        {
            if(user.password!=res.body.password)
            {
                return res.redirect('back');
            }
            //handle session everything goes fine
            res.cookie('user_id',user.id)
            return res.redirect('/user/profile');
        }
        else
        {
            return res.redirect('back');
        }

*/
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success',"You have succesfully logged out");
    return res.redirect('/');
    
}