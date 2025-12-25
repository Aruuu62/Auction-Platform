const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    console.log("--- AUTH CHECK START ---");
    let token;
    
    // 1. Look for token
    if (req.cookies && req.cookies.token) {
      console.log(">> Token found in Cookie.");
      token = req.cookies.token;
    } else if (req.headers.authorization) {
      console.log(">> Token found in Headers.");
      token = req.headers.authorization.split(" ")[1];
    } else {
      console.log(">> NO TOKEN FOUND. Redirecting to Login.");
      // If browser request, send to login
      if (req.accepts('html')) return res.redirect('/login');
      return res.status(403).json({ message: "No token provided" });
    }

    // 2. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(">> Token Verified. User ID:", decoded.id);

    // 3. Find User
    req.user = await User.findByPk(decoded.id);
    
    if (!req.user) {
      console.log(">> User not found in Database. Redirecting.");
      res.clearCookie("token");
      return res.redirect('/login');
    }

    console.log(">> User Found:", req.user.email);
    console.log(">> User Role:", req.user.role);
    console.log("--- AUTH SUCCESS ---");
    next();

  } catch (err) {
    console.log(">> AUTH ERROR:", err.message);
    res.clearCookie("token");
    return res.redirect('/login');
  }
};