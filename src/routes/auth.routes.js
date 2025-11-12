const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {registerSchema, loginSchema} = require('../validators/auth.validator');
const validate = require('../validators/validate');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;