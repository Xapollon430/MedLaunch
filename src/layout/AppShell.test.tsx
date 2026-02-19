import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('shows provider performance title on default route', async () => {
  render(<App />)
  expect(screen.getByText(/Medlaunch by Oakwin/i)).toHaveClass('text-lg')
  expect(await screen.findByRole('heading', { level: 1, name: /Provider Performance/i })).toBeInTheDocument()
})

test('toggles dark mode class from navbar button', async () => {
  const user = userEvent.setup()
  window.localStorage.clear()

  render(<App />)

  await user.click(screen.getByRole('button', { name: /switch to dark mode/i }))
  expect(document.documentElement).toHaveClass('dark')
})
