import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Icon from '../components/Icon'
import GoogleIcon from '../assets/google.svg'

describe('The Icon component', () => {

  test('should render correctly based on props', () => {
    const props = {
      handleOnClick: jest.fn(),
      width: '20px',
      height: '20px',
      icon: GoogleIcon,
      name: 'its a google Icon'
    }
    const { queryByTestId, getByTestId } = render(<Icon circle {...props} />)

    fireEvent.click(getByTestId('icon-container'))

    expect(queryByTestId('icon-container')).toBeInTheDocument()
    expect(queryByTestId('icon-container')).toHaveStyle(`width: ${props.width}`)
    expect(queryByTestId('icon-container')).toHaveStyle(`height: ${props.height}`)
    expect(queryByTestId('icon-container')).toHaveStyle(`border-radius: 50%`)
    expect(props.handleOnClick).toHaveBeenCalled()

    expect(queryByTestId('icon-image')).toBeInTheDocument()
    expect(queryByTestId('icon-image')).toHaveAttribute('alt', props.name)
    expect(queryByTestId('icon-image')).toHaveAttribute('src', props.icon)

  })

  test('should use default styling values without styling props', () => {
    const { queryByTestId } = render(<Icon />)

    expect(queryByTestId('icon-container')).toBeInTheDocument()
    expect(queryByTestId('icon-container')).toHaveStyle(`width: 15px`)
    expect(queryByTestId('icon-container')).toHaveStyle(`height: 15px`)
    expect(queryByTestId('icon-container')).toHaveStyle(`border-radius: 0`)
  })

})