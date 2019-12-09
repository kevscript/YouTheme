import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login';
import LogoutButton from '../components/LogoutButton'

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  width: 100%;
  height: 60px;
  background: #0c2461;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  position: fixed;
  top: 0;
`

const Menu = styled.div`
  display: flex;
`

const MenuItem = styled.li`
  cursor: pointer;
  margin: 0 0 0 20px;
  color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const PageName = styled.h3`
  font-size: 18px;
  color: #f1f1f1;
`

const MainContainer = styled.div`
  margin: 60px 0;
`

const ThemesGrid = styled.div`
  grid-auto-rows: 120px;
  padding: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
`

const GridItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid rgba(12, 36, 97, 0.8);
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  color: rgba(12, 36, 97, 0.8);
  font-size: 20px;
  font-weight: 600;

  h3 {
    font-family: -apple-system,BlinkMacSystemFont,"Roboto","Segoe UI","Open Sans","Oxygen", "Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue", sans-serif;
    text-transform: uppercase;
    font-size: 20px;
    letter-spacing: 0.5px;
  }

  span {
    font-size: 12px;
    font-weight: 400;
  }
`

const InputContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: white;
`

const Input = styled.input`
  padding: 10px;
  flex: 1;
  font-size: 15px;
  height: 40px;
  border-radius: 3px 0 0 3px;
  border: 1px solid #0c2461;
  background: #f1f1f1;
  z-index: 99;
`

const InputButton = styled.button`
  padding: 10px 20px;
  font-size: 15px;
  background: #0c2461;
  height: 40px;
  color: #f1f1f1;
  border: 1px solid #0c2461;
  border-radius: 0 3px 3px 0;
  font-weight: 500;
`

const MainPage = ({handleLogout, themes, handleThemeCreation}) => {

  const [themeInput, setThemeInput] = useState('')

  return (
    <Container>
      <Header>
        <PageName>Themes</PageName>
        <Menu>
          <MenuItem>
            <StyledLink to="/subscriptions">Channels</StyledLink>
          </MenuItem>
          <MenuItem>
          <GoogleLogout
            clientId="860965179748-qcf7gj67it0l2c5f4hc7kvuinojkurkd.apps.googleusercontent.com"
            render={renderProps => (
              <LogoutButton handleClick={renderProps.onClick} isDisabled={renderProps.disabled} buttonText="Sign Out" />
            )}
            onLogoutSuccess={handleLogout}
          />
          </MenuItem>
        </Menu>
      </Header>
      <MainContainer>
        <ThemesGrid>
          {themes && themes.map(theme => 
            <GridItem to={{ pathname: `/theme/${theme.id}`, state: {themeName: theme.name} }} key={theme.id}>
              <h3>{theme.name}</h3>
              <span>channels: {theme.channels ? theme.channels.length : 0}</span>
            </GridItem>
          )}
        </ThemesGrid>
      </MainContainer>
      <InputContainer>
        <Input type="text" value={themeInput} onChange={e => setThemeInput(e.target.value)} placeholder="New Theme Name"/>
        <InputButton onClick={() => handleThemeCreation(themeInput)}>Create</InputButton>
      </InputContainer>
    </Container>
  )
}

export default MainPage