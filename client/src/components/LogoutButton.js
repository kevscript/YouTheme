import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button`
  padding: 8px 15px;
  border-radius: 3px;
  border: 1px solid rgba(255,255,255,0.6);
  background: transparent;
  color: #f1f1f1;
  font-weight: 600;
  cursor: pointer;

  :hover {
    background: rgba(12,35,87,1);
    border: none;
    transition: all 0.25s ease-in-out;
    border: 1px solid rgba(12,35,87,1);
    box-shadow: 0px 10px 30px rgba(24,174,138,0.2);
  }
`

const LogoutButton = ({ handleClick = null, isDisabled = null, buttonText = 'Logout' }) => {
  return (
    <Button 
      disabled={isDisabled} 
      onClick={handleClick}
      data-testid="button"
    >
      <span>{buttonText}</span>
    </Button>
  )
}

LogoutButton.propTypes = {
  handleClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  buttonText: PropTypes.string
}

export default LogoutButton