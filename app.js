var express = require('express');
var ejs = require('ejs');
var app = express();

app.use(express.static(__dirname+'/public'));
app.set('views',__dirname+'/views');
app.set('view engine','ejs')
app.get('/',(req,res)=>{
  res.render('index.ejs')
})
app.get('/login', function (req, res) {
  res.render('login.ejs');
  //log("", getIp(req), req.method, req.route.path);
});
app.get('/student', function (req, res) {
  res.render('student.ejs');
});
app.get('/faculty', function (req, res) {
  res.render('faculty.ejs');
});
app.get('/admin', function (req, res) {
  res.render('admin.ejs');
});
app.get('/index', function (req, res) {
  res.render('index.ejs');
});
app.get('/mainlogin', function (req, res) {
  res.render('mainlogin.ejs');
});
app.listen(5000,()=>{
  console.log('server started at 5000')
})
app.get('/login', function (req, res) {
  res.render('pages/login.ejs');
  //log("", getIp(req), req.method, req.route.path);
});
