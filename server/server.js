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


app.get('/getIOT', function (req, res , err) {
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



app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
