var express = require('express')
var router = express.Router()
const checker = require('../controller/service')

router.post('/add', checker.addDetail)
router.delete('/delete', checker.deleteDetail)

module.exports = router
