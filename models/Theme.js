const { Schema, model } = require('mongoose')

const themeSchema = new Schema({
  name: String,
  id: String,
  channels: [
    {
      _id: false,
      channelId: String,
      channelName: String
    }
  ]
})

module.exports = model('Theme', themeSchema)