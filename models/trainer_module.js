var mongoose = require('mongoose');

//trainer schema

var TrainerSchema = mongoose.Schema({
    department:{
        type: String,
        required: true
    },
    topicname:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    fileUploaded:{
        type:String,
        required: true
    }
});
var Trainer = module.exports = mongoose.model('Trainer',TrainerSchema)
module.exports = Trainer;
