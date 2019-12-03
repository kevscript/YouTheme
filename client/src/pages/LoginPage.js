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

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const LoginPage = ({ handleGoogleUser, handleAuthUser, loadingMessage, setLoadingMessage }) => {
  const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
  const scope = 'https://www.googleapis.com/auth/youtube.readonly'

  const loginSuccess = (response) => {
    console.log('onsuccess', response)
    setLoadingMessage('Loading...')
    // await register({ variables: { token: response.tokenId } })
    handleGoogleUser(response)
    handleAuthUser({ 
      variables: { 
        idToken: response.tokenId,
        accessToken: response.accessToken
      } 
    })
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
      <BtnContainer>
        <LoginButton
          clientId={CLIENT_ID}
          onSuccess={loginSuccess}
          onFailure={loginFailure}
          scope={scope}
          discoveryDocs={discoveryUrl}
          cookiePolicy={'single_host_origin'}
          buttonText={loadingMessage ||'Login'}
          isSignedIn
        />
      </BtnContainer>
    </Container>
  )
}

export default LoginPage