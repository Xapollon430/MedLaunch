import { render, screen } from '@testing-library/react'
import OperationalPage from './OperationalPage'

test('renders operational metric sections', () => {
  render(<OperationalPage />)

  expect(screen.getByText(/Patients Seen/i)).toBeInTheDocument()
  expect(screen.getByText(/New Patient Count/i)).toBeInTheDocument()
  expect(screen.getByText(/Total Receipts/i)).toBeInTheDocument()
  expect(screen.getByTestId('operational-content')).toHaveClass('mx-auto')
})
