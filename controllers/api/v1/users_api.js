
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){

    try{
        let user = await User.findOne({email: req.body.email});//finding a user

        if (!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });//invalid user if user is not found or password is incoreect
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '100000'})
            }//creating the token sign is a function 1)converting user to json 2)key is codeial
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}