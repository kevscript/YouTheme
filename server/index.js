require('dotenv').config()
const { 
  ApolloServer, 
  gql, 
  AuthenticationError,
  ApolloError
} = require('apollo-server')
const { OAuth2Client } = require('google-auth-library')
const mongoose = require('mongoose')

// schemas
const User = require('./models/user')

// init google verification
const client = new OAuth2Client(process.env.CLIENT_ID)

const typeDefs = gql`
  type User {
    name: String
    email: String
    sub: String
  }
  type Query {
    sayHi: String
    getUsers: [User]
  }
  type Mutation {
    register(token: String!): User
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
        throw new ApolloError(err.message)
      }
    }
  },
  Mutation: {
    register: async (_, { token }) => {
      try {
        // decode user token and verify if its provided by an official google services
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENT_ID
        })
        const { email, name, sub } = ticket.getPayload()
    
        // check if user already exists in the database
        const foundUser = await User.findOne({ sub: sub })

        if (foundUser) {
          throw new AuthenticationError('An User with this google account has already been registered')
        } else {
          // if user doesn't already exist
          // add him to the DB
          const newUser = new User({ email, name, sub })
          const res = await newUser.save() 
          // and return an object that matches graphql User Type
          return { sub: res.sub, email: res.email, name: res.name }
        }
      } catch(e) { throw new ApolloError(e.message) }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

const port = 4000

mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port }))
  .then(() => console.log(`server running on port ${port}`))