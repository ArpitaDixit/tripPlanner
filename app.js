var express = require("express");
var Uber = require('node-uber');
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname,'public')));


var uber = new Uber({
    client_id: 'lGMT26zFN4YbgRPNSWR17uzAmWAo6IoT',
    client_secret: 'nTekbYYzAgC2KhZc7q4e9aPWVO5kwIXig_Bq8jZN',
    server_token: 'jvHZM2BCWNP4IcpRX2crSOoX8HpXb9vbCqCV9IMf',
    redirect_uri: 'http://localhost:5000/api/callback',
    name: 'ProjectTestApp',
    language: 'en_US', // optional, defaults to en_US
    sandbox: true // optional, defaults to false
});

app.get('/api/callback', function(request, response) {
    uber.authorization({
        authorization_code: request.query.code
    }, function(err, access_token, refresh_token) {
        if (err) {
            console.error(err);
        } else {
            // store the user id and associated access token
            // redirect the user back to your actual app
            response.redirect('/success');
        }
    });
});

app.get("/success", function (req, res) {

    res.sendFile(path.join(__dirname+"/views/index.html"));
});

app.get("/results", function (req, res) {
    uber.estimates.getPriceForRoute(37.338208, -121.886329, 37.3352, -121.8811, function (err, response) {
        console.log(response);
    });

    res.sendFile(path.join(__dirname+"/views/results.html"));
});

app.get('/', function(request, response) {
    var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places', 'all_trips']);
    response.redirect(url);
});

/*app.get("/", function (req, res) {
    res.send("Hello World");
});*/

app.listen(5000, function () {
    console.log("Path Finder started at port 5000");
});