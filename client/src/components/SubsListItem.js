import React from 'react'
import styled from 'styled-components'

import Icon from './Icon'

const Item = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  border-top: 1px solid #eee;
  height: 40px;
`

const Name = styled.span`
  margin-left: 10px;
`

const ChannelSubs = styled.span`

`

const SubsListItem = ({ channel }) => {
  return (
    <Item>
      <Icon
        icon={channel.snippet.thumbnails.default.url}
        width='30px'
        height='30px'
        circle
      />
      <Name>{channel.snippet.title}</Name>
      <ChannelSubs></ChannelSubs>
    </Item>
  )
}

export default SubsListItem