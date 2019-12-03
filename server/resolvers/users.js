const { AuthenticationError, ApolloError } = require('apollo-server')
// google verification client
const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User')
const { fetchAllSubscriptions } = require('../utils/fetchAllSubscriptions')

// init google client
const client = new OAuth2Client(process.env.CLIENT_ID)

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find()
        return users
      } catch (err) {
        throw new ApolloError(err.message)
      }
    },
    getUser: async (_, { id }) => {
      try {
        const foundUser = await User.findOne({ id: id })
        if (foundUser) {
          return foundUser
        } else {
          throw new ApolloError('No user with this id found in the DB')
        }
      } catch (e) { throw new ApolloError(e.message) }
    },
    getThemes: async (_, { id }) => {
      try {
        const foundUser = await User.findOne({ id: id })
        if (foundUser) {
          return foundUser.themes
        } else {
          throw new ApolloError('No user with this id found in the DB')
        }
      } catch (e) { throw new ApolloError(e.message) }
    },
    getSubs: async (_, { id }) => {
      try {
        const foundUser = await User.findOne({ id: id })
        if (foundUser) {
          return foundUser.subscriptions
        } else {
          throw new ApolloError('No user with this id found in the DB')
        }
      } catch (e) { throw new ApolloError(e.message) }
    }
  },
  Mutation: {
    register: async (_, { idToken, accessToken }) => {
      try {
        // decode user token and verify if its provided by an official google services
        const ticket = await client.verifyIdToken({
          idToken: idToken,
          audience: process.env.CLIENT_ID
        })
        const { email, name, sub } = ticket.getPayload()

        // check if user already exists in the database
        const foundUser = await User.findOne({ id: sub })

        if (foundUser) {
          // if user exists in the DB, return an object that matches graphql User Type
          return {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            createdAt: foundUser.createdAt,
            subscriptions: foundUser.subscriptions,
            themes: foundUser.themes
          }
        } else {
          const subsPromise = async () => {
            const subs = await fetchAllSubscriptions(accessToken, process.env.API_KEY, null, [])
            return subs
          }

          let userObject
          await subsPromise()
            .then(async (subs) => {
              const createdAt = new Date().toISOString()
              userObject = {
                email,
                name,
                id: sub,
                createdAt,
                subscriptions: subs,
                themes: []
              }
            }).catch(e => console.log(e))

          const res = await new User(userObject).save()
          return {
            id: res.id,
            email: res.email,
            name: res.name,
            createdAt: res.createdAt,
            subscriptions: res.subscriptions,
            themes: res.themes
          }
        }
      } catch (e) { throw new ApolloError(e.message) }
    },
    reloadSubs: async (_, { id, accessToken }) => {
      try {
        const subsPromise = async () => {
          const subs = await fetchAllSubscriptions(accessToken, process.env.API_KEY, null, [])
          return subs
        }
        let newSubs
        await subsPromise().then(subs => newSubs = subs)
        await User.updateOne({ id: id }, { $set: { subscriptions: newSubs } })
        return newSubs
      } catch (e) { throw new ApolloError(e.message) }
    },
    createTheme: async (_, { id, themeName }) => {
      try {
        const newTheme = { name: themeName, id: Date.now().toString() }
        await User.updateOne({ id: id }, { $push: { themes: newTheme } })
        return newTheme
      } catch (e) { throw new ApolloError(e.message) }
    },
    deleteTheme: async (_, { id, themeId }) => {
      try {
        await User.updateOne({ id: id }, { $pull: { themes: { id: themeId } } })
        return themeId
      } catch (e) { throw new ApolloError(e.message) }
    },
    editThemeName: async (_, { id, themeId, newName }) => {
      try {
        await User.updateOne({ id: id, 'themes.id': themeId }, { $set: { "themes.$.name": newName } })
        const res = await User.findOne({ id: id, themes: { $elemMatch: { id: themeId } } }, { 'themes.$.id': themeId })
        return {
          name: res.themes[0].name,
          id: res.themes[0].id
        }
      } catch (e) { throw new ApolloError(e.message) }
    },
    addChannel: async (_, { id, themeId, channelId, channelName }) => {
      try {
        // try to add channel to the channels array of the theme
        const channel = { channelId, channelName }
        let wasAdded = 0
        // addToSet only adds a new entry if the channel object doesnt already exists
        await User.updateOne(
          { id: id, 'themes.id': themeId },
          { $addToSet: { "themes.$.channels": channel } },
          null,
          (err, res) => {
            wasAdded = res.nModified
            console.log('nModified:', res.nModified)
          }
        )
        // check the res in callback, set it to wasAdded variable, if nModified !== 0, it means an entry(entries) was added/modfied
        if (wasAdded) {
          return channel
        } else {
          // if nModified is set to 0, it means the channel is already in the array
          throw new ApolloError(`'${channelId}' is already added to this theme`)
        }
      } catch (e) { throw new ApolloError(e.message) }
    },
    removeChannel: async (_, { id, themeId, channelId }) => {
      try {
        let wasRemoved = 0
        await User.updateOne(
          { id: id, 'themes.id': themeId },
          { $pull: { "themes.$.channels": { channelId: channelId } } },
          null,
          (err, res) => {
            wasRemoved = res.nModified
            console.log('nModified:', res.nModified)
          }
        )

        if (wasRemoved) {
          return channelId
        } else {
          throw new Error(`the object with id ${channelId} does not exist in the db`)
        }
      } catch (e) { throw new ApolloError(e.message) }
    }
  }
}