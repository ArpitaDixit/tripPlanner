/**
 * Created by shauryamittal on 12/2/16.
 */


var getUberPrice = function (coordinates, places) {
    uber.estimates.getPriceForRoute(coordinates[0].latitude, coordinates[0].longitude, coordinates[1].latitude, coordinates[1].longitude, function (err, response) {
        console.log(response);
    });
}

module.exports.getUberPrice = getUberPrice;