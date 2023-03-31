const { sendToken } = require("../jwtToken");
const User = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !password) {
    res.status(500).json({ message: "Please enter the credentials !" });
  }

  const user = await User.create({
    name,
    email,
    mobile,
    password,
  });

  res.status(200).json({ message: "User created successfully", user });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(500).json({ message: "please enter the credentials" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(500).json({ message: "User not found" });
    return;
  }


  const isPasswordMatched = await user.comparePassword(password);

  console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    res.status(500).json({ message: "password does not match !" });
  }

  sendToken(user, 200, res);
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(500).json({
      message: "user not found !",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
};

exports.updateUser = async (req, res, next) => {
  // console.log(req.user);
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

exports.deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(500).json({
      message: "user not found !",
    });
  }

  res.status(200).json({
    message: "User deleted successfully !",
  });
};
