
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  email: String,
  sub: String,
  createdAt: String
})

module.exports = model('User', userSchema)