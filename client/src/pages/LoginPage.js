import React from 'react'
import styled from 'styled-components'
import LoginButton from '../components/LoginButton'
import { GoogleLogin } from 'react-google-login';


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
  font-family: "Lobster", "Roboto", sans-serif;
  font-size: 50px;
  color: #0c2461;
`

const SubTitle = styled.span`
  font-size: 15px;
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
        <SubTitle>Youtube subscriptions sorter.</SubTitle>
      </div>
      <BtnContainer>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        render={renderProps => (
          <LoginButton 
            handleClick={renderProps.onClick} 
            isDisabled={renderProps.disabled} 
            buttonText="Sign In with Google"
          />
        )}
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        cookiePolicy={'single_host_origin'}
        scope={scope}
        discoveryDocs={discoveryUrl}
        isSignedIn
      />
      </BtnContainer>
    </Container>
  )
}

export default LoginPage