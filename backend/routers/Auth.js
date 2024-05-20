const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
} = require("../controller/Auth.controller");
const {applicant,FormToFill,selectApplication,
  deleteRejectedApplications, } = require('../controller/Supplier.controller.js')
  const{tenders,newTender,selectTender,rejectTender}= require('../controller/tender.controller.js')
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
router.post("/auth/logout", userLogout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


// Apply authMiddleware to routes that require authentication
// ###############userroutes##############

router.post("/user",  UserController.createUser);
router.put("/user",  UserController.updateUser);
router.delete("/user",  UserController.deleteUser);
router.get("/user",  UserController.getAllUser);



// requistion routers
router.post('/create', requestController.createRequest);
router.get('/allRequest', requestController.getAllRequests);
router.get('/request/:id', requestController.getRequestById);
router.patch('/:id/status', requestController.updateRequestStatus);
router.patch('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);

//application routes

router.post('/form', FormToFill)
router.post('/select-application',selectApplication)
router.post('/reject-application',deleteRejectedApplications)
router.get('/candidate',applicant)

//tenders

router.post('/tender', newTender)
router.post('/select-tender',selectTender)
router.post('/reject-tender',rejectTender)
router.get('/tenders',tenders)
module.exports = router;

