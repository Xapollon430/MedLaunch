import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('clinical route renders coming soon content', async () => {
  const user = userEvent.setup()

  window.history.pushState({}, '', '/provider-performance')
  render(<App />)

  await user.click(screen.getByRole('button', { name: /Open menu/i }))
  await user.click(screen.getByRole('link', { name: /Clinical Dashboard/i }))

  expect(await screen.findByRole('heading', { level: 2, name: /Clinical Dashboard/i })).toBeInTheDocument()
  expect(screen.getByText(/Coming soon/i)).toBeInTheDocument()
})
