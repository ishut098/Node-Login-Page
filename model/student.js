const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
  'name': {
    type: String,
    required: true
  },
  'class': {
    type: String,
    required: true
  },
  'roll_no': {
    type: Number,
    required: true
  },
  'age': Number
})
/**Use userDetail to use the above defined model schema*/
mongoose.model('studentDetail', studentSchema)
