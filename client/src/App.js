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

  const getSubscriptions = async () => {
    await fetchAllSubscriptions(null)
  }

  const fetchAllSubscriptions = (token) => {
    const baseUrl = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&mine=true&key=${API_KEY}`
    const headers = {
      'Authorization': 'Bearer ' + loggedUser.Zi.access_token,
      'Accept': 'application/json'
    }
    const fetchUrl = token ? `${baseUrl}&pageToken=${token}` : baseUrl

    return fetch(fetchUrl, { headers: headers })
      .then(res => res.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          if (!data.nextPageToken) {
            setSubscriptions(subs => [...subs, ...data.items])
            console.log('all subscriptions have been fetched')
          } else {
            setSubscriptions(subs => [...subs, ...data.items])
            fetchAllSubscriptions(data.nextPageToken)
          }
        } else {
          console.log('this account is not subscribed to any youtube channel')
        }
      })
      .catch(err => console.error(err))
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
        isSignedIn
      />
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={responseGoogle}
      />
      <button onClick={getSubscriptions}>FETCH</button>
      <button onClick={handleRegister}>REGISTER</button>

      {!loggedUser && <h1>no user logged</h1>}
      {loggedUser && loggedUser.Zi.id_token}
    </div>

  );
}

export default App
