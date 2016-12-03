/**
 * Created by shauryamittal on 12/2/16.
 */
var Lyft = require('node-lyft');
lyft = new Lyft();
var express = require("express");
var app = express();

var config = require('./config/config');

var apiLyftController   = require('./controllers/api/lyft');

app.get('/api/lyft/ridetypes', apiLyftController.getRideTypes);



app.listen(4000, function () {
    console.log("Path Finder started at port 4000");

});