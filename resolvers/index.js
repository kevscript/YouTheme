const usersResolvers = require('./users')
const themesResolvers = require('./themes')
const subscriptionsResolvers = require('./subscriptions')
const channelsResolvers = require('./channels')

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...themesResolvers.Query,
    ...subscriptionsResolvers.Query,
    ...channelsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...themesResolvers.Mutation,
    ...subscriptionsResolvers.Mutation,
    ...channelsResolvers.Mutation
  }
}