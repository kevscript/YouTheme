const { ApolloError } = require('apollo-server')
const User = require('../models/User')

module.exports = {
  Query: {
    getChannels: async (_, { id, themeId }) => {
      try {
        let result
        await User.findOne({ id: id })
          .then(res => {
            const tI = res.themes.findIndex(t => t.id === themeId)
            result = res.themes[tI].channels
          })
        return result
      } catch (e) { throw new ApolloError(e.message) }
    },
    getChannel: async (_, { id, themeId, channelId }) => {
      try {
        let result
        await User.findOne({ id: id })
          .then(res => {
            const tI = res.themes.findIndex(t => t.id === themeId)
            const cI = res.themes[tI].channels.findIndex(c => c.channelId === channelId)
            result = res.themes[tI].channels[cI]
          })
        return result
      } catch (e) { throw new ApolloError(e.message) }
    }
  },
  Mutation: {
    addChannel: async (_, { id, themeId, channelId, channelName }) => {
      try {
        let result
        await User.findOne({id: id})
          .then(res => {
            const tI = res.themes.findIndex(t => t.id === themeId)
            let channels = res.themes[tI].channels
            const exists = channels.find(c => c.channelId === channelId)

            if(!exists) {
              channels.push({channelId, channelName})
              res.save()
              result = channels
            } else {
              throw new ApolloError(`a channel with id ${channelId} is already added to the theme`)
            }
          })
        return result
      } catch (e) { throw new ApolloError(e.message) }
    },
    removeChannel: async (_, { id, themeId, channelId }) => {
      try {
        let result
        await User.findOne({id: id})
          .then(res => {
            const tI = res.themes.findIndex(t => t.id === themeId)
            const exists = res.themes[tI].channels.find(c => c.channelId === channelId)

            if (exists) {
              res.themes[tI].channels = res.themes[tI].channels.filter(c => c.channelId !== channelId)
              res.save()
              result = res.themes[tI].channels
            } else {
              throw new ApolloError(`there is no channel with id ${channelId} in this theme`)
            }
          })
        return result
      } catch (e) { throw new ApolloError(e.message) }
    },
    testFind: async (_, { id, themeId, channelId }) => {
      try {
        await User.findOne({id: id})
          .then(res => {
            const tI = res.themes.findIndex(t => t.id === themeId)
            const cI = res.themes[tI].channels.findIndex(c => c.channelId === channelId)
            res.themes[tI].channels[cI] = {channelId: '99', channelName: 'modified name'}
            res.save()
          })
      } catch (e) { throw new ApolloError(e.message) }
    }
  }
}