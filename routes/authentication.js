var express = require('express')
var router = express.Router()
const registerationController = require('../controller/authentication')

router.post('/register', registerationController.registerUser)
router.post('/unregister', registerationController.unregister)
router.post('/login', registerationController.login)
router.post('/logout', registerationController.logout)

module.exports = router
