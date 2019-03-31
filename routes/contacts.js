var express = require('express');
var router = express.Router();

//board model
var Contact = require('../models/contactm');
router.get('/contact', (req, res) => {
    res.render('contact');
});
router.post('/contact', (req, res) => {
    var { fname, mname, cno, pcno, email } = req.body;
    let errors = [];

    //check required fields
    if(!fname || !mname || !cno || !pcno || !email) {
        errors.push({ msg: 'Please fill all the fields' });
    }


    if(errors.length > 0) {
        res.render('contact', {
            errors,
            fname, 
            mname, 
            cno, 
            pcno, 
            email
        });
    }else{
        const newContact = new Contact({
            fname, 
            mname, 
            cno, 
            pcno, 
            email
        });
           
        //save board
        newContact.save()
        .then(Contact => {
           req.flash('k');
            res.redirect('/dashboard');
           // res.send('hy');
        })
        .catch(err => console.log(err));
        //console.log("fail"); 
    }
});

module.exports = router;