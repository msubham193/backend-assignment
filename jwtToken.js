const redis = require("redis");

const client = redis.createClient();

(async () => {
  await client.connect();
})();

client.on('ready', () => {
  console.log("Connected!");
});

exports.sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();


   client.setEx(user.id,3600,token);


  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};
