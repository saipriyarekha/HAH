var express = require('express');
var ejs = require('ejs');
var app = express();

app.use(express.static(__dirname+'/public'));
app.set('views',__dirname+'/views');
app.set('view engine','ejs')
app.get('/',(req,res)=>{
  res.render('index.ejs')
})
app.listen(5000,()=>{
  console.log('server started at 5000')
})
