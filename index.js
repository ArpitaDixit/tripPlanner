var express=require('express');
var app=express();
var port=8080;
var expressLayouts=require('express-ejs-layouts');
app.set('view engine','ejs');
app.use(expressLayouts);
var router=require('./app/routes');
app.use('/',router);
app.use(express.static(__dirname+'/public'))
app.listen(port,function(){
	console.log("App started");
})
