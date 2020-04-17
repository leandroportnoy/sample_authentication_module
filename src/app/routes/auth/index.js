var express = require('express');
var router = express.Router();
//var authMiddleware = require('../../middlewares/auth')
var AuthController = require('../../controller/authController')

//OAuth
//router.use(authMiddleware);

router.post('/register', AuthController.register)
router.post('/authenticate', AuthController.authentication)
// router.post('/resetPassword', AuthController.resetPassword)
// router.post('/forgotPassword', AuthController.forgotPassword)

module.exports = router;