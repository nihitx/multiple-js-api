const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
