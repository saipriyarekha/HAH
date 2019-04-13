var express = require('express');
var router = express.Router();

//bring in trainer module
var Trainer = require('../models/trainer_module');

router.get('/tdashboard', (req, res) => res.render('tdashboard'));

//trainer datails
router.post('/tdashboard', (req, res) => {
    var { department, topicname, description, fileUploaded } = req.body;
    let errors = [];

    //check required fields
    if(!department || !topicname ||!description || !fileUploaded) {
        errors.push({ msg: 'please fill all the fields' });
    }
    
    if(errors.length > 0) {
        res.render('tdashboard', {
            errors,
            department,  
            topicname,
            description,
            fileUploaded
        });
    }else{
        const newTrainer = new Trainer({
            department,
            topicname, 
            description,
            fileUploaded
        });
             
        //save board
        newTrainer.save()
        .then(user => {
          // req.flash('k');
            //res.redirect('/dashboard');
            res.send('hy');
        })
        .catch(err => console.log(err));
        //console.log("fail"); 
    
    }
    
});

module.exports = router;