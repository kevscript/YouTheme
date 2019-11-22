import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import LeftIcon from '../assets/arrow-left.svg'
import Icon from '../components/Icon'

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  width: 100%;
  height: 60px;
  background: #535353;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
`

const PrevPage = styled.div`
  display: flex;
  align-items: center;
`

const PageName = styled.h3`
  margin-left: 25px;
  font-size: 26px;
`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  padding: 10px;
  flex: 1;
`

const InputButton = styled.button`
  padding: 10px;
`

const EditPage = ({ themes, handleThemeCreation }) => {

  const [themeInput, setThemeInput] = useState('')

  return (
    <Container>
      <Header>
        <PrevPage>
          <Link to="/">
            <Icon icon={LeftIcon} name='back to menu arrow' />
          </Link>
          <PageName>Edit</PageName>
        </PrevPage>
        <Link to="/subscriptions">Subscriptions</Link>
      </Header>
      <InputContainer>
        <Input type="text" value={themeInput} onChange={e => setThemeInput(e.target.value)} placeholder="New theme name"/>
        <InputButton onClick={() => handleThemeCreation(themeInput)}>Create Theme</InputButton>
      </InputContainer>
      <div>
        {themes && themes.map(theme => <li key={theme.id}>{theme.name}</li>)}
      </div>
    </Container>
  )
}

export default EditPage