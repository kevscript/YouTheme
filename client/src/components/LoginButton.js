import React from 'react'
import styled from 'styled-components'
import { motion } from "framer-motion"
import Icon from './Icon'
import GoogleIcon from '../assets/google.svg'

const Button = styled(motion.button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 2px solid rgba(24,174,138,1);
  font-size: 18px;
  padding: 18px 25px;
  background: transparent;
  color: #f1f1f1;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  :hover {
    background: rgba(12,35,87,1);
    border: none;
    transition: all 0.25s ease-in-out;
    transform: translateY(-10px);
    border: 2px solid rgba(12,35,87,1);
    box-shadow: 0px 10px 30px rgba(24,174,138,0.2);
  }

  span {
    margin-right: 10px;
  }
`

const LoginButton = ({handleClick, isDisabled, buttonText}) => {
  return (
    <Button 
      onClick={handleClick} 
      disabled={isDisabled}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span>{buttonText}</span>
      <Icon icon={GoogleIcon} width='18px' height='18px' />
    </Button>
  )
}

export default LoginButton

