const Redis = require("ioredis");

const redis = new Redis({
    port: 11985, // Redis port
    host: "redis-11985.c295.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "AwinQtdRpLiCTVeC3tuWoKyLQRb385rT",
    db: 0, // Defaults to 0
  });

module.exports = redis