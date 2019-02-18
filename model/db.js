require('./student')
require('./users')
const mongoose = require('mongoose')
const data = require('./student.json')
const users = require('./data.json')
// Including the defined models with the below lines
const Students = mongoose.model('studentDetail')
const userDetails = mongoose.model('userDetail')
require('./sessions')

/* Database connection
**Student and
usertype details */
const db = mongoose.connect('mongodb://localhost:27017/user_auth', function (err, db) {
  if (err) {
    console.log('Error occurred on connection:', err.message)
    return
  }
  console.log('Connected to the DB...')
  // delete the database
  // db.dropDatabase(function(err, result){
  //     console.log('Error in deleting: '+err);
  //     if (err) throw err;
  //     console.log('DB deleted ? '+result);
  // });
  // loadData();
})
/** Function definition for loading the data to DB.. */
function loadData () {
  // Generated product id to be stored here
  const studentIdArray = []
  data.students.forEach(function (student) {
    let productObj = new Students(student)
    productObj.save(function (error, savedProduct) {
      studentIdArray.push(savedProduct._id)
      if (error) {
        console.error('Some error occured when trying to save student with name = ' + student.title)
      }
    })
  })
  // Uploading the user's data to DB
  users.users.forEach(function (user) {
    let userObj = new userDetails(user)
    userObj.save(function (error, saveduser) {
      if (error) {
        console.log('Something went wrong while uploading users data : ' + error)
        return
      }
      console.log('User details for user ' + saveduser.email + ' is saved successfully!')
    })
  })
}
