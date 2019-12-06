import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import LeftIcon from '../assets/arrow-left.svg'
import Icon from '../components/Icon'
import VideoItem from '../components/VideoItem'

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  width: 100%;
  height: 60px;
  background: #0c2461;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  position: fixed;
  top: 0;
`

const MainContainer = styled.div`
  width: 100%;
  margin: 60px auto 0;
`

const PageName = styled.h3`
  margin-left: 15px;
  font-size: 20px;
  color: #f1f1f1;
`

const StyledLink = styled(Link)`
  color: #f1f1f1;
`

const VideosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 25px 0;
`

const VideosGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 30px;
`

const ThemePage = ({ user, themes, location }) => {
  const { themeId } = useParams()
  const { themeName } = location.state

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('')

  useEffect(() => {
    if (themeId) {
      try {
        const activeThemeIndex = themes.findIndex(t => t.id === themeId)
        const activeTheme = themes[activeThemeIndex]
        const channelIds = activeTheme.channels.map(c => c.channelId)
        if (channelIds.length > 0) {
          setLoading(true)
          setLoadingMessage('Loading...')
          const promises = channelIds.map(id => axios.get(`/api/${id}/5`).then(res => res.data))
          Promise.all(promises)
            .then(data => {
              console.log(data)
              setVideos(data)
              setLoading(false)
            })
        } else {
          setLoadingMessage('No videos in feed yet, edit Theme & select channels')
        }
      } catch (err) { console.log(err) }
    } else {
      setLoadingMessage('Error no theme')
    }
  }, [])

  return (
    <Container>
      <Header>
        <Link to="/">
          <Icon icon={LeftIcon} name='back to menu arrow' />
        </Link>
        <PageName>{themeName}</PageName>
        <StyledLink to={{ pathname: `/edit/${themeId}`, state: { themeName: themeName } }}>Edit</StyledLink>
      </Header>
      <MainContainer>
        <VideosContainer>
          {loading
            ? <p>{loadingMessage}</p>
            : <VideosGrid>
              {videos && videos.map(channel => {
                return channel.items.map(item =>
                  <VideoItem key={item.id.videoId} item={item} />
                )
              })}
            </VideosGrid>
          }
        </VideosContainer>
      </MainContainer>
    </Container>
  )
}

export default ThemePage