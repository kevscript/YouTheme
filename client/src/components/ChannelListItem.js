import React from 'react'
import styled from 'styled-components'

const Item = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  border-top: 1px solid #eee;
`

const ChannelListItem = ({ channel, handleRemove }) => {
  return (
    <Item>
      <span>{channel.channelName}</span>
      <button data-id={channel.channelId} onClick={handleRemove}>X</button>
    </Item>
  )
}

export default ChannelListItem
