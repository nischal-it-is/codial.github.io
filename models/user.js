const mongoose = require('mongoose');
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
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;