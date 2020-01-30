import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'

import LeftIcon from '../assets/arrow-left.svg'
import Icon from '../components/Icon'
import ChannelList from '../components/ChannelList'
// import ChannelListItem from '../components/ChannelListItem'
import ChannelSelector from '../components/ChannelSelector'
import HintBox from '../components/HintBox'

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

const PageName = styled.h3`
  font-size: 15px;
  color: #f1f1f1;
`

const SelectorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 10px;
`

const MainContainer = styled.div`
  margin-top: 60px;
`

const Button = styled(Link)`
  padding: 8px 15px;
  border-radius: 3px;
  border: 1px solid rgba(255,255,255,0.6);
  background: #0c2461;
  color: #f1f1f1;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
`

const EditPage = ({ subscriptions, themes, addChannel, removeChannel, deleteTheme, user, location }) => {
  // active theme Id from params
  const { themeId } = useParams()

  // active theme name from route state
  const { themeName } = location.state

  // object { value, label } (user input)
  const [selectedChannel, setSelectedChannel] = useState('')

  // index of active theme
  const activeThemeIndex = themes.findIndex(t => t.id === themeId)

  // selector options
  const setOptions = () => {
    return subscriptions 
      ? subscriptions.map(x => {
          return { value: x.snippet.resourceId.channelId, label: x.snippet.title }
        })
      : []
  }
  const options = setOptions()

  // check if the selectedChannel exists in active theme
  const isValidInput = () => {
    const exists = options.find(c => c.value === selectedChannel.value)
    return exists ? true : false
  }

  // user input handler
  const handleChange = (channel) => {
    if (channel === null) {
      setSelectedChannel('')
    } else {
      setSelectedChannel(channel)
    }
  }

  // deleting active theme from DB
  const handleThemeDelete = () => {
    deleteTheme({
      variables: {
        id: user.id,
        themeId: themeId
      }
    })
  }

  // adding selected channel to active theme in DB
  const handleAdd = () => {
    if (selectedChannel.value && isValidInput()) {
      const chan = subscriptions.find(c => c.snippet.resourceId.channelId === selectedChannel.value)
      addChannel({
        variables: {
          id: user.id,
          themeId: themeId,
          channelId: chan.snippet.resourceId.channelId,
          channelName: chan.snippet.title
        }
      })
      setSelectedChannel('')
    }
  }

  // remove current target channel from active theme in DB
  const handleRemove = (e) => {
    const chanId = e.currentTarget.getAttribute('data-id')
    removeChannel({
      variables: {
        id: user.id,
        themeId: themeId,
        channelId: chanId
      }
    })
  }

  return (
    <Container>
      <Header>
        <Link to={{ pathname: `/theme/${themeId}`, state: { themeName: themeName } }}>
          <Icon icon={LeftIcon} name='back to menu arrow' />
        </Link>
        <PageName>Editing: {themeName.toUpperCase()}</PageName>
        <Button onClick={handleThemeDelete} to="/">Delete</Button>
      </Header>
      <MainContainer>
        { 
          options && options.length > 0
            ? <SelectorContainer>
                <ChannelSelector
                  options={options}
                  handleChange={handleChange}
                  handleAdd={handleAdd}
                  isValidInput={isValidInput}
                /> 
              </SelectorContainer>
            : <HintBox>
                <p>It seems you're not subscribed to any Youtube channel on this account.</p>
              </HintBox>
        }
        {
          themes[activeThemeIndex].channels &&
            <ChannelList
              channels={themes[activeThemeIndex].channels}
              handleRemove={handleRemove}
            />
        }
      </MainContainer>
    </Container>
  )
}

export default EditPage