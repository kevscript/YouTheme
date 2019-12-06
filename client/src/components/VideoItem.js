import React from 'react'
import styled from 'styled-components'

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ThumbContainer = styled.a`
  max-width: 320px;
  height: auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Thumb = styled.img`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  margin-top: 5px;
  font-weight: 500;
  font-size: 15px;
`

const ChannelTitle = styled.span`
  font-weight: 400;
  color: #333;
  font-size: 15px;
`

const TextContainer = styled.div`
  width: 320px;
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
      <TextContainer>
        <Title>
          {item.snippet.title} 
          <ChannelTitle> - {item.snippet.channelTitle}</ChannelTitle>
        </Title>
      </TextContainer>
    </ItemContainer>
  )
}

export default VideoItem