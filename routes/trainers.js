var express = require('express');
var router = express.Router();

var Trainer = require('../models/trainerm');
router.get('/fdashboard', (req, res) => res.render('fdashboard'));

router.post('/fdashboard', (req, res) => {
    var { department, tname, description, fileUploaded } = req.body;
    let errors = [];

    console.log(department+"  "+tname+" "+description)

    //check required fields
    if(!department || !tname || !description || !fileUploaded ) {
        errors.push({ msg: 'Please fill all the fields' });
    }


    if(errors.length > 0) {
        res.render('fdashboard', {
            errors,
            department, 
            tname,
            description,
            fileUploaded
        });
    }else{
        const newTrainer = new Trainer({
            department, 
            tname, 
            description,
            fileUploaded
        });
           
        //save board
        newTrainer.save()
        .then(Trainer => {
           //req.flash('k');
           // res.redirect('/contacts/contact');
           res.send('hy');
        })
        .catch(err => console.log("fail"));
        //console.log("fail");
    }
});

module.exports = router;
