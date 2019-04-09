var express = require('express');
var router = express.Router();

var FDashBoard = require('../models/trainerm');
router.get('/fdashboard', (req, res) => res.render('fdashboard'));

router.post('/fdashboard', (req, res) => {
    var { department, tname, description, fileUploaded } = req.body;
    let errors = [];

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
        const newFDashBoard = new FDashBoard({
            department, 
            tname, 
            description,
            fileUploaded
        });
           
        //save board
        newFDashBoard.save()
        .then(FDashBoard => {
           req.flash('k');
           // res.redirect('/contacts/contact');
           res.send('hy');
        })
        .catch(err => console.log(err));
        //console.log("fail");
    }
});

module.exports = router;
