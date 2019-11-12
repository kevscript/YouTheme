import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { CLIENT_ID, API_KEY } from './config'

import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const REGISTER_USER = gql`
  mutation RegisterUser($token: String!) {
    register(token: $token)
  }
`


const App = () => {
  const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
  const scope = 'https://www.googleapis.com/auth/youtube.readonly'

  const [loggedUser, setLoggedUser] = useState(null)
  const [subscriptions, setSubscriptions] = useState([])

  const [register] = useMutation(REGISTER_USER)

  const responseGoogle = (response) => {
    console.log(response);
    setLoggedUser(response)
  }

  const handleRegister = async () => {
    const token = loggedUser.Zi.id_token
    await register({ variables: { token: token } })
  }
  
  const fetchSubscriptions = async () => {
    let url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&key=${API_KEY}&mine=true`
    const headers = {
      'Authorization': 'Bearer ' + loggedUser.Zi.access_token,
      'Accept': 'application/json'
    }
    let token = null

    if (token) {
      url = url + '&pageToken=' + token
    }

    const fetchAllPages = () => {
      fetch(url, {headers: headers})
        .then(res => res.json())
        .then(res => {
          // if (res.nextPageToken && subscriptions.length < 150) {
          //   setSubscriptions(subs => [...subs, ...res.items])
          //   token = res.nextPageToken
          //   console.log(res)
          //   return fetchAllPages()
          // } else {
            if (res.items) {
              return setSubscriptions(subs => [...subs, ...res.items])
            } else {
              console.log('no youtube subscriptions on this account')
            }
          // }
        })
    }

    await fetchAllPages()
  }

  return (
    <div>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        scope={scope}
        discoveryDocs={discoveryUrl}
        cookiePolicy={'single_host_origin'}
      />
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={responseGoogle}
      />
      <button onClick={fetchSubscriptions}>FETCH</button>
      <button onClick={handleRegister}>REGISTER</button>

      {!loggedUser && <h1>no user logged</h1>}
      {loggedUser && loggedUser.Zi.id_token}
    </div>

  );
}

export default App
