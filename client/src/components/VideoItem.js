import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import VideoPlayer from './VideoPlayer'

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  cursor: pointer;
`

const ThumbContainer = styled.a`
  max-width: 320px;
  height: auto;
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
  border-radius: 3px;
`

const Title = styled.div`
  margin-top: 5px;
  font-weight: 500;
  font-size: 15px;
  color: rgba(12,35,87,1);
`

const ChannelTitle = styled.span`
  font-weight: 400;
  color: #333;
  font-size: 15px;
  color: rgba(24,174,138,1);
`

const TextContainer = styled.div`
  width: 320px;
`

const VideoItem = ({ item }) => {

  const videoRef = useRef()
  const [openVideo, setOpenVideo] = useState(false)

  const handleVideo = (e) => {
    if (openVideo && videoRef.current === e.target) {
      setOpenVideo(false)
    }
  }

  return (
    <ItemContainer>
      <ThumbContainer 
        onClick={() => setOpenVideo(true)}
      >
        <Thumb src={item.snippet.thumbnails.medium.url} />
      </ThumbContainer>
      <TextContainer onClick={() => setOpenVideo(true)}>
        <Title>
          {item.snippet.title} 
          <ChannelTitle> - {item.snippet.channelTitle}</ChannelTitle>
        </Title>
      </TextContainer>
      { openVideo && 
        <VideoPlayer 
          id={item.id.videoId}
          videoRef={videoRef} 
          handleVideo={handleVideo} 
        />
      }
    </ItemContainer>
  )
}

export default VideoItem