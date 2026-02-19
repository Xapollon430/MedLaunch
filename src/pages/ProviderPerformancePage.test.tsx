import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProviderPerformancePage from './ProviderPerformancePage'

test('switches from monthly to annual view', async () => {
  const user = userEvent.setup()
  const { container } = render(<ProviderPerformancePage />)

  await user.click(screen.getByRole('button', { name: /View Annually/i }))

  expect(screen.getByText(/Operating Profit/i)).toBeInTheDocument()
  expect(screen.getByText(/CPT Coding Total/i)).toBeInTheDocument()
  expect(screen.getByText(/99204 - New Patient/i)).toBeInTheDocument()
  expect(screen.getAllByText(/2024/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/-\$/).length).toBeGreaterThan(0)
  expect(container.querySelectorAll('.text-rose-900').length).toBeGreaterThan(0)
  expect(container.querySelectorAll('.text-emerald-900').length).toBeGreaterThan(0)
})
