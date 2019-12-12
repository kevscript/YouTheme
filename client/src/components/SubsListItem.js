import React from 'react'
import styled from 'styled-components'

import Icon from './Icon'

const Item = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  height: 40px;

  :not(:first-child) {
    border-top: 1px solid rgba(12,35,87,0.6);
  }
`

const Name = styled.span`
  margin-left: 10px;
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
    </Item>
  )
}

export default SubsListItem