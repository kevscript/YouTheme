import React from 'react'
import styled from 'styled-components'
import { CLIENT_ID } from '../config'
import LoginButton from '../components/LoginButton'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20% 0;
`

const Title = styled.h1`
  font-size: 50px;
`

const LoginPage = ({ handleGoogleUser, handleAuthUser }) => {
  const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
  const scope = 'https://www.googleapis.com/auth/youtube.readonly'

  const loginSuccess = (response) => {
    console.log('onsuccess', response)
    // await register({ variables: { token: response.tokenId } })
    handleGoogleUser(response)
    handleAuthUser({ variables: { token: response.tokenId } })
  }

  const loginFailure = (response) => {
    console.log('onfailure', response)
  }

  return (
    <Container>
      <div>
        <Title>Youtheme</Title>
        <span>Youtube subscriptions sorter</span>
      </div>
      <LoginButton
        clientId={CLIENT_ID}
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        scope={scope}
        discoveryDocs={discoveryUrl}
        cookiePolicy={'single_host_origin'}
        isSignedIn
      />
    </Container>
  )
}

export default LoginPage