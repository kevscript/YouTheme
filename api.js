require('dotenv').config();
const axios = require('axios');

// const googleApi = axios.create({
//   baseUrl: `https://www.googleapis.com/youtube/v3`
// })

function getVideos(channelId, maxRes) {
  const params = {
    channelId: channelId,
    maxResults: maxRes,
    key: process.env.API_KEY,
    part: 'snippet,id',
    order: 'date'
  }

  return axios.get('https://www.googleapis.com/youtube/v3/search', { params })
    .then(data => data)
    .catch(error => console.error(error))
}

module.exports = {
  getVideos
}