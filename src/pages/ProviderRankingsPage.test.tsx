import { render, screen } from '@testing-library/react'
import ProviderRankingsPage from './ProviderRankingsPage'

test('renders rankings charts for all metrics', () => {
  render(<ProviderRankingsPage />)

  expect(screen.getByText(/Total Patients Seen Year to Date/i)).toBeInTheDocument()
  expect(screen.getByText(/RVUs Year to Date/i)).toBeInTheDocument()
  expect(screen.getByText(/G2211 Codes Year to Date/i)).toBeInTheDocument()
  expect(screen.getByText(/Sleep Studies Year to Date/i)).toBeInTheDocument()
  expect(screen.getByTestId('rankings-content')).toHaveClass('mx-auto')
})
