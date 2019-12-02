import React, { useEffect } from 'react'

const LoginButton = (props) => {

  useEffect(() => {
    const {
      clientId,
      cookiePolicy,
      loginHint,
      hostedDomain,
      autoLoad,
      isSignedIn,
      fetchBasicProfile,
      redirectUri,
      discoveryDocs,
      onFailure,
      uxMode,
      scope,
      accessType,
    } = props

    const params = {
      client_id: clientId,
      cookie_policy: cookiePolicy,
      login_hint: loginHint,
      hosted_domain: hostedDomain,
      fetch_basic_profile: fetchBasicProfile,
      discoveryDocs,
      ux_mode: uxMode,
      redirect_uri: redirectUri,
      scope,
      access_type: accessType
    }
  
    window.gapi.load('auth2', () => {
      if(!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init(params)
          .then(res => {
            if(isSignedIn && res.isSignedIn.get()) {
              handleSigninSuccess(res.currentUser.get())
            }
          }, err => onFailure(err))
      }
      if (autoLoad) {
        signIn()
      }
    })

  })

  const signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    const { onFailure, prompt } = props
    const options = { prompt }
    auth2.signIn(options)
      .then(res => handleSigninSuccess(res), err => onFailure(err))
  }
  
  const handleSigninSuccess = (res) => {
    const { onSuccess } = props
  
    const basicProfile = res.getBasicProfile()
    const authResponse = res.getAuthResponse()
    res.googleId = basicProfile.getId()
    res.tokenObj = authResponse
    res.tokenId = authResponse.id_token
    res.accessToken = authResponse.access_token
    res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName()
    }
  
    onSuccess(res)
  }

  return (
    <button onClick={signIn}>
      {props.buttonText}
    </button>
  )
}

export default LoginButton

