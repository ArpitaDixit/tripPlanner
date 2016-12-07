/**
 * Created by shauryamittal on 12/2/16.
 */
/* dependencies */
var request = require('request');

/* global configuration */
var config = require('../../../config/config');

var response;

exports.getRideTypes = function (req, res, next) {
    requestWithBearerToken(res, {
        method: 'GET',
        uri: config.LYFT_API_URI + '/v1/ridetypes',
        json: true,
        qs: {lat: req.query.lat, lng: req.query.lng}
    });
}

exports.requestWithBearerToken = function (res, options, callback) {
    /* begin: pre-auth request */
    request({
        method: 'POST',
        uri: config.LYFT_API_URI + '/oauth/token',
        auth: {
            username: config.LYFT_CLIENT_ID,
            password: (config.USE_SANDBOX ? 'SANDBOX-' : '') + config.LYFT_CLIENT_SECRET
        },
        json: {
            grant_type: 'client_credentials',
            scope: 'offline public profile rides.read rides.request'
        }
    }, function (preAuthError, preAuthResponse, preAuthBody) {
        if (preAuthError) {
            res
                .status(preAuthResponse.statusCode)
                .json({meta: {success: false, error: preAuthError}});
        } else {
            /* begin: post-auth request */
            options = options || {};
            options.auth = options.auth || {bearer: preAuthBody.access_token};
            callback = callback || function (postAuthError, postAuthResponse, postAuthBody) {
                    if (postAuthError) {
                        res
                            .status(postAuthResponse.statusCode)
                            .json({meta: {success: false, error: postAuthError}});
                    } else {
                        postAuthBody = postAuthBody || {};
                        postAuthBody.meta = {success: true};
                        console.log(postAuthBody);
                        res
                            .status(postAuthResponse.statusCode)
                            .json(postAuthBody);


                    }
                };
            request(options, callback);
            /* end: post-auth request */
        }
    });
    /* end: pre-auth request */
};