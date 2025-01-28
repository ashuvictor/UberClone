const { validationResult } = require("express-validator");
const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  console.log("The errors", errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  console.log("The body", req.body);
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(200).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  try {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("The login body:", req.body);

    const { email, password } = req.body;

    // Find user by email and include the password field
    const user = await userModel.findOne({ email }).select("+password");
    console.log("User found:", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid user or password" });
    }

    // Compare the input password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is not matching" });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Return token and user info
    res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    console.error("Error in loginUser:", err);
    next(err); // Pass the error to the Express error handler
  }
};


module.exports.getUserProfile = async (req,res,next)=>{

return res.status(200).json(req.user);
}