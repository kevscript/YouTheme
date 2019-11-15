require('dotenv').config()
const { ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const server = new ApolloServer({ typeDefs, resolvers })
const port = 4000

mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port }))
  .then(() => console.log(`server running on port ${port}`))