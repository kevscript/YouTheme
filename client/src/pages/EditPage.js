import React, { useState } from 'react'
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

const EditPage = ({ subscriptions, themes, addChannel, removeChannel, user, location }) => {
  const { themeId } = useParams()
  const { themeName } = location.state
  const [channelInput, setChannelInput] = useState('')
  const activeThemeIndex = themes.findIndex(t => t.id === themeId) 

  const filteredChannels = () => {
    return subscriptions.filter(x => x.snippet.title.toLowerCase().includes(channelInput.toLowerCase()))
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setChannelInput(e.target.value)
  } 

  const handleAdd = () => {
    if (channelInput) {
      const channel = subscriptions.find(c => c.snippet.title === channelInput)
      if (channel) {
        addChannel({ variables: {
          id: user.id,
          themeId: themeId,
          channelId: channel.snippet.resourceId.channelId,
          channelName: channel.snippet.title
        }})
      }
    }
  }

  const handleRemove = (e) => {
    const chanId = e.currentTarget.getAttribute('data-id')
    removeChannel({ variables: {
      id: user.id,
      themeId: themeId,
      channelId: chanId
    }})
  }

  return (
    <Container>
      <Header>
        <PrevPage>
          <Link to="/">
            <Icon icon={LeftIcon} name='back to menu arrow' />
          </Link>
          <PageName>Editing: {themeName}</PageName>
        </PrevPage>
      </Header>
      <div>
        <InputContainer>
          <Input 
            type="text" 
            list="selected-channel"
            onChange={handleChange} 
            value={channelInput} 
            placeholder='Find channel'
          />
          <InputButton onClick={handleAdd}>Add</InputButton>
          <datalist id="selected-channel">
            {filteredChannels().map(channel => 
              <option key={channel.id} value={channel.snippet.title} data-id={channel.id} />
            )}
          </datalist>
        </InputContainer>
        <div>
          {themes[activeThemeIndex].channels && themes[activeThemeIndex].channels.map(c => 
            <li key={c.channelId}>
              <span>{c.channelName}</span>
              <button data-id={c.channelId} onClick={handleRemove}>X</button>
            </li>
          )}
        </div>
      </div>
    </Container>
  )
}

export default EditPage