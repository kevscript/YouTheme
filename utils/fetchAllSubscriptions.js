const fetch = require('node-fetch')

const fetchAllSubscriptions = (accessToken, apiKey, pageToken, allSubs) => {
  const baseUrl = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&mine=true&key=${apiKey}`
  const headers = {
    'Authorization': 'Bearer ' + accessToken,
    'Accept': 'application/json'
  }
  const fetchUrl = pageToken ? `${baseUrl}&pageToken=${pageToken}` : baseUrl
  const subscriptions = [...allSubs]
  return fetch(fetchUrl, { headers: headers })
    .then(res => res.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        if (!data.nextPageToken) {
          const result = [...subscriptions, ...data.items]
          console.log("last page fetched, number of results: ", result.length)
          return result
        } else {
          console.log('more subs to fetch, page token:', data.nextPageToken)
          const allSubs = [...subscriptions, ...data.items]
          return fetchAllSubscriptions(accessToken, apiKey, data.nextPageToken, allSubs)
        }
      } else {
        console.log('this account is not subscribed to any youtube channel')
      }
    })
    .catch(err => console.error(err))
}

module.exports = {
  fetchAllSubscriptions
}