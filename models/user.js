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
    },
    rollno:{
        type: String,
        required: true
    },
    yop:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    phno:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    fphno:{
        type: String,
        required: true
    },
    mname:{
        type: String,
        required: true
    },
    mphno:{
        type: String,
        required: true
    },
    fileUploaded:{
        type: String,
        required: true
    }
});
var User = module.exports = mongoose.model('User',UserSchema)
module.exports = User;
