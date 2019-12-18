import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import LoginButton from '../components/LoginButton'

describe('The LoginButton component', () => {

  test('it renders correctly based on props', () => {
    const props = {
      handleClick: jest.fn(),
      isDisabled: false,
      buttonText: 'New Name'
    }
    const { queryByTestId, getByText, getByTestId } = render(<LoginButton {...props} />)

    fireEvent.click(getByTestId('button'))

    expect(queryByTestId('button')).toBeInTheDocument()
    expect(getByText(props.buttonText)).toBeInTheDocument()
    expect(queryByTestId('button')).not.toHaveAttribute('disabled')
    expect(props.handleClick).toHaveBeenCalled()
  })

  test('it should be disabled when isDisabled = true', () => {
    const props = { isDisabled: true }
    const { queryByTestId } = render(<LoginButton {...props} />)

    expect(queryByTestId('button')).toBeInTheDocument()
    expect(queryByTestId('button')).toHaveAttribute('disabled')
  })

  test('it should render with default values when no props', () => {
    const { queryByTestId, getByText } = render(<LoginButton />)

    expect(queryByTestId('button')).toBeInTheDocument()
    expect(queryByTestId('button')).not.toHaveAttribute('disabled')
    expect(getByText('Login')).toBeInTheDocument()
  })

})