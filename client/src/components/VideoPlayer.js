import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const PlayerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  z-index: 999;
`

const Player = styled.iframe`
  width: 95%;
  max-width: 1280px;
  height: 720px;

  @media (max-width: 450px) {
    width: 100%;
    max-width: 450px;
    height: 254px;
  }

  @media (max-width: 768px) {
    width: 95%;
    max-width: 640px;
    height: 360px;
  }
`

const VideoPlayer = ({ id, videoRef, handleVideo }) => {
  return ReactDOM.createPortal(
    <PlayerContainer onClick={handleVideo} ref={videoRef}>
      <Player
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </PlayerContainer>,
    document.getElementById('portal-root')
  )
}

export default VideoPlayer