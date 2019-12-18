import React from 'react'
import styled from 'styled-components'

const IconContainer = styled.div`
  cursor: pointer;
  width: ${props => props.width ? props.width : '15px'};
  height: ${props => props.height ? props.height : '15px'};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:not(:last-child) {
    margin-right: 15px;
  }
  border-radius: ${props => props.circle ? '50%' : '0'};
  overflow: hidden;
`

const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

const Icon = ({ handleOnClick, icon, name, width, height, circle }) => {
  return (
    <IconContainer 
      onClick={handleOnClick} 
      width={width} 
      height={height} 
      circle={circle}
      data-testid='icon-container'
    >
      <Img src={icon} alt={name}  data-testid='icon-image'/>
    </IconContainer>
  )
}

export default Icon