var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
//var bodyParser = require('body-parser');
//var { ensureAuthenticated } = require('../config/auth');
//faculty module
var Faculty = require('../models/facultym');
//faculty
router.get('/faculty', (req, res) => res.render('faculty'));


//routerhandle
router.post('/faculty', (req, res) => {
    var { name, email, comp, password, cpassword } = req.body;
    let errors = [];

    //check required fields
    if(!name || !email || !comp || !password || !cpassword ) {
        errors.push({ msg: 'please fill all the fields' });
    }

    //check passwords match
    if(password !== cpassword) {
        errors.push({msg: 'passwords do not match'});
    }

    //check password length
    if(password.length < 6) {
        errors.push({ msg: 'password should have more than 6 characters'});
    }
    if(errors.length > 0) {
        res.render('faculty', {
            errors, 
            name,
            email,
            comp,
            password,
            cpassword
        });
    }else {
        //validation passed
        Faculty.findOne({ email: email })
        .then(user => {
            if(user) {
                //user exists
                errors.push({ msg: 'email is already registered'});
                res.render('faculty', {
                    errors,
                    name,
                    email,
                    comp,
                    password,
                    cpassword
                });
            } else {
                const newFaculty = new Faculty({
                    name,
                    email,
                    comp,
                    password,
                    cpassword
                });
                //hash password
                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newFaculty.password, salt, (err, hash) => {
                    if(err) throw err;
                    //set password to hash
                    newFaculty.password = hash;
                    //save faculty
                    newFaculty.save()
                    .then(user => {
                       req.flash('success_msg', 'you have registered successfully and can log in ');
                        res.redirect('/facultylogin');
                       // res.send('hy');
                    })
                    .catch(err => console.log(err));
                    //console.log("fail");
                }))
            }
        });
    }
});


module.exports = router;