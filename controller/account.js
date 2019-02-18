const mongooseService = require('../lib/mongoose')
const mongoose = require('mongoose')
require('../model/db')
const checker = require('./service')
const RegisterUser = mongoose.model('userDetail')
const constantMessages = require('../constant/messages').errorMessage.eng

async function getUserDetails (req, res) {
  const authorizationHeader = req.get('Authorization') || req.get('authorization')
  const token = authorizationHeader.split(' ')[1]
  let details = { token: token }
  try {
    await mongooseService.Authenticate.auth(details.token, async function (id) {
      let response = await RegisterUser.findById(id)
      if (response == null) {
        throw constantMessages.userNotFound
      }
      console.log(req.method)
      if (response.isAdmin === false) {
        res.status(400).send({
          'message': 'Sorry you are unauthorised to edit/change details!'
        })
      } else {
        if (req.method === 'PUT') {
          checker.addDetail(req.body)
          res.send(`Student Data Saved successfully`)
        } else if (req.method === 'DELETE') {
          if (!(req.query.roll_no)) {
            throw constantMessages.badRequest
          }
          checker.deleteDetail(res, req.query.roll_no)
        }
      }
    })
  } catch (error) {
    res.send(error)
  }
}

async function putUserDetails (req, res) {
  const authorizationHeader = req.get('Authorization') || req.get('authorization')
  const token = authorizationHeader.split(' ')[1]
  let details = { token: token, body: req.body }
  try {
    await mongooseService.Authenticate.auth(details.token, async function (id) {
      let response = await RegisterUser.findByIdAndUpdate(id, details.body)
      if (response == null) {
        throw constantMessages.userNotFound
      }
      res.status(200).send({
        message: 'Success',
        response: response
      })
    })
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  putUserDetails: putUserDetails,
  getUserDetails: getUserDetails
}
