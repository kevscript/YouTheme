const { ApolloError } = require('apollo-server')
const User = require('../models/User')

module.exports = {
  Query: {
    getSubs: async (_, { id }) => {
      try {
        const foundUser = await User.findOne({ id: id })
        if (foundUser) {
          return foundUser.subscriptions
        } else {
          throw new ApolloError('No user with this id found in the DB')
        }
      } catch (e) { throw new ApolloError(e.message) }
    },
  },
  Mutation: {
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
  }
}