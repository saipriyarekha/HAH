var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

//user model
var User = require('../models/User');
router.get('/dashboard', (req, res) => 
res.render('dashboard', {
    name: req.user.username,
    email: req.user.email,
    dep: req.user.department,
    roll: req.user.rollno,
    yop: req.user.yop,
    dob: req.user.dob,
    phno: req.user.phno,
    gender: req.user.gender,
    fname: req.user.fname,
    fphno: req.user.fphno,
    mname: req.user.mname,
    mphno: req.user.mphno
}));
//var Board = require('../models/boardm');
router.get('/student', (req, res) => res.render('student'));


//student handle
router.post('/student', (req, res) => {
    var { username, email, password, cpassword, department, rollno, yop, dob, phno, gender, fname, fphno, mname, mphno } = req.body;
    let errors = [];

    //check required fields
    if(!username || !email || !password || !cpassword || !department || !rollno || !yop || !dob || !phno || !gender || !fname || !fphno || !mname || !mphno ) {
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
            department,
            rollno,
            yop,
            dob, 
            phno, 
            gender,
            fname, 
            fphno, 
            mname, 
            mphno
        });
    }else{
        //res.send('pass');

        //validation passed
        User.findOne({ rollno: rollno })
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
                    department,
                    rollno,
                    yop,
                    dob, 
                    phno, 
                    gender, 
                    fname, 
                    fphno, 
                    mname, 
                    mphno
                });
            }else {
                const newUser = new User({
                    username,
                    email,
                    password,
                    cpassword,
                    department,
                    rollno,
                    yop,
                    dob, 
                    phno, 
                    gender, 
                    fname, 
                    fphno, 
                    mname, 
                    mphno
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