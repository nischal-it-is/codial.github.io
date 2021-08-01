const mongoose = require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/user/avatar');
//creating a schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true //email has to be unique
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
},
{
    timestamps: true
});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
  userSchema.statics.avatarPath=AVATAR_PATH;
   

const User = mongoose.model('User', userSchema);

module.exports = User;