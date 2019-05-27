var createError = require('http-errors');
var express = require('express');
var fs = require("fs");
const port = 8080

var app = express();

let users = JSON.parse(fs.readFileSync('users.json', "utf8"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/users', getUsers);
app.post('/users', saveUser);
app.get('/', getUsers);

function getUsers(req, res){
  res.send(users);
}

function saveUser(req, res){
  users.push(req.body)
  fs.writeFileSync("users.json", JSON.stringify(users));
  res.send("Update Successful");
  
}
app.listen(port, () => console.log(`NAGP-quotes app listening on port ${port}!`))
