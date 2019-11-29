import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import LogoutButton from '../components/LogoutButton'

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

const Menu = styled.div`
  display: flex;
`

const MenuItem = styled.li`
  cursor: pointer;
  margin: 0 0 0 10px;
`

const PageName = styled.h3`
  font-size: 26px;
`

const ThemesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 120px;
  grid-gap: 10px;
  padding: 10px;
`

const GridItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
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

const MainPage = ({handleLogout, themes, handleThemeCreation}) => {

  const [themeInput, setThemeInput] = useState('')

  return (
    <Container>
      <Header>
        <PageName>Dashboard</PageName>
        <Menu>
          <MenuItem>
            <Link to="/subscriptions">Channels</Link>
          </MenuItem>
          <MenuItem>
            <LogoutButton onLogoutSuccess={handleLogout} /> 
          </MenuItem>
        </Menu>
      </Header>
      <div>
        <InputContainer>
          <Input type="text" value={themeInput} onChange={e => setThemeInput(e.target.value)} placeholder="New theme name"/>
          <InputButton onClick={() => handleThemeCreation(themeInput)}>Create</InputButton>
        </InputContainer>
        <ThemesGrid>
          <GridItem to={{ pathname: `/theme/all`, state: {themeName: 'All Themes'} }}>All Themes</GridItem>
          {themes && themes.map(theme => 
            <GridItem to={{ pathname: `/theme/${theme.id}`, state: {themeName: theme.name} }} key={theme.id}>{theme.name}</GridItem>
          )}
        </ThemesGrid>
      </div>
    </Container>
  )
}

export default MainPage