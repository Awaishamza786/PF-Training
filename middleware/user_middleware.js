// const db = require("./../model/connection/connection_model");

const jwt = require("jsonwebtoken");
const secretKey = "Awais Hamza";

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Token is valid, save the decoded payload for future use
    req.userId = decoded.userId;
    next();
  });
};

module.exports={verifyToken}