var mysql = require('mysql');
var http = require('http')
var url = require('url')
var express = require('express');
var app = express();



// ===================== mySQL connection =======================================

var connection = mysql.createConnection({
  host     : 'mysql4.gear.host',
  port     : '3306',
  user     : 'l3us3r1',
  password : 'root**',
  database : 'lifeexpectancy',
});


connection.connect();



// ===================== allow access from index.html ===============

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});



// ===================== Listen for response from index.html ===============

app.set('port', (process.env.PORT || 5000));



app.get('/', function(request, response) {

    //parse data
    var urlData = url.parse(request.url,true).query;

    //parse some more
    var race = urlData.race
    var gender = urlData.gender
    var year = urlData.year


    //get data SQL data
    connection.query("SELECT LifeExpectancy FROM lifeTable WHERE race=? AND sex=? AND year=?", [race, gender, year], function(err, rows, fields) {

        //send it to index.html
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.write(JSON.stringify(rows[rows.length - 1].LifeExpectancy));
        response.end();

    })


}); //app.get



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
