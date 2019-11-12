require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const { OAuth2Client } = require('google-auth-library')
const mongoose = require('mongoose')

// schemas
const User = require('./models/user')

// init google verification
const client = new OAuth2Client(process.env.CLIENT_ID)

const typeDefs = gql`
  type Query {
    sayHi: String
    getUsers: [User]
  }
  type Mutation {
    register(token: String!): String
  }
  type User {
    name: String
    email: String
    sub: String
  }
`

const resolvers = {
  Query: {
    sayHi: () => 'hello world',
    getUsers: async () => {
      try {
        const dogs = await User.find()
        return dogs
      } catch(err) {
        return err.message
      }
    }
  },
  Mutation: {
    register: async (_, { token }) => {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
      })
      const { email, name, sub } = ticket.getPayload()

      await User.findOne({ sub: sub }, async (err, res) => {
        if (err) return err.message
        if (res) {
          return 'A user for this google account has already been registered'
        } else {
          const newUser = new User({ email, name, sub })
          await newUser.save()
          return `${name}, ${email}, ${sub}`
        }
      })
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

const port = 4000

mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port }))
  .then(() => console.log(`server running on port ${port}`))