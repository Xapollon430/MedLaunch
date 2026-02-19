import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProviderPerformanceTable from './ProviderPerformanceTable'
import { mockDashboardData } from '../../data/mockDashboardData'

test('renders core metric rows and expands charges detail', async () => {
  const user = userEvent.setup()
  const node = mockDashboardData.providerPerformance['2024'][0]

  render(<ProviderPerformanceTable node={node} />)

  expect(screen.getByText(/Total Visits/i)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /Charges/i }))
  expect(screen.getByText(/Charge Per Patient/i)).toBeInTheDocument()
})
