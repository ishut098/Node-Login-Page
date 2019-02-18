const mongoose = require('mongoose')
const registerUserSchema = new mongoose.Schema({
  'email': {
    type: String,
    required: true
  },
  'password': {
    type: String,
    required: true
  },
  'isAdmin': {
    type: Boolean,
    required: true,
    default: false
  },
  'name': {
    type: String,
    required: false
  }
})
/**Use userDetail to use the above defined model schema*/
mongoose.model('userDetail', registerUserSchema)
