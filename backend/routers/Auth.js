const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
} = require("../controller/Auth.controller");
const {getApplicants,
  submitForm,
  selectApplication, upload,
  deleteRejectedApplications,} = require('../controller/Supplier.controller.js')
  const{tenders,newTender,selectTender,uploads,rejectTender,updateTender}= require('../controller/tender.controller.js')
const UserController = require("../controller/Admin.controller");
const {
  authMiddleware,
  isAdmin,
  isHOD,
  isManager,
  isSupplier,
} = require("../middleware/auth");

const requestController = require('../controller/request.controller.js');


// ###############authroutes##############
router.post("/auth/signup", userSignup);
router.post("/auth/login", userLogin);
router.post("/auth/logout", userLogout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


// Apply authMiddleware to routes that require authentication
// ###############userroutes##############

router.post("/user",authMiddleware,isAdmin,  UserController.createUser);
router.put("/user", authMiddleware,isAdmin, UserController.updateUser);
router.delete("/user",authMiddleware,isAdmin,  UserController.deleteUser);
router.get("/user",authMiddleware,isAdmin,  UserController.getAllUser);




// requistion routers
router.post('/create',authMiddleware,isHOD, requestController.createRequest);
router.get('/allRequest', authMiddleware,isHOD, requestController.getAllRequests);
router.get('/request/:id',authMiddleware,isHOD,  requestController.getRequestById);
router.post('/:id/status', authMiddleware,isHOD, requestController.updateRequestStatus);
router.post('/update-request',authMiddleware,isHOD,  requestController.updateRequest);
router.delete('/delete-request', authMiddleware,isHOD, requestController.deleteRequest);



//application routes
router.post('/form',upload.single('cv'), submitForm);
//router.post('/form', upload.single('cv'), createApplicationForm);
router.post('/select-application',authMiddleware,isHOD,selectApplication)
router.post('/reject-application',authMiddleware,isHOD,deleteRejectedApplications)
router.get('/candidate',authMiddleware,isHOD,getApplicants)

//tenders

router.post('/tender',authMiddleware,isAdmin,   uploads.single('image'), newTender)
router.post('/select-tender',authMiddleware,isAdmin,  selectTender)
router.post('/reject-tender',authMiddleware,isAdmin,  rejectTender)
router.put('/update-tender',authMiddleware,isAdmin,  updateTender)
router.get('/tenders',tenders)


module.exports = router;

