import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'

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

const ThemePage = (props) => {
  const { themeId } = useParams()
  const { themeName } = props.location.state

  return (
    <Container>
      <Header>
        <PrevPage>
          <Link to="/">
            <Icon icon={LeftIcon} name='back to menu arrow' />
          </Link>
          <PageName>{themeName}</PageName>
        </PrevPage>
        <Link to="/edit">Edit</Link>
      </Header>
      Theme Page id : {themeId}
    </Container>
  )
}

export default ThemePage