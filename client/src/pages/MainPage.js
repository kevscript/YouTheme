import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import LogoutButton from '../components/LogoutButton'
import { CLIENT_ID } from '../config'

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

const SideElement = styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const MainPage = ({handleLogout}) => {

  const logoutSuccess = (response) => {
    console.log('logout response', response)
    handleLogout(null)
  }

  return (
    <Container>
      <Header>
        <SideElement>
          <LogoutButton clientId={CLIENT_ID} onLogoutSuccess={logoutSuccess} /> 
        </SideElement>
        <PageName>Themes</PageName>
        <SideElement>
          <Link to="/edit">Edit</Link>
        </SideElement>
      </Header>
      <div>
        <ThemesGrid>
          <GridItem to="/feed">All Themes</GridItem>
        </ThemesGrid>
      </div>
    </Container>
  )
}

export default MainPage