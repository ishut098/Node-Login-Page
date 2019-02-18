const mongoose = require('mongoose')
require('../model/db')
const RegisterUser = mongoose.model('userDetail')
const Sessions = mongoose.model('Session')
var hash = require('object-hash')
const constant = require('../constant/messages').errorMessage.eng
const jwtToken = require('../lib/jwtToken')

class Session {
  static async createSession (details) {
    details.session_id = hash({ email: details.email, 'secret': 'qw-as-zx' },
      { algorithm: 'sha1' })
      .slice(0, 12)
    const newSession = new Sessions({
      session: details.session,
      session_id: details.session_id,
      expires: new Date(Date.now() + (60 * 60 * 24 * 1000)),
      userId: details._id
    })
    try {
      let result = await this.checkSession(details)
      if (result == null) {
        return newSession.save()
      }
      return await Sessions.findOneAndUpdate({ session_id: details.session_id },
        { lastCheck: new Date().toUTCString() })
    } catch (error) {
      throw error
    }
  }

  static async destroySession (details) {
    try {
      return await Sessions.findOneAndDelete({ session_id: details.session_id })
    } catch (error) {
      throw error
    }
  }

  static async checkSession (details) {
    try {
      return await Sessions.findOne({ session_id: details.session_id })
    } catch (error) {
      throw error
    }
  }
}

class Registeration {
  static async checkUser (details) {
    try {
      return await RegisterUser.findOne({ email: details.email, password: details.password })
    } catch (error) {
      throw error
    }
  }

  static async registerUser (details) {
    try {
      const result = await this.checkUser(details)
      console.log('user is ', result)
      if (result == null) {
        let newUser = new RegisterUser(details)
        return newUser.save()
      } else {
        throw constant.userisRegister
      }
    } catch (error) {
      console.log('error at 1st')
      if (error.message === 'User is already register') {
        throw constant.userisRegister
      } else {
        throw error
      }
    }
  }

  static async unregisterUser (details) {
    try {
      return await RegisterUser.findOneAndDelete({ email: details.email, password: details.password })
    } catch (error) {
      throw error
    }
  }
}

class User {
  static async login (details) {
    try {
      let result = await Registeration.checkUser(details)
      if (result == null) {
        throw constant.invalidCredentials
      }
      let { isAdmin, email, _id } = result
      details._id = _id
      let session = await Session.createSession(details)
      let token = jwtToken.token.usertokenGenerate({ email: email, _id: _id, isAdmin: isAdmin, session_id: session.session_id }, 'shhh')
      return { userId: _id, email: email, token: token, session: session }
    } catch (error) {
      throw error
    }
  }

  static async logout (token) {
    try {
      let claims = jwtToken.token.verifyUsertoken(token)
      console.log('claims ', claims)
      let result = await RegisterUser.findById(claims._id)
      console.log('result ', result)
      if (result == null) {
        throw constant.userNotFound
      }
      return await Session.destroySession(claims)
    } catch (error) {
      throw error
    }
  }

  static async getDetails (id) {
    try {
      let result = await RegisterUser.findById(id)
      if (result == null) {
        throw constant.userNotFound
      }
      return result
    } catch (error) {
      throw error
    }
  }
}

class Authenticate {
  static async auth (token, callback) {
    try {
      let claims = jwtToken.token.verifyUsertoken(token)
      console.log('claims ', claims)
      let session = await Session.checkSession(claims)
      if (session == null) {
        throw constant.userNotLoggedIn
      }
      let result = await RegisterUser.findById(claims._id)
      if (result == null) {
        throw constant.userNotFound
      }
      callback(result._id)
    } catch (error) {
      throw error
    }
  }
}

module.exports = {
  Registeration: Registeration,
  Authenticate: Authenticate,
  User: User
}
