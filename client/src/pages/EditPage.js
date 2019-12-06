import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useParams, Redirect } from 'react-router-dom'

import LeftIcon from '../assets/arrow-left.svg'
import Icon from '../components/Icon'
import ChannelListItem from '../components/ChannelListItem'

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

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 10px;
`

const Input = styled.input`
  padding: 10px;
  flex: 1;
  font-size: 15px;
  height: 40px;
  border-radius: 3px 0 0 3px;
  border: 1px solid #0c2461;
  background: #f1f1f1;
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

  const handleThemeDelete = () => {
    deleteTheme({ variables: {
      id: user.id,
      themeId: themeId
    }})
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
        setChannelInput('')
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
      <Link to={`/`}>
        <Icon icon={LeftIcon} name='back to menu arrow' />
      </Link>
      <PageName>Editing: {themeName}</PageName>
      <Button onClick={handleThemeDelete} to="/">Delete</Button>
      </Header>
      <MainContainer>
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
              <option key={`option-${channel.id}`} value={channel.snippet.title} data-id={channel.id} />
            )}
          </datalist>
        </InputContainer>
        <div>
          {themes[activeThemeIndex].channels && themes[activeThemeIndex].channels.map(channel => 
            <ChannelListItem key={channel.id} channel={channel} handleRemove={handleRemove} />
          )}
        </div>
      </MainContainer>
    </Container>
  )
}

export default EditPage