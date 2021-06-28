const { resolve } = require("bluebird");
const Redis = require("ioredis");
const redis = new Redis({
  port: 15813, // Redis port
  host: "redis-15813.c241.us-east-1-4.ec2.cloud.redislabs.com", // Redis host
  password: "60QHfF2v5fAM2ThrnuO31tLDnEhwR4eT",
});

module.exports = redis