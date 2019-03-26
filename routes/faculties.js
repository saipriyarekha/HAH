var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
//faculty module
var Faculty = require('../models/facultym');
//faculty
router.get('/faculty', (req, res) => res.render('faculty'));
//router.get('/facultylogin', (req, res) => res.render('facultylogin'));
//routerhandle
router.post('/faculty', (req, res) => {
    var { name, email, password, cpassword, department } = req.body;
    let errors = [];

    //check required fields
    if(!name || !email || !password || !cpassword || !department ) {
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
            password,
            cpassword,
            department
        });
    }else {
        //validation passed
        Faculty.findOne({ email: email })
        .then(facultym => {
            if(facultym) {
                //user exists
                errors.push({ msg: 'email is already registered'});
                res.render('faculty', {
                    errors,
                    name,
                    email,
                    password,
                    cpassword,
                    department
                });
            } else {
                const newFaculty = new Faculty({
                    name,
                    email,
                    password,
                    cpassword,
                    department
                });
                //hash password
                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newFaculty.password, salt, (err, hash) => {
                    if(err) throw err;
                    //set password to hash
                    newFaculty.password = hash;
                    //save faculty
                    newFaculty.save()
                    .then(Faculty => {
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