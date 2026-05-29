const express = require('express');
const authController = require("../authcontroller/auth.controller");
const router = express.Router();

//  POST /api/v1/auth/signup
router.post('/signup' , authController.registerUser);
router.post('/login' , authController.loginUser);

// Discord bot GET endpoint
router.get('/user/:email', authController.getUserByEmail);

module.exports = router;