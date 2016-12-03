var express = require("express");
var Uber = require('node-uber');
var path = require("path");
var bodyParser = require('body-parser');
var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder(options);
const EventEmitter = require('events');
var UberModule = require("./uber");
var weather=require("./weather");

var coordinates = [];
var placesLength;
var count = 0;
var uberCount = 0;
var uberPrices=[];

const myEmitter = new EventEmitter();
const uberEmitter = new EventEmitter();

var options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var uber = new Uber({

/*
>>>>>>> origin/master
    client_id: 'lGMT26zFN4YbgRPNSWR17uzAmWAo6IoT',
    client_secret: 'nTekbYYzAgC2KhZc7q4e9aPWVO5kwIXig_Bq8jZN',
    server_token: 'jvHZM2BCWNP4IcpRX2crSOoX8HpXb9vbCqCV9IMf',
    redirect_uri: 'http://localhost:5000/api/callback',
    name: 'ProjectTestApp',
    language: 'en_US', // optional, defaults to en_US
    sandbox: true // optional, defaults to false
<<<<<<< HEAD

=======
*/
    client_id: 'dLLuaHaTUPqusPd5oDsk4dNxXLAq7P9y',
    client_secret: 'RLFm-on4Eyg7QKtQ1ne3pIEpLVi4FCqrCSAwzNDe',
    server_token: 'DvXtkPFZjeub-qIDGqE477hh_PvzC7veCDWwoiza',
    redirect_uri: 'http://localhost:5000/api/callback',
    name: 'myapp3094',
    language: 'en_US', // optional, defaults to en_US
    sandbox: true      // optional, defaults to false

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
    var places = req.body.places;
    placesLength = places.length;
    console.log(places);

    for (i = 0; i < places.length; i++) {
        console.log("places");

        var place = places[i];
        geocoder.geocode(place, function(err, res) {
            var coordinate={latitude:res[0]["latitude"],longitude:res[0]["longitude"]};
            coordinates.push(coordinate);
            count++;
            myEmitter.emit('coordinatesCaught', coordinates, count);
        });
    }

    myEmitter.on('coordinatesCaught', function(coordinates, count) {
        if(placesLength == count){
            console.log(coordinates, places);
            //Write function calls here
            //---------
            //getting uber price
            var price;
            var i=0;
            for (i = 1; i <= coordinates.length-1; i++) {
                var src = coordinates[i-1];
                console.log("src");                
                console.log(src);                
                var dest = coordinates[i];   
                console.log("des");                
                console.log(dest);
                price=UberModule.getUberPrice(src,dest);         
                uberPrices.push(price);
                uberCount++;
                uberEmitter.emit('gotPrice', uberPrices, uberCount);        
            }
            
            uberEmitter.on('gotPrice', function(uberPrices, uberCount) {
            if(coordinates.length == uberCount){
            console.log("123");
            console.log(uberPrices, places);
            }
            });
            //getting weather for all places
            for (i = 0; i < places.length; i++) {
                var place = places[i];
                weather.getWeather(place);
            }

           /* uber.estimates.getPriceForRoute(coordinates[0].latitude, coordinates[0].longitude, coordinates[1].latitude, coordinates[1].longitude, function (err, response) {
                console.log(response);
            });*/
        }
    });
    console.log(req.body);
    res.sendFile(path.join(__dirname+"/views/results.html"));
});

app.get('/', function(request, response) {
    var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places', 'all_trips']);
    response.redirect(url);
});

app.listen(5000, function () {
    console.log("Path Finder started at port 5000");


});


