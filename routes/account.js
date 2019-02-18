const express = require('express')
const router = express.Router()
require('object-hash')
const accountController = require('../controller/account')
router.put('/me', accountController.putUserDetails)
router.put('/current', accountController.getUserDetails)
router.delete('/current', accountController.getUserDetails)
module.exports = router
