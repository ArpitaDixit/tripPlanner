var express = require("express");
var Uber = require('node-uber');
var path = require("path");
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var uber = new Uber({
<<<<<<< HEAD
    client_id: 'lGMT26zFN4YbgRPNSWR17uzAmWAo6IoT',
    client_secret: 'nTekbYYzAgC2KhZc7q4e9aPWVO5kwIXig_Bq8jZN',
    server_token: 'jvHZM2BCWNP4IcpRX2crSOoX8HpXb9vbCqCV9IMf',
    redirect_uri: 'http://localhost:5000/api/callback',
    name: 'ProjectTestApp',
    language: 'en_US', // optional, defaults to en_US
    sandbox: true // optional, defaults to false
=======
    client_id: 'dLLuaHaTUPqusPd5oDsk4dNxXLAq7P9y',
    client_secret: 'RLFm-on4Eyg7QKtQ1ne3pIEpLVi4FCqrCSAwzNDe',
    server_token: 'DvXtkPFZjeub-qIDGqE477hh_PvzC7veCDWwoiza',
    redirect_uri: 'http://localhost:5000/api/callback',
    name: 'myapp3094',
    language: 'en_US', // optional, defaults to en_US
    sandbox: true      // optional, defaults to false
>>>>>>> edb8a28bfa7a9f0ead489cda0c44c41f4b50d462
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

app.post("/results.html", function (req, res) {
    // uber.estimates.getPriceForRoute(37.338208, -121.886329, 37.3352, -121.8811, function (err, response) {
    //     console.log(response);
    // });
    console.log(req.body);
<<<<<<< HEAD
=======
    var addr=req.body;
    geocodeAddress(addr);
>>>>>>> edb8a28bfa7a9f0ead489cda0c44c41f4b50d462
    res.sendFile(path.join(__dirname+"/views/results.html"));
});

app.get('/', function(request, response) {
    var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places', 'all_trips']);
    response.redirect(url);
});

app.listen(5000, function () {
    console.log("Path Finder started at port 5000");
<<<<<<< HEAD
});
=======
});

function geocodeAddress(addr) {    
        var geocoder = new google.maps.Geocoder();    
        geocoder.geocode({'address': addr[0]}, function(results, status) {
          if (status === 'OK') {
            lat=results[0].geometry.location.lat();
            lon=results[0].geometry.location.lon();
            console.log(lat,lon);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });

    }
>>>>>>> edb8a28bfa7a9f0ead489cda0c44c41f4b50d462
