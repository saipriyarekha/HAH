var mongoose = require('mongoose');

//faculty schema
var AdminSchema = mongoose.Schema ({
    name:{
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
    designation:{
        type: String,
        required: true
    }
});

var Admin = module.exports = mongoose.model('Admin',AdminSchema)
module.exports = Admin;