import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { API_KEY } from './config'

import GlobalStyle from './styles/global'
import PrivateRoute from './PrivateRoute'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import EditPage from './pages/EditPage'
import FeedPage from './pages/FeedPage'
import SubsPage from './pages/SubsPage'

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
  const [googleUser, setGoogleUser] = useState(null)
  const [authUser, setAuthUser] = useState(null)
  const [subscriptions, setSubscriptions] = useState([])

  const [register] = useMutation(REGISTER_USER, {
    onCompleted: (data) => setAuthUser(data.register)
  })

  const handleLogout = () => {
    setGoogleUser(null)
    setAuthUser(null)
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

  return (
    <div>
      <GlobalStyle />
      <Router>
        <Route exact path="/login">
          {
            authUser 
              ? <Redirect to='/' /> 
              : <LoginPage 
                  handleGoogleUser={setGoogleUser} 
                  googleUser={googleUser} 
                  authUser={authUser} 
                  handleAuthUser={register} 
                />
          }
        </Route>
        <PrivateRoute 
          exact path="/" 
          user={authUser} 
          component={() => <MainPage handleLogout={handleLogout} />} 
        />
        <PrivateRoute exact path="/edit" user={authUser} component={EditPage}/>
        <PrivateRoute exact path="/feed" user={authUser} component={FeedPage} />
        <PrivateRoute 
          exact path="/subscriptions" 
          user={authUser} 
          component={() => <SubsPage subscriptions={subscriptions} getSubscriptions={getSubscriptions} />} 
        />
      </Router>
    </div>
  )
}

export default App