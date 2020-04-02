var express = require('express');
var router = express.Router();
var authMiddleware = require('../../middlewares/auth')
var UserController = require('../../controller/userController')

//OAuth
router.use(authMiddleware);

router.get('/', UserController.get_users)
router.get('/:id', UserController.get_user)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)

module.exports = router;