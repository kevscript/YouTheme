import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
import { CLIENT_ID } from '../config'

const MainPage = ({handleLogout}) => {

  const logoutSuccess = (response) => {
    console.log('logout response', response)
    handleLogout(null)
  }

  return (
    <div>
      Main Page
      <LogoutButton clientId={CLIENT_ID} onLogoutSuccess={logoutSuccess} /> 
      <Link to="/edit">Edit</Link>
    </div>
  )
}

export default MainPage