const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    name: String
    email: String
    id: String
    createdAt: String
    subscriptions: [Subscription]
    themes: [Theme]
  }
  type Theme {
    name: String
    id: String
  }
  type Subscription {
    kind: String
    etag: String
    id: String
    snippet: Snippet
    contentDetails: ContentDetails
  }
  type ContentDetails {
    totalItemCount: Int
    newItemCount: Int
    activityType: String
  }
  type Snippet {
    publishedAt: String
    title: String
    description: String
    resourceId: ResourceId
    channelId: String
    thumbnails: Thumbnails
  }
  type ResourceId {
    kind: String
    channelId: String
  }
  type Thumbnails {
    default: Thumbnail
    medium: Thumbnail
    high: Thumbnail
  }
  type Thumbnail {
    url: String
  }
  type Query {
    sayHi: String
    getUsers: [User]
    getUser(id: String!): User
  }
  type Mutation {
    register(idToken: String!, accessToken: String!): User
  }
`