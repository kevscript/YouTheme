import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import EditPage from './pages/EditPage'
import FeedPage from './pages/FeedPage'
import SubsPage from './pages/SubsPage'

const App = () => {
  return (
    <div>
      App Page

      <Router>
        <Route exact path="/" render={() => <MainPage />}/>
        <Route exact path="/login" render={() => <LoginPage />}/>
        <Route exact path="/edit" render={() => <EditPage />}/>
        <Route exact path="/feed" render={() => <FeedPage />}/>
        <Route exact path="/subscriptions" render={() => <SubsPage />}/>
      </Router>
    </div>
  )
}

export default App