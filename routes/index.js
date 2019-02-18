var express = require('express')
require('../model/db')
var router = express.Router()
const mongoose = require('mongoose')
const data = mongoose.model('studentDetail')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/view', function (req, res, err) {
  data.find({}, function (err, docs) {
    if (err) {
      res.send('Error received ', err)
      return
    }
    res.status(200).send(JSON.stringify(docs))
  })
})

//  api to delete student data

module.exports = router
