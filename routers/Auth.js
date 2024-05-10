const express = require('express');
const router = express.Router();
const { userSignup, userLogin, forgotPassword, resetPassword } = require('../controller/Auth.controller');

router.post("/auth/signup", userSignup);
router.post("/auth/login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
