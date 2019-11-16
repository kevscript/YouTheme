import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { CLIENT_ID, API_KEY } from './config'

import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const REGISTER_USER = gql`
  mutation RegisterUser($token: String!) {
    register(token: $token) {
      name
      email
      id
      createdAt
    }
  }
`

const App = () => {
  const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
  const scope = 'https://www.googleapis.com/auth/youtube.readonly'

  const [loggedUser, setLoggedUser] = useState(null)
  const [subscriptions, setSubscriptions] = useState([])
  const [error, setError] = useState(null)
  const [googleUser, setGoogleUser] = useState(null)

  const [register] = useMutation(REGISTER_USER, {
    onCompleted: (data) => setLoggedUser(data.register)
  })

  const responseSuccess = async (response) => {
    console.log('onsuccess', response)
    await register({ variables: { token: response.tokenId } })
    setGoogleUser(response)
  }

  const responseFailure = (response) => {
    console.log('onfailure', response)
    setError(response)
  }

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
        onSuccess={responseSuccess}
        onFailure={responseFailure}
        scope={scope}
        discoveryDocs={discoveryUrl}
        cookiePolicy={'single_host_origin'}
        isSignedIn
      />
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={responseSuccess}
      />
      <button onClick={getSubscriptions}>FETCH</button>

      <h3>{googleUser ? googleUser.Zi.id_token : 'no user logged'}</h3>
      {error && error}
    </div>

  );
}

export default App
