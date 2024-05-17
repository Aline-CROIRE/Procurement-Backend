const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  forgotPassword,
  resetPassword,
} = require("../controller/Auth.controller");
const {applicant,FormToFill} = require('../controller/Supplier.controller.js')
const UserController = require("../controller/Admin.controller");
const {
  authMiddleware,
  isAdmin,
  isHOD,
  isManager,
  isSupplier,
} = require("../middleware/auth");

// ###############authroutes##############

const requestController = require('../controller/request.controller.js');

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



// requistion routers
router.post('/create', requestController.createRequest);
router.get('/allRequest', requestController.getAllRequests);
router.get('/request/:id', requestController.getRequestById);
router.patch('/:id/status', requestController.updateRequestStatus);
router.patch('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);

//application routes

router.post('/form',FormToFill)
router.get('/candidate',applicant)

module.exports = router;
