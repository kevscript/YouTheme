const { Schema, model } = require('mongoose')

const subscriptionSchema = new Schema({
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
      default: {
        url: String
      },
      medium: {
        url: String
      },
      high: {
        url: String
      }
    }
  },
  contentDetails: {
    totalItemCount: Number,
    newItemCount: Number,
    activityType: String
  }
})

module.exports = model('Subscription', subscriptionSchema)