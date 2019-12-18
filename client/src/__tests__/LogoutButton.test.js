import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import LogoutButton from '../components/LogoutButton'

describe('The LogoutButton component', () => {

  test('it renders corrrectly with props', () => {
    const props = {
      handleClick: jest.fn(),
      isDisabled: null,
      buttonText: 'Google Sign Out'
    }
    const { queryByTestId, getByTestId, getByText } = render(<LogoutButton {...props} />)

    fireEvent.click(getByTestId('button'))

    expect(queryByTestId('button')).toBeInTheDocument()
    expect(props.handleClick).toHaveBeenCalled()
    expect(getByText(props.buttonText)).toBeInTheDocument()
  })

  test('it should be disabled when isDisabled prop is true', () => {
    const props = { isDisabled: true }
    const { queryByTestId } = render(<LogoutButton {...props} />)

    expect(queryByTestId('button')).toBeInTheDocument()
    expect(queryByTestId('button')).toHaveAttribute('disabled')

  })

})