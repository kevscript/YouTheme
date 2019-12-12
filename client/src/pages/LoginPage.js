import React from 'react'
import styled from 'styled-components'
import { motion } from "framer-motion"
import { GoogleLogin } from 'react-google-login';
import LoginButton from '../components/LoginButton'


const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 20% 0;
  background: rgb(12,35,87);
  background: linear-gradient(0deg, rgba(12,35,87,1) 0%, rgba(24,174,138,1) 100%);
  z-index: -99;
`

const Title = styled(motion.h1)`
  position: relative;
  font-family: "Lobster", "Roboto", sans-serif;
  font-size: 60px;
  color: rgba(12,35,87,1);

  :after {
    content: 'Youtheme';
    position: absolute;
    top: -4px;
    left: -4px;
    color: rgba(24,174,138,1);
  }
`

const SubTitle = styled(motion.span)`
  font-size: 15px;
  color: #f1f1f1;
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
        <Title
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.5, ease: "easeOut" }}
        >
          Youtheme
        </Title>
        <SubTitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
        >
          Youtube subscriptions sorter
        </SubTitle>
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