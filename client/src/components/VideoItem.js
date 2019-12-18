import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
`

const VideoTitle = styled.span`
  font-size: 15px;
  color: rgba(12,35,87,1);
  font-weight: 500;
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
    <ItemContainer data-testid="item-container">
      <ThumbContainer 
        data-testid="thumb-container"
        onClick={() => setOpenVideo(true)}
      >
        <Thumb src={item.snippet.thumbnails.medium.url} data-testid="thumb-image"/>
      </ThumbContainer>
      <TextContainer onClick={() => setOpenVideo(true)}>
        <Title>
          <VideoTitle>{item.snippet.title}</VideoTitle> 
          - 
          <ChannelTitle>{item.snippet.channelTitle}</ChannelTitle>
        </Title>
      </TextContainer>
      { openVideo && 
        <VideoPlayer 
          id={item.id.videoId}
          videoRef={videoRef} 
          handleVideo={handleVideo} 
          data-testid="item-player"
        />
      }
    </ItemContainer>
  )
}

VideoItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default VideoItem