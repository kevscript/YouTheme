import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login';
import LogoutButton from '../components/LogoutButton'
import ThemeItem from '../components/ThemeItem'
import ThemeInput from '../components/ThemeInput'

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  width: 100%;
  height: 60px;
  background: linear-gradient(90deg, rgba(12,35,87,1) 0%, rgba(24,174,138,1) 100%);
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
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  color: #f1f1f1;
  font-size: 20px;
  font-weight: 600;
  background: rgba(12,35,87,1);
  transition: all 0.3s ease-out;

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

  :hover {
    background: rgba(24,174,138,1);
    transition: all 0.3s ease-out;
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
  background: linear-gradient(90deg, rgba(12,35,87,1) 0%, rgba(24,174,138,1) 100%);
`

const MainPage = ({ handleLogout, themes, handleThemeCreation }) => {

  const [themeInput, setThemeInput] = useState('')

  const handleInput = (input) => setThemeInput(input)

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
              clientId={process.env.REACT_APP_CLIENT_ID}
              render={renderProps => (
                <LogoutButton 
                  handleClick={renderProps.onClick} 
                  isDisabled={renderProps.disabled} 
                  buttonText="Sign Out"
                />
              )}
              onLogoutSuccess={handleLogout}
            />
          </MenuItem>
        </Menu>
      </Header>
      <MainContainer>
        <ThemesGrid>
          {themes && themes.map(theme =>
            <GridItem 
              key={theme.id}
              to={{ pathname: `/theme/${theme.id}`, state: { themeName: theme.name } }}
            >
              <ThemeItem theme={theme} />
            </GridItem>
          )}
        </ThemesGrid>
      </MainContainer>
      <InputContainer>
        <ThemeInput 
          themeInput={themeInput}
          handleInput={handleInput}
          handleThemeCreation={handleThemeCreation}
        />
      </InputContainer>
    </Container>
  )
}

export default MainPage