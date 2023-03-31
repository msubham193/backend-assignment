const express = require("express");
const dotenv = require("dotenv");
const user = require("./routes/userRoute");
const { dbConnect } = require("./config/dbConnection");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", user);

const PORT = process.env.PORT || 8080;
const connectServer = () => {
  dbConnect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log("connected to server on port " + process.env.PORT);
  });
};

connectServer();
