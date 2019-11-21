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
      } catch(err) {
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
      } catch(e) { throw new ApolloError(e.message) }
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
      } catch(e) { throw new ApolloError(e.message) }
    },
    reloadSubs: async (_, { id, accessToken }) => {
      try {
        const subsPromise = async () => {
          const subs = await fetchAllSubscriptions(accessToken, process.env.API_KEY, null, [])
          return subs
        }
        let newSubs
        await subsPromise().then(subs => newSubs = subs)
        await User.updateOne({id: id}, { $set: {subscriptions: newSubs} })
          .then(() => console.log('updated'))
      } catch(e) { throw new ApolloError(e.message) }
    }
  }
}