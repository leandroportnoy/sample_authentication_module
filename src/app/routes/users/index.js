var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller')

router.get('/', UserController.get_users)
router.get('/:id', UserController.get_user)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)

module.exports = router;