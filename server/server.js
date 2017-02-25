const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var requestify = require('requestify');
var request = require('request')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

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
