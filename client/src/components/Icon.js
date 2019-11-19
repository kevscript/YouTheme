import React from 'react'
import styled from 'styled-components'

const IconContainer = styled.div`
  cursor: pointer;
  width: 15px;
  height: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:not(:last-child) {
    margin-right: 15px;
  }
`

const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

const Icon = ({handleOnClick, icon, name}) => {
  return (
    <IconContainer onClick={handleOnClick}>
      <Img src={icon} alt={name} />
    </IconContainer>
  )
}

export default Icon