var mongoose = require('mongoose');

//user schema
var UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    }
});
var User = module.exports = mongoose.model('User',UserSchema);
module.exports = User;
