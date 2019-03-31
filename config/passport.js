var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//load user model
var User = require('../models/User');
var Faculty = require('../models/facultym');
var Admin = require('../models/adminm');

module.exports = function(passport) {
    passport.use('student',
        new LocalStrategy({ usernameField: 'rollno' }, (rollno, password, done) => {
            //match user
            User.findOne({ rollno: rollno })
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: 'Your email is not registered!'});
                    }

                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        }else {
                            return done(null, false, { message: 'Password incorrect!'});
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    // passport.serializeUser((user, done) => {
    //     done(null, user.id);
    //   });
      
    //   passport.deserializeUser((id, done) => {
    //     User.findById(id, function(err, user) {
    //       done(err, user);
    //     });
    //   });

      passport.use('faculty',
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //match faculty
            Faculty.findOne({ email: email })
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: 'Your email is not registered!'});
                    }

                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        }else {
                            return done(null, false, { message: 'Password incorrect!'});
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    // passport.serializeUser((user, done) => {
    //     done(null, user.id);
    //   });
      
    //   passport.deserializeUser((id, done) => {
    //     User.findById(id, function(err, user) {
    //       done(err, user);
    //     });
    //   });

      passport.use('admin',
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //match faculty
            Admin.findOne({ email: email })
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: 'Your email is not registered!'});
                    }

                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        }else {
                            return done(null, false, { message: 'Password incorrect!'});
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
    }
   