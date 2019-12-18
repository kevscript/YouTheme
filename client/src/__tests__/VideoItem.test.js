import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import VideoItem from '../components/VideoItem'


describe('The VideoItem component', () => {

  test('should render correctly', () => {
    const props = {
      item: {
        id: { videoId: '1337' },
        snippet: {
          title: 'Video Title',
          channelTitle: 'Channel Title',
          thumbnails: { medium: { url: 'http://test.url' } }
        }
      }
    }

    const { getByTestId, queryByTestId, getByText } = render(<VideoItem {...props} />)

    expect(getByTestId('item-container')).toBeInTheDocument()
    expect(getByTestId('thumb-container')).toBeInTheDocument()
    expect(getByTestId('thumb-image')).toBeInTheDocument()
    expect(getByTestId('thumb-image'))
      .toHaveAttribute('src', props.item.snippet.thumbnails.medium.url)
    expect(getByText(props.item.snippet.title)).toBeInTheDocument()
    expect(getByText(props.item.snippet.channelTitle)).toBeInTheDocument()
    expect(queryByTestId('item-player')).not.toBeInTheDocument()
  })

})