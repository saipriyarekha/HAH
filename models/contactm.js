var mongoose = require('mongoose');

//contact schema
var ContactSchema = mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    mname:{
        type: String,
        required: true
    },
    cno:{
        type: String,
        required: true
    },
    pcno:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }   
});
var Contact = module.exports = mongoose.model('Contact',ContactSchema);
module.exports = Contact;
