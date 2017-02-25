const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

var cors = require('cors');

// use it before all route definitions
app.use(cors());


app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
