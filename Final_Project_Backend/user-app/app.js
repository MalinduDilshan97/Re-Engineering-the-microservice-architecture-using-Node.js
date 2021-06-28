var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dbConnection = require("./src/config/database/mongoose");
const errorHandle = require("./src/middleware/errorHandler");
const passport = require("passport");
// const connectEureka = require('./src/middleware/EurekaConnect');
// const {discoveryServer} = require('./src/middleware/DiscoveryServer')
var { connectEureka, serviceDiscovery} = require("discovery-client-eureka");

var indexRouter = require("./src/routes/index");

var app = express();
// db connectivity
dbConnection();

require("./src/config/passport/passport")(passport);
app.use(passport.initialize());

app.use(logger("dev"));
app.use(express.json());

// request payload middleware
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

app.get('*', function(req, res){
  res.status(404).json({}); // <== YOUR JSON DATA HERE
});

connectEureka({
  SSL: false,
  EUREKA_HOST: 'localhost:8761',
  PORT: process.env.PORT ? process.env.PORT : 3002,
  APP_NAME: 'USERSERVICE',
});

serviceDiscovery({
  SSL: false,
  EUREKA_HOST: 'localhost:8761'
});
// error handling middleware
app.use(errorHandle);

module.exports = app;
