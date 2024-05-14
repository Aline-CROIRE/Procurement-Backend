const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  forgotPassword,
  resetPassword,
} = require("../controller/Auth.controller");

const UserController = require("../controller/Admin.controller");
const {
  authMiddleware,
  isAdmin,
  isHOD,
  isManager,
  isSupplier,
} = require("../middleware/auth");

// ###############authroutes##############

router.post("/auth/signup", userSignup);
router.post("/auth/login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Apply authMiddleware to routes that require authentication
// ###############userroutes##############

router.post("/user", authMiddleware, isAdmin, UserController.createUser);
router.put("/user", authMiddleware, isAdmin, UserController.updateUser);
router.delete("/user", authMiddleware, isAdmin, UserController.deleteUser);
router.get("/user", authMiddleware, isAdmin, UserController.getAllUser);

module.exports = router;
