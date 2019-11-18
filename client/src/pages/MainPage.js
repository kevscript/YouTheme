import React from 'react'
import { GoogleLogout } from 'react-google-login'
import { Link } from 'react-router-dom'

import { CLIENT_ID } from '../config'
import EditPage from './EditPage'

const MainPage = ({handleLogout}) => {

  const logoutSuccess = (response) => {
    console.log('legout user respons', response)
    handleLogout(null)
  }

  return (
    <div>
      Main Page
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={logoutSuccess}
      /> 
      <Link to="/edit">Edit</Link>
    </div>
  )
}

export default MainPage