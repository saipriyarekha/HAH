var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

//admin module
var Admin = require('../models/adminm');

//admin page
router.get('/admin', (req, res) => res.render('admin'));
//routerhandle
router.post('/admin', (req, res) => {
    var { name, email, password, cpassword, department, designation } = req.body;
    let errors = [];

    //check required fields
    if(!name || !email || !password || !cpassword || !department || !designation ) {
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
            department,
            designation
        });
    }else {
        //validation passed
        Admin.findOne({ email: email })
        .then(adminm => {
            if(adminm) {
                //user exists
                errors.push({ msg: 'email is already registered'});
                res.render('admin', {
                    errors,
                    name,
                    email,
                    password,
                    cpassword,
                    department,
                    designation
                });
            } else {
                const newAdmin = new Admin({
                    name,
                    email,
                    password,
                    cpassword,
                    department,
                    designation
                });
                //hash password
                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if(err) throw err;
                    //set password to hash
                    newAdmin.password = hash;
                    //save admin
                    newAdmin.save()
                    .then(Admin => {
                       req.flash('success_msg', 'you have registered successfully and can log in ');
                        res.redirect('/adminlogin');
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