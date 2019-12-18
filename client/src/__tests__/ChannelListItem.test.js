import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import ChannelListItem from '../components/ChannelListItem'

describe('The ChannelLIstItem component', () => {

  test('it should render correctly', () => {
    const props = {
      channel: { channelName: 'NameChan', channelId: '1337' },
      handleRemove: jest.fn()
    }
    const { getByText, getByTestId, getByRole } = render(<ChannelListItem {...props} />)

    expect(getByTestId('item-container')).toBeInTheDocument()
    expect(getByText(props.channel.channelName)).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()

    fireEvent.click(getByRole('button'))
    expect(props.handleRemove).toHaveBeenCalled()
  })

})