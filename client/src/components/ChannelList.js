import React from 'react'
import ChannelListItem from './ChannelListItem'

const ChannelList = ({ channels, handleRemove }) => {
  return (
    <>
      {channels && channels.map(c =>
        <ChannelListItem
          key={c.channelId}
          channel={c}
          handleRemove={handleRemove}
        />
      )}
    </>
  )
}

export default ChannelList