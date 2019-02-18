const mongoose = require('mongoose')
require('../model/db')
const data = mongoose.model('studentDetail')
const constantMessages = require('../constant/messages').errorMessage.eng

function addDetail (details) {
  var studentDetail = new data(details)
  studentDetail.save(function (error) {
    if (error) {
      console.error(error)
    }
  })
}
function deleteDetail (res, rollno) {
  console.log('Inside Delete function')
  data.findOneAndDelete({ roll_no: rollno }, function (error, doc) {
    console.log(doc)
    if (error) {
      res.end({
        'message': 'Some error occurred' + error,
        'code': 500
      })
      return
    }
    if (!doc) {
      res.status(404).send(`No records found`)
      return
    }
    res.status(200).send(`Data deletion successful`)
  })
}
module.exports = {
  addDetail: addDetail,
  deleteDetail: deleteDetail
}
