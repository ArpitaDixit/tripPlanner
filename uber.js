/**
 * Created by shauryamittal on 12/2/16.
 */
var Uber = require('node-uber');
var uberPrices=[];
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
function getUberPrice(coordSrc,coordDest) {
    uber.estimates.getPriceForRoute(coordSrc.latitude, coordSrc.longitude, coordDest.latitude, coordDest.longitude, function (err, response) {
        data=filterJSON(response);
        console.log(data);
    });
console.log("done");
}


function filterJSON(response){
	var i=0;
	var data=[];	
	for (i;i<response.prices.length;i++){
	data[i] = {
		rideType:response.prices[i].localized_display_name,
		distance: response.prices[i].distance,
		highEstimate: response.prices[i].high_estimate,
		lowEstimate: response.prices[i].low_estimate,
		duration:response.prices[i].duration,
	};
	
}
return data;
}
module.exports.getUberPrice = getUberPrice;