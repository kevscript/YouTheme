import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER_USER, CREATE_THEME, RELOAD_SUBS } from './graphql/mutations'

import GlobalStyle from './styles/global'
import PrivateRoute from './PrivateRoute'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import EditPage from './pages/EditPage'
import FeedPage from './pages/FeedPage'
import SubsPage from './pages/SubsPage'

const App = () => {
  const [googleUser, setGoogleUser] = useState(null)
  const [authUser, setAuthUser] = useState(null)
  const [subscriptions, setSubscriptions] = useState([])
  const [themes, setThemes] = useState([])

  const [createTheme] = useMutation(CREATE_THEME, {
    onCompleted: (data) => setThemes(t => [...t, data.createTheme])
  })

  const [register] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      setAuthUser({
        name: data.register.name,
        email: data.register.email,
        id: data.register.id,
        createdAt: data.register.createdAt
      })
      setSubscriptions(data.register.subscriptions)
      setThemes(data.register.themes)

    }
  })

  const [reloadSubs] = useMutation(RELOAD_SUBS, {
    variables: { 
      id: authUser? authUser.id : null, 
      accessToken: googleUser ? googleUser.accessToken : null 
    },
    onCompleted: (data) => setSubscriptions(data.reloadSubs)
  })

  const handleLogout = () => {
    setGoogleUser(null)
    setAuthUser(null)
    setSubscriptions([])
    setThemes([])
  }

  const handleThemeCreation = (themeName) => {
    if (themeName) {
      createTheme({ variables: { id: authUser.id, themeName }})
    }
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

        <PrivateRoute 
          exact path="/edit" 
          user={authUser} 
          component={() => <EditPage themes={themes} handleThemeCreation={handleThemeCreation}/>}
        />

        <PrivateRoute 
          exact path="/feed" 
          user={authUser} 
          component={FeedPage} 
        />

        <PrivateRoute 
          exact path="/subscriptions" 
          user={authUser} 
          component={() => <SubsPage subscriptions={subscriptions} handleReload={reloadSubs} />} 
        />

      </Router>
    </div>
  )
}

export default App