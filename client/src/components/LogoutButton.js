import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  padding: 8px 15px;
  border-radius: 3px;
  border: 1px solid rgba(255,255,255,0.6);
  background: #0c2461;
  color: #f1f1f1;
  font-weight: 600;
  cursor: pointer;
`

const LogoutButton = ({ handleClick, isDisabled, buttonText }) => {
  return (
    <Button disabled={isDisabled} onClick={handleClick}>
      <span>{buttonText}</span>
    </Button>
  )
}

export default LogoutButton