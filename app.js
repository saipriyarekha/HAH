var express = require('express');
var ejs = require('ejs');
var expressLayouts = require('express-layout')
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
//var ensureLoggedIn = require('ensureLoggedIn');
//passport config
require('./config/passport')(passport);
//const bcrypt = require('bcryptjs');

// let User = require('./models/user');
//var expressValidator = require('expressValidator');
//var flash = require('connect-flash');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/HAH', {useNewUrlParser: true});
let db=mongoose.connection;

//check connection
db.once('open',function() {
  console.log('connected to mongodb');
});
//check for db errors
db.on('error',function(err){
  console.log(err);

});
//init app
var app = express();

//app.use(expressLayouts);
app.use(express.static(__dirname+'/public'));
app.set('views',__dirname+'/views');
app.set('view engine','ejs')

//express session middleware
app.use(session({
  secret: 'priya vidya',
  resave: true,
  saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//express messages middleware
app.use(require('connect-flash')());
app.use(function ( req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});
//connect flash
app.use(flash());

//global vars
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return{
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));


//body parser middleware
//parse applicAtion/x-www-forum-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
//parse application /json
app.use(bodyParser.json())

//home route
app.get('/',(req,res)=>{
  res.render('index.ejs')
});
app.use('/trail', require('./routes/trail'));
//app.use('/lr', require('./routes/lr'));
app.use('/users', require('./routes/users'));
app.use('/faculties', require('./routes/faculties'));
app.use('/admins', require('./routes/admins'));
app.use('/boards', require('./routes/boards'));
app.use('/contacts', require('./routes/contacts'));
app.use('/dashs', require('./routes/dashs'));
app.use('/trainers', require('./routes/trainers'));

app.get('/404', function (req, res) {
  res.render('404.ejs');
});
app.get('/login', function (req, res) {
  res.render('login.ejs');
  //log("", getIp(req), req.method, req.route.path);
});
app.get('/facultylogin', function (req, res) {
  res.render('facultylogin.ejs');
});
app.get('/adminlogin', function (req, res) {
  res.render('adminlogin.ejs');
});
/*app.get('/student', function (req, res) {
  res.render('student.ejs');
//  res.sendFile("student.ejs")
  //log("", getIp(req), req.method, req.route.path);
});*/

/*app.get('/faculty', function (req, res) {
  res.render('faculty.ejs');
});*/
app.get('/admin', function (req, res) {
  res.render('admin.ejs');
});
app.get('/index', function (req, res) {
  res.render('index.ejs');
});
app.get('/mainlogin', function (req, res) {
  res.render('mainlogin.ejs');
});
/*app.get('/dashboard', function (req, res) {
    res.render('dashboard.ejs');  
});*/
app.get('/board', function (req, res) {
  res.render('board.ejs');  
});
app.get('/contact', function (req, res) {
  res.render('contact.ejs');  
});
app.get('/adashboard', function (req, res) {
  res.render('adashboard.ejs');
});
/*app.post('/student', function (req, res) {
  res.render('student.ejs');
//  res.sendFile("student.ejs")
  //log("", getIp(req), req.method, req.route.path);
});*/


//app.post('/login',function(req, res){
  //var username = req.body.username;
  //var htmlData='hello'+username;
    //var email = req.body.email;
    //var password = req.body.password;
    //var cpassword = req.body.cpassword;
    //res.render('login.ejs');
    //console.log(htmlData); 
//});
app.post('/update',  function(req, res) {
  user.update({_id: req.session.passport.user}, {
      displayName: req.body.username 
  }, function(err, numberAffected, rawResponse) {
     console.log('new profile update error');
  });
  res.render('/users/dashboard.ejs', {
      user : req.user // get the user out of session and pass to template
  });
});


app.get('/fdashboard', (req, res) => 
res.render('fdashboard'));
//login handle
app.post('/login', (req, res, next) =>{
  passport.authenticate('student', {
      
      successRedirect: '/users/dashboard',
      failureRedirect: '/login',
      failureFlash: true
  })(req, res, next);
});
//login handle
app.post('/facultylogin', (req, res, next) =>{
  passport.authenticate('faculty', {
      successRedirect: '/trainers/fdashboard',
      failureRedirect: '/facultylogin',
      failureFlash: true
  })(req, res, next);
});
app.post('/adminlogin', (req, res, next) =>{
  passport.authenticate('admin', {
      successRedirect: '/adashboard',
      failureRedirect: '/adminlogin',
      failureFlash: true
  })(req, res, next);
});
app.listen(5000,()=>{
  console.log('server started at 5000')
})
