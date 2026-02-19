import { render, screen } from '@testing-library/react'
import FinancialPage from './FinancialPage'

test('renders aging bucket columns', () => {
  render(<FinancialPage />)

  expect(screen.getByText(/0-30 Days/i)).toBeInTheDocument()
  expect(screen.getByText(/31-60 Days/i)).toBeInTheDocument()
  expect(screen.getByRole('columnheader', { name: 'Total Balance' })).toBeInTheDocument()
})
