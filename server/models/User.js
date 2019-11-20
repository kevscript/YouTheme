
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  email: String,
  id: String,
  createdAt: String,
  subscriptions: [
    {
      kind: String,
      etag: String,
      id: String,
      snippet: {
        publishedAt: String,
        title: String,
        description: String,
        resourceId: {
          kind: String,
          channelId: String
        },
        channelId: String,
        thumbnails: {
          default: String,
          medium: String,
          high: String
        }
      },
      contentDetails: {
        totalItemCount: Number,
        newItemCount: Number,
        activityType: String
      }
    }
  ],
  themes: [
    {
      name: String,
      id: String
    }
  ]
})

module.exports = model('User', userSchema)