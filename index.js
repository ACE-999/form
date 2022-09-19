var express = require("express");
var ejs = require("ejs");
var path = require("path");
// var mysql=require("mysql");
// var mysql2=require("mysql2");
var cors=require('cors');
var dotenv=require('dotenv');

var app=express();
app.use(cors());

app.engine("ejs", require("ejs").__express);
app.set("view engine", "ejs");

var route=require("./routes/routes")

app.use("/", route);
app.listen(3000);