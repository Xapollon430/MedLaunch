import { render, screen } from '@testing-library/react'
import App from '../App'

const routes = [
  '/provider-performance',
  '/provider-rankings',
  '/financial',
  '/operational',
  '/clinical',
  '/data-sources',
]

test.each(routes)('renders shell on %s', (route) => {
  window.history.pushState({}, '', route)
  render(<App />)
  expect(screen.getByRole('navigation')).toBeInTheDocument()
})
