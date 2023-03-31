// const redis = require("redis");
const { setRefreshTokenInRedis } = require("./config/redisConnection");

// const client = redis.createClient();

// (async () => {
//   await client.connect();
// })();

// client.on('ready', () => {
//   console.log("Connected!");
// });

exports.sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  
  setRefreshTokenInRedis(user.id,3600,token);

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};
