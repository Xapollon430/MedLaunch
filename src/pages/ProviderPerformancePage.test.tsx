import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProviderPerformancePage from './ProviderPerformancePage'

test('switches from monthly to annual view', async () => {
  const user = userEvent.setup()

  render(<ProviderPerformancePage />)

  await user.click(screen.getByRole('button', { name: /View Annually/i }))

  expect(screen.getByText(/Operating Profit/i)).toBeInTheDocument()
  expect(screen.getAllByText(/2024/i).length).toBeGreaterThan(0)
})
