var express = require('express');
var app = express();
var address = process.argv[2];
 
var ejs = require('ejs');
app.engine('html', ejs.__express); 

var dataEngine = require('./public/javascripts/dbConnect');
dataEngine.setAddr(address);
dataEngine.collectData(address);
var dbData = dataEngine.getData();

// Test
// var barEngine = require('./public/javascripts/test/bar_test');
// var bar_test = barEngine.getData();

// Map data
var mapEngine = require('./public/javascripts/test/map_test');
// var mapEngine = require('./public/javascript/map_tmp');
// var heat_test = mapEngine.getData();
var map_test = mapEngine.getMap();

app.set('view engine', 'html');


app.get('/', function(req, res) {
	res.render('home',{title:"CCC Project"});
});

app.get('/barchart', function(req, res) {
	res.render('barchart',{title:"Bar chart", data:dbData});
});

app.get('/map/diversity', function(req, res) {
	res.render('di_map',{map:map_test,data:dbData});
});

app.get('/map/happiness', function(req, res) {
	res.render('ha_map',{map:map_test,data:dbData});
});

app.get('/scatterplot', function(req, res) {
	res.render('scatterplot',{data:dbData});
});

app.listen(3000);