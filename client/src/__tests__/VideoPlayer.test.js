import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Player } from '../components/VideoPlayer'

describe('The Player component', () => {

  test('it should render correctly with props', () => {
    const props = {
      handleVideo: jest.fn(),
      id: '1337',
      videoRef: { current: <Player id='1337' /> }
    }
    const { queryByTestId, getByTestId } = render(<Player {...props} />)

    fireEvent.click(getByTestId('player-container'))

    expect(queryByTestId('player-container')).toBeInTheDocument()
    expect(queryByTestId('player')).toBeInTheDocument()
    expect(props.handleVideo).toHaveBeenCalled()
    expect(queryByTestId('player'))
      .toHaveAttribute('src', `https://www.youtube.com/embed/${props.id}`)
  })

})