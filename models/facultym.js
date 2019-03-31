var mongoose = require('mongoose');

//faculty schema
var FacultySchema = mongoose.Schema ({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    comp:{
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
    }
});

var Faculty = module.exports = mongoose.model('Faculty',FacultySchema)
module.exports = Faculty;