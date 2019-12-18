import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Icon from './Icon'
import DeleteIcon from '../assets/delete.svg'

const Item = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  border-top: 1px solid #eee;
`

const ChannelName = styled.span`
  font-weight: 500;
  font-size: 15px;
`

const Button = styled.button`
  background: transparent;
  border: 0;
  outline: 0;
  padding: 10px;
`

const ChannelListItem = ({ channel, handleRemove }) => {
  return (
    <Item data-testid="item-container">
      <ChannelName>{channel.channelName}</ChannelName>
      <Button data-id={channel.channelId} onClick={handleRemove}>
        <Icon icon={DeleteIcon} width="10px" height="10px" name="delete icon" />
      </Button>
    </Item>
  )
}

ChannelListItem.propTypes = {
  channel: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default ChannelListItem
