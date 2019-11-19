import React from 'react'

const LogoutButton = ({ onLogoutSuccess }) => {
  const signOut = () => {
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
        auth2.signOut().then(onLogoutSuccess)
      }
    }
  }

  return (
    <button onClick={signOut}>
      Logout
    </button>
  )
}

export default LogoutButton