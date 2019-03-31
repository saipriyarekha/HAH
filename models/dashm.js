var mongoose = require('mongoose');

//user schema
var DashSchema = mongoose.Schema({
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
    }
});
var Dash = module.exports = mongoose.model('Dash',DashSchema)
module.exports = Dash;
