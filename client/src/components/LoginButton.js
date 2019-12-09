import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import GoogleIcon from '../assets/google.svg'

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 1px solid rgba(12, 36, 97, 0.8);
  font-size: 18px;
  padding: 18px 25px;
  background: transparent;
  color: #0c2461;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  :hover {
    background: #0c2461;
    color: #f1f1f1;
    transition: all 0.25s ease-in-out;
    transform: translateY(-5px);
  }
  span {
    margin-right: 10px;
  }
`

const LoginButton = ({handleClick, isDisabled, buttonText}) => {
  return (
    <Button onClick={handleClick} disabled={isDisabled}>
      <span>{buttonText}</span>
      <Icon icon={GoogleIcon} width='18px' height='18px' />
    </Button>
  )
}

export default LoginButton

