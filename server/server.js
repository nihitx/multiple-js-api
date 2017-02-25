const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var requestify = require('requestify');
var request = require('request');
var helmet = require('helmet');
var https = require('https');

var app = express();
app.use(helmet())
// app.use(cors({
//     origin: ['http://localhost:3000'],
//     credentials: true
// }));

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(publicPath));


// app.get('/getIOT', function (req, res , err) {
//   request({
//             url: 'https://iot-backend-metropolia.herokuapp.com/api/user',
//             method: 'GET'
//         }, function (error, request, body) {
//             return JSON.parse(body);
//
//         })
// });


app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
