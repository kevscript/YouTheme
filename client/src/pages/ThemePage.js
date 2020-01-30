import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import useFetchVideos from '../hooks/useFetchVideos'
import LeftIcon from '../assets/arrow-left.svg'
import Icon from '../components/Icon'
import VideoItem from '../components/VideoItem'
import HintBox from '../components/HintBox'

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  width: 100%;
  height: 60px;
  background: linear-gradient(90deg, rgba(24,174,138,1) 0%, rgba(12,35,87,1) 100%);
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
  text-align: center;
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

const LoadingMessage = styled.p`
  margin: 80px 0;
  font-size: 15px;
  color: rgba(24,174,138,1);
`

const ThemePage = ({ themes, location }) => {
  const { themeId } = useParams()
  const { themeName } = location.state
  const { data, isLoading, error } = useFetchVideos(themes, themeId, 5)
  
  const sortVideos = (channels) => {
    let arr = []
    if (channels) {
      channels.map(chan => arr = [...arr, ...chan.items])
      return arr.sort((a, b) => a.snippet.publishedAt < b.snippet.publishedAt ? 1 : -1)
    } else {
      return arr
    }
  }

  return (
    <Container>
      <Header>
        <Link to="/">
          <Icon icon={LeftIcon} name='back to menu arrow' />
        </Link>
        <PageName>{themeName.toUpperCase()}</PageName>
        <StyledLink to={{ pathname: `/edit/${themeId}`, state: { themeName: themeName } }}>Edit</StyledLink>
      </Header>
      <MainContainer>
        { error && <HintBox><p>{error}</p></HintBox> }
        { isLoading && !data && <LoadingMessage>Loading...</LoadingMessage> }
        <VideosContainer>
            { data && data.length > 0 && !error &&
              <VideosGrid>
                {sortVideos(data).map(vid => <VideoItem key={vid.id.videoId} item={vid} />)}
              </VideosGrid>            
            }
        </VideosContainer>
      </MainContainer>
    </Container>
  )
}

export default ThemePage