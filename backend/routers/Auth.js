const express = require('express');
const router = express.Router();
const { userSignup, userLogin, forgotPassword, resetPassword } = require('../controller/Auth.controller');

const requestController = require('../controller/request.controller.js');

router.post("/auth/signup", userSignup);
router.post("/auth/login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


// requistion routers
router.post('/create', requestController.createRequest);
router.get('/allRequest', requestController.getAllRequests);
router.get('/request/:id', requestController.getRequestById);
router.patch('/:id/status', requestController.updateRequestStatus);
router.patch('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);
module.exports = router;
