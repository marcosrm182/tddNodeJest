var express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
const { posts } = require('./endpoints')
const { authenticate } = require('./middlewares')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const postsHandlers = posts({ axios })

app.post('/', authenticate, postsHandlers.post);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app