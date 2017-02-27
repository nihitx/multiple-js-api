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
app.use(helmet());

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

app.get('/getpaymentplan', function (req, res , err) {
    var amount = req.query.amount;
    request({
      'auth': {
          'user': 'masnad',
          'pass': 'whatstodaysrate',
          'sendImmediately': true
      },
      url: `https://aurorax-rl-staging.herokuapp.com/index.php/auroraxapi/getAuroraRate?Amount=${amount}`,
      method: 'GET',
    }, function (error, request, body) {
      console.log(body);
      return res.end(body);
      })
});

app.get('/getstarted', function (req, res , err) {
    var email = req.query.email;
    var password = req.query.password;
    var amount = req.query.amount;
    var bodyInfo = {
      "email" : email,
      "password" : password,
      "Borrowamount" : amount
    };
    console.log(bodyInfo);
    request({
      'auth': {
          'user': 'masnad',
          'pass': 'registertoaurorax',
          'sendImmediately': true
      },
      url: `https://aurorax-rl-staging.herokuapp.com/index.php/auroraxapi/auroraxregister`,
      method: 'POST',
      body : JSON.stringify(bodyInfo),
    }, function (error, request, body) {
      if(error){
        return console.log(error);
      }
      console.log(body);
      return res.end(body);
      })
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
