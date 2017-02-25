const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

// use it before all route definitions
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(publicPath));


app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
