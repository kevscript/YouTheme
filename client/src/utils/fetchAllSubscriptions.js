const getSubscriptions = async () => {
  await fetchAllSubscriptions(null)
}

const fetchAllSubscriptions = (token) => {
  const baseUrl = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&mine=true&key=${API_KEY}`
  const headers = {
    'Authorization': 'Bearer ' + googleUser.Zi.access_token,
    'Accept': 'application/json'
  }
  const fetchUrl = token ? `${baseUrl}&pageToken=${token}` : baseUrl

  return fetch(fetchUrl, { headers: headers })
    .then(res => res.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        if (!data.nextPageToken) {
          setSubscriptions(subs => [...subs, ...data.items].sort((a, b) => {
            return a.snippet.title.toLowerCase() > b.snippet.title.toLowerCase() ? 1 : -1
          }))
          console.log('all subscriptions have been fetched')
        } else {
          setSubscriptions(subs => [...subs, ...data.items].sort((a, b) => {
            return a.snippet.title.toLowerCase() > b.snippet.title.toLowerCase() ? 1 : -1
          }))
          fetchAllSubscriptions(data.nextPageToken)
        }
      } else {
        console.log('this account is not subscribed to any youtube channel')
      }
    })
    .catch(err => console.error(err))
}