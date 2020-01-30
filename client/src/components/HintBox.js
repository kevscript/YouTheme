import React from 'react'
import styled from 'styled-components'

const BoxContainer = styled.div`
  width: 100%;
  color: rgba(12,35,87,1);
  background: rgba(24,174,138,0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const HintBox = ({ children }) => {
  return (
    <BoxContainer>
      { children }
    </BoxContainer>
  )
}

export default HintBox