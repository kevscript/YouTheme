import React from 'react'
import styled from 'styled-components'

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ThumbContainer = styled.a`
  width: 100%;
  height: auto;
  cursor: pointer;
`

const Thumb = styled.img`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.span`
  margin-top: 5px;
  font-weight: 500;
`

const ChannelTitle = styled.span`
  font-weight: 400;
  color: #333;
`


const VideoItem = ({ item }) => {

  return (
    <ItemContainer>
      <ThumbContainer 
        href={`https://www.youtube.com/watch?v=${item.id.videoId ? item.id.videoId : item.id.playlistId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Thumb src={item.snippet.thumbnails.medium.url} />
      </ThumbContainer>
      <Title>
        {item.snippet.title} 
        <ChannelTitle> - {item.snippet.channelTitle}</ChannelTitle>
      </Title>
    </ItemContainer>
  )
}

export default VideoItem