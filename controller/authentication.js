const mongooseService = require('../lib/mongoose')
const constantMessages = require('../constant/messages').errorMessage.eng

async function registerUser (req, res) {
  let details = req.body
  console.log(details)
  try {
    let userObj = await mongooseService.Registeration.registerUser(details)
    res.status(200).send({
      status_message: 'Successfully registered user',
      status_code: 200,
      response: userObj
    })
    return
  } catch (error) {
    res.send(error)
  }
}

async function unregisterUser (req, res) {
  let details = req.body
  try {
    let userObj = await mongooseService.Registeration.unregisterUser(details)
    if (userObj == null) {
      throw constantMessages.userNotFound
    }
    res.status(200).send({
      status_message: ' User successfully unregistered',
      status_code: 200,
      response: userObj
    })
  } catch (error) {
    res.send(error)
  }
}

async function login (req, res) {
  let details = req.body
  // details.api_key = req.query.api_key
  details.session = req.session
  try {
    // await mongooseService.Authenticate.access(details.api_key);
    let response = await mongooseService.User.login(details)
    console.log('response is ', response)
    res.status(200).send(response)
  } catch (error) {
    res.send(error)
  }
}

async function logout (req, res) {
  const authorizationHeader = req.get('Authorization') || req.get('authorization')
  const token = authorizationHeader.split(' ')[1]
  let details = { token: token }
  try {
    // await mongooseService.Authenticate.access(details.api_key);
    let response = await mongooseService.User.logout(token)
    console.log('response is -->', response)
    res.status(200).send(response)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  registerUser: registerUser,
  unregister: unregisterUser,
  login: login,
  logout: logout
}
