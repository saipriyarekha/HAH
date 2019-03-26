let mongoose = require('mongoose');

let artSchema = mongoose.Schema({
    title:{
        type:string,
        required: true
    },
    author:{
        type: string,
        required: true
    },
    body:{
        type: string,
        required: true
    }
});

let arti = module.exports = mongoose.model('art',artSchema);
