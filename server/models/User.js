const { Schema, model } = require('mongoose')
const Subscription = require('./Subscription').schema
const Theme = require('./Theme').schema

const userSchema = new Schema({
  name: String,
  email: String,
  id: String,
  createdAt: String,
  subscriptions: [Subscription],
  themes: [Theme]
})

module.exports = model('User', userSchema)