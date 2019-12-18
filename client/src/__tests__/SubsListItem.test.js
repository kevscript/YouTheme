import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import SubsListItem from '../components/SubsListItem'

describe('The SubsListItem component', () => {

  test('it should render correctly', () => {
    const props = {
      channel: {
        snippet: {
          title: 'Title',
          thumbnails: { default: { url: 'http://test.url' } }
        }
      }
    }
    const { getByText } = render(<SubsListItem {...props} />)

    expect(getByText(props.channel.snippet.title)).toBeInTheDocument()
  })

})