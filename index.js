require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')
const uri = process.env.MONGODB

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const api = require('./api')

const port = process.env.PORT || 4000
const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

// cors middleware
app.use(cors())

server.applyMiddleware({ app, path: '/graphql' })

// app.get('/', function(req, res){
//   res.redirect('/api');
// });

// default api route
app.get('/api', (req, res) => {
  res.json({
    message: 'Default Route for Youtheme!'
  })
})

// api route for video fetching
app.get('/api/:channelId/:maxRes', (req, res) => {
  api.getVideos(req.params.channelId, req.params.maxRes)
    .then(videos => res.json(videos.data))
    .catch(err => console.log(err))
})


if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Anything that doesn't match the above, send back index.html
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen({ port: port }))
  .then(() => console.log(`Server Running on localhost:${port} -> Api: "/api" & GraphQL: "${server.graphqlPath}"`))
  .catch(err => console.log(err))
 
