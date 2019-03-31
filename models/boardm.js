var mongoose = require('mongoose');

//board schema
var BoardSchema = mongoose.Schema({
    sboard:{
        type: String,
        required: true
    },
    sname:{
        type: String,
        required: true
    },
    spercentage:{
        type: String,
        required: true
    },
    syear:{
        type: String,
        required: true
    },
    iboard:{
        type: String,
        required: true
    },
    iname:{
        type: String,
        required: true
    },
    ipercentage:{
        type: String,
        required: true
    },
    iyear:{
        type: String,
        required: true
    }   
});
var Board = module.exports = mongoose.model('Board',BoardSchema);
module.exports = Board;
