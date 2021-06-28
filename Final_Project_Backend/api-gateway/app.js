var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors')
const passport = require("passport");
// const connectEureka = require('./src/middleware/EurekaConnect');
// const {discoveryServer} = require('./src/middleware/DiscoveryServer')

var { connectEureka, serviceDiscovery} = require("discovery-client-eureka");

var indexRouter = require("./src/routes/index");

var app = express();

app.use(cors())
app.use(logger("dev"));
app.use(express.json());

// request payload middleware
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api-main", indexRouter);

connectEureka({
  SSL: false,
  EUREKA_HOST: 'localhost:8761',
  PORT: process.env.PORT ? process.env.PORT : 3000,
  APP_NAME: 'APIGATEWAY',
});

serviceDiscovery({
  SSL: false,
  EUREKA_HOST: 'localhost:8761'
});
// error handling middleware
// app.use(errorHandle);

module.exports = app;
