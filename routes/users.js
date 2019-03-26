var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
//user model
var User = require('../models/User');
router.get('/student', (req, res) => {
res.render('student');
//res.render('registrationstyle');
});
//router.get('/login', (req, res) => res.render('login'));

//student handle
router.post('/student', (req, res) => {
    var { username, email, password, cpassword, department } = req.body;
    let errors = [];

    //check required fields
    if(!username || !email || !password || !cpassword || !department ) {
        errors.push({ msg: 'Please fill all the fields' });
    }

    //check passwords match
    if(password !== cpassword) {
        errors.push({msg: 'Passwords do not match'});
    }
    

    if(password.length < 6) {
        errors.push({ msg: 'Password length should be greater than 6 characters'});
    }
    

    if(errors.length > 0) {
        res.render('student', {
            errors,
            username,
            email,
            password,
            cpassword,
            department
        });
    }else{
        //res.send('pass');

        //validation passed
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                //user exists
                errors.push({ msg: 'Email is already registered!'});
                res.render('student', {
                    errors,
                    username,
                    email,
                    password,
                    cpassword,
                    department
                });
            }else {
                const newUser = new User({
                    username,
                    email,
                    password,
                    cpassword,
                    department
                });
                //hash password
                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    //set password to hash
                    newUser.password = hash;
                    //save user
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'You have registered successfully and can log in ');
                        res.redirect('/login');
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