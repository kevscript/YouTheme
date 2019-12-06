import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { API_KEY } from '../config'

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
  margin-top: 60px;
  padding: 5px 0;
`

const PageName = styled.h3`
  margin-left: 15px;
  font-size: 20px;
  color: #f1f1f1;
`

const StyledLink = styled(Link)`
  color: #f1f1f1;
`

const VideosGrid = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 25px;
  margin: 25px auto;
`

const ThemePage = ({user, themes, location}) => {
  const { themeId } = useParams()
  const { themeName } = location.state
  
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(themeId) {
      setLoading(true)
      try {
        const activeThemeIndex = themes.findIndex(t => t.id === themeId)
        const activeTheme = themes[activeThemeIndex]
        const channelIds = activeTheme.channels.map(c => c.channelId)
        if (channelIds.length > 0) {
          const promises = channelIds.map(id => {
            return fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${id}&part=snippet,id&order=date&maxResults=5`)
              .then(res => res.json())
              .then(res => res)
          })
          Promise.all(promises)
            .then(data => {
              console.log(data)
              setVideos(data)
              setLoading(false)
            })
        }
      } catch(err) { console.log(err) }
    }
  }, [])

  return (
    <Container>
      <Header>
        <Link to="/">
          <Icon icon={LeftIcon} name='back to menu arrow' />
        </Link>
        <PageName>{themeName}</PageName>
        <StyledLink to={{ pathname: `/edit/${themeId}`, state: {themeName: themeName} }}>Edit</StyledLink>
      </Header>
      <MainContainer>
        {loading 
          ? <h1>Loading...</h1>
          : <VideosGrid>
              {videos && videos.map(channel => {
                return channel.items.map(item => 
                  <VideoItem key={item.id.videoId} item={item} />
                )
              })}
            </VideosGrid>
        }
      </MainContainer>
    </Container>
  )
}

export default ThemePage