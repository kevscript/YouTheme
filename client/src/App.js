import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

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

  const [register] = useMutation(REGISTER_USER, {
    onCompleted: (data) => setAuthUser(data.register)
  })

  const handleLogout = () => {
    setGoogleUser(null)
    setAuthUser(null)
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
        <PrivateRoute exact path="/subscriptions" user={authUser} component={SubsPage} />
      </Router>
    </div>
  )
}

export default App