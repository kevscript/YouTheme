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
  background: #535353;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
`

const PrevPage = styled.div`
  display: flex;
  align-items: center;
`

const PageName = styled.h3`
  margin-left: 25px;
  font-size: 26px;
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
        <PrevPage>
          <Link to="/">
            <Icon icon={LeftIcon} name='back to menu arrow' />
          </Link>
          <PageName>{themeName}</PageName>
        </PrevPage>
        <Link to={{ pathname: `/edit/${themeId}`, state: {themeName: themeName} }}>Edit</Link>
      </Header>
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
    </Container>
  )
}

export default ThemePage