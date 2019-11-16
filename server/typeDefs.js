const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    name: String
    email: String
    id: String
    createdAt: String
  }
  type Query {
    sayHi: String
    getUsers: [User]
    getUser(id: String!): User
  }
  type Mutation {
    register(token: String!): User
  }
`