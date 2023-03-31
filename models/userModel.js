const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name !"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email"],
  },
  mobile:{
    type:String,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characers"],
  },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
   this.password = await bcrypt.hash(this.password, 10);

  });


  userSchema.methods.comparePassword = async function (password) {
    console.log(password);
    return await bcrypt.compare(password, this.password);
  };
  

  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };


module.exports = mongoose.model("User", userSchema);
