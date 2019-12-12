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
  background: linear-gradient(90deg, rgba(24,174,138,1) 0%, rgba(12,35,87,1) 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  position: fixed;
  top: 0;
  z-index: 99;
`

const PageName = styled.h3`
  margin-left: 15px;
  font-size: 18px;
  color: #f1f1f1;
`

const Button = styled.button`
  padding: 8px 15px;
  border-radius: 3px;
  border: 1px solid rgba(255,255,255,0.6);
  background: transparent;
  color: #f1f1f1;
  font-weight: 600;
  cursor: pointer;
`

const List = styled.ul`
  margin-top: 60px;
  text-align: center;
`


const SubsPage = ({subscriptions, handleReload}) => {
  return (
    <Container>
      <Header>
        <Link to="/">
          <Icon icon={LeftIcon} name='back to main page arrow' />
        </Link>
        <PageName>Subscribed To</PageName>
        <Button onClick={handleReload}>Reload</Button>
      </Header>
      <List>
        {subscriptions && subscriptions.map(channel => <SubsListItem  key={channel.id} channel={channel} />)}
        {!subscriptions && <p>This google account isn't subscribed to any Youtube channel. Subscribe and Reload.</p>}
      </List>
    </Container>
  )
}

export default SubsPage