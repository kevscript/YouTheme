import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import LeftIcon from '../assets/arrow-left.svg'
import Icon from '../components/Icon'
import SubsListItem from '../components/SubsListItem'

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

const SubsPage = ({subscriptions, handleReload}) => {
  return (
    <Container>
      <Header>
        <PrevPage>
          <Link to="/">
            <Icon icon={LeftIcon} name='back to main page arrow' />
          </Link>
          <PageName>Subscribed Channels</PageName>
        </PrevPage>
        <button onClick={handleReload}>Reload</button>
      </Header>
      <ul>
        {subscriptions && subscriptions.map(channel => <SubsListItem  key={channel.id} channel={channel} />)}
      </ul>
    </Container>
  )
}

export default SubsPage