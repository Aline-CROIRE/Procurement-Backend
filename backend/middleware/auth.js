const jwt = require("jsonwebtoken");
const User = require("../model/Auth/Auth.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, "your_secret_key"); // Replace 'your_secret_key' with your actual secret key

    const userId = decoded.id;

    // Find user by ID
    const user = await User.findById(userId);

    // Check if user exists and token matches
    if (user.tokens !== token) {
      throw new Error("Invalid Token");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

const checkRoleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).send({ error: "Access Denied" });
    }
    next();
  };
};

const isAdmin = checkRoleMiddleware(["admin"]);
const isHOD = checkRoleMiddleware(["HOD"]);
const isManager = checkRoleMiddleware(["Manager"]);
const isSupplier = checkRoleMiddleware(["supplier"]);

module.exports = { authMiddleware, isAdmin, isHOD, isManager, isSupplier };
