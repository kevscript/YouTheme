const { gql } = require('apollo-server')

module.exports = gql`
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