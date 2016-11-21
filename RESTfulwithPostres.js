//Express is required for creating Node.js based web apps
var express = require('express');

//pg is used for interacting with PostgreSQL
var pg = require("pg")

var http = require("http")

//body-parser is used to parse the Request body and populate the req.
var bodyParser = require('body-parser');


var app = express();

app.set('port',3300);

app.use(bodyParser.json());

var conString = "pg://postgres:admin@localhost:5432/Book";
var client = new pg.Client(conString);
client.connect();
//client.query("DROP TABLE IF EXISTS book1"); //IF not EXISTS 
client.query("CREATE TABLE IF not EXISTS book1(name varchar(64),isbn varchar(64),author varchar(64),pages varchar(64))");
console.log("Connected to DB!");

//Starting up the server on the port: 3300
app.listen(app.get('port'), function(){
  console.log('Server up: http://localhost:' + app.get('port'));
});

//Add a new book
app.post("/book", function(req, res){
  console.log("Adding new Book: " + req.body.name);
var query=client.query("INSERT INTO book1 (name,isbn,author,pages) values ('"+req.body.name+"','"+req.body.isbn+"','"+req.body.author+"','"+req.body.pages+"')");

});

app.delete("/book/:isbn",function(req,res){

      var query=client.query("delete from book1 where isbn='"+req.params.isbn+"'");
});