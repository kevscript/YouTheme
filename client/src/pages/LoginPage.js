import React from 'react'
// import { GoogleLogin } from 'react-google-login'
import { CLIENT_ID } from '../config'

import LoginButton from '../components/LoginButton'

const LoginPage = ({handleLogin}) => {
  const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
  const scope = 'https://www.googleapis.com/auth/youtube.readonly'

  const loginSuccess = async (response) => {
    console.log('onsuccess', response)
    // await register({ variables: { token: response.tokenId } })
    handleLogin(response)
  }

  const loginFailure = (response) => {
    console.log('onfailure', response)
  }

  return (
    <div>
      <LoginButton
        clientId={CLIENT_ID}
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        scope={scope}
        discoveryDocs={discoveryUrl}
        cookiePolicy={'single_host_origin'}
        isSignedIn
      />
    </div>
  )
}

export default LoginPage