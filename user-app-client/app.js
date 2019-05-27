var express = require('express');
var path = require('path');
var fs = require("fs");

var dotenv = require('dotenv')
const port = 8080
const request = require('request');
var app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname + '/public')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/users', getUsers);
app.post('/users', saveUser);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})
const url = process.env.URL || 'http://10.55.251.232';

async function getUsers(req, res) {
  var res1 = await getUserHelper(req, res)
  res.send(res1);
}

function getUserHelper() {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      resolve(body);
    });
  })
}

async function saveUser(req, res) {
  var d = await saveUserHelper(req.body)
  res.send(d);
}

function saveUserHelper(data) {
  return new Promise((resolve, reject) => {
    request.post({
        url: url + '/users',
        form: {
          ...data
        }
      },
      function (err, httpResponse, body) {
        resolve(body)
      })
  })

}
app.listen(port, () => console.log(`NAGP-quotes app listening on port ${port}!`))