import { render, screen } from '@testing-library/react'
import App from '../App'

test('shows provider performance title on default route', async () => {
  render(<App />)
  expect(screen.getByText(/Medlaunch by Oakwin/i)).toHaveClass('text-lg')
  expect(await screen.findByRole('heading', { level: 1, name: /Provider Performance/i })).toBeInTheDocument()
})
