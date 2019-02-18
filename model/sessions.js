const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  'session_id': {
    type: String,
    required: true
  },
  'expires': {
    type: Date,
    default: Date.now
  },
  'session': {
    type: Object,
    required: true
  },
  'createAt': {
    type: Date,
    default: Date.now(),
    index: { expires: 3600 * 24 }
  },
  'userId': {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  'lastCheck': {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('Session', sessionSchema)
