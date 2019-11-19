import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import GlobalStyle from './styles/global'

import PrivateRoute from './PrivateRoute'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import EditPage from './pages/EditPage'
import FeedPage from './pages/FeedPage'
import SubsPage from './pages/SubsPage'

const App = () => {
  const [googleUser, setGoogleUser] = useState(null)

  return (
    <div>
      <GlobalStyle />
      <Router>
        <Route exact path="/login">
          {googleUser ? <Redirect to='/' /> : <LoginPage handleLogin={setGoogleUser} />}
        </Route>
        <PrivateRoute 
          exact path="/" 
          user={googleUser} 
          component={() => <MainPage handleLogout={setGoogleUser} />} 
        />
        <PrivateRoute exact path="/edit" user={googleUser} component={EditPage}/>
        <PrivateRoute exact path="/feed" user={googleUser} component={FeedPage} />
        <PrivateRoute exact path="/subscriptions" user={googleUser} component={SubsPage} />
      </Router>
    </div>
  )
}

export default App