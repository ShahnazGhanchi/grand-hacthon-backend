const jwt = require("jsonwebtoken");
const User = require("../models/User.Js");

const protect = async (req, res, next) => {
    console.log("AUTH MIDDLEWARE HIT");
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret_key"
    );

    req.user = await User.findById(decoded.id).select("-password");
    console.log("Authenticated User:", req.user);

    if (!req.user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

module.exports = protect;