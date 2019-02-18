const jwt = require('jsonwebtoken')
const constant = require('../constant/messages').errorMessage.eng
class Token {
  static usertokenGenerate (claims, secret) {
    console.log('claims are ', claims, secret)
    try {
      return jwt.sign(claims, `${secret}`, { expiresIn: '12hr' })
    } catch (error) {
      throw (error)
    }
  }
  static verifyUsertoken (token) {
    try {
      return jwt.verify(token, 'shhh')
    } catch (error) {
      if (error.message === 'jwt expired') {
        throw constant.tokenExpired
      } else if (error.message === 'invalid signature') {
        throw constant.invalidToken
      } else if (error.message === 'invalid token') {
        throw constant.invalidToken
      } else {
        throw (error)
      }
    }
  }
}
module.exports = {
  token: Token
}
