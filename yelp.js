/* arpitadixit */
var express = require("express");
var Yelp = require('yelp');

var app = express();

var yelp = new Yelp({
  consumer_key: '0kLAgrjGHhJEhl4WNazxLQ',
  consumer_secret: 'RUxyB7e1vUygFyaLKPgfidRfvEY',
  token: 'rzS1E3UCZepDWQ2mrOhU9E4aatH6gNAK',
  token_secret: 'vLu25QlShoPM9FaxwmAWXxx3M5Y',
});

app.get('/', function(request, response) {
    yelp.search({  ll: '37.77493,-122.419415', limit: '1'})
    
    });
