import React from 'react'
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

const SubsPage = ({subscriptions, getSubscriptions}) => {
  return (
    <Container>
      <Header>
        <PrevPage>
          <Link to="/edit">
            <Icon icon={LeftIcon} name='back to edit page arrow' />
          </Link>
          <PageName>Subscriptions</PageName>
        </PrevPage>
        <button onClick={getSubscriptions}>Reload</button>
      </Header>
      <ul>
        {subscriptions && subscriptions.map(channel => <li key={channel.id}>{channel.snippet.title}</li> )}
      </ul>
    </Container>
  )
}

export default SubsPage