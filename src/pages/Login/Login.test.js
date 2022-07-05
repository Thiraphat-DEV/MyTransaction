import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
import userEvent from '@testing-library/user-event'

  test('display placeholder email', () => {
    render(<Login />)
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
  })

  test('display placeholder password', () => {
    render(<Login />)
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
  })
  test('display button is visibled', async() => {
    render(<Login />)
    const handleClick = userEvent.click(screen.getByRole('button', {name: /Login/i}))
    expect(handleClick).toBeHaveBeenCalledWith('Login')
    await waitForElementToBeRemoved(() => screen.getByText('Login...'))
  })
