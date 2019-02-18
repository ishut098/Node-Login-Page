const Boom = require('boom')
module.exports = {
  version: '/v1',

  errorMessage: {
    eng: {
      invalidToken: Boom.conflict('Invalid Token'),
      emailExists: Boom.conflict('Email Already exist'),
      appExists: Boom.conflict('Application name already exist'),
      tokenExpired: Boom.conflict('Token Expired'),
      invalidCredentials: Boom.unauthorized('Invalid Credentials'),
      userNotFound: Boom.notFound('Not found'),
      userNotLoggedIn: Boom.notFound('User is not Logged in'),
      notInserted: Boom.conflict('Cannot Insert the Data'),
      userisRegister: Boom.conflict('User is already register'),
      userNotAdmin: Boom.unauthorized('Unauthorized access'),
      badRequest: Boom.badRequest('Invalid Request, check for necesarry request parameters')
    }
  }
}
