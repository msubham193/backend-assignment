const redis = require("redis");

const client = redis.createClient();

(async () => {
  await client.connect();
})();

client.on("ready", () => {
  console.log("Connected!");
});

exports.setRefreshTokenInRedis = (key, time, value) => {
  client.setEx(key, time, value);
};

exports.getRefreshTokenFromRedis = (key) => {
  client.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      return setResponse(key, data);
    }

  });


};
