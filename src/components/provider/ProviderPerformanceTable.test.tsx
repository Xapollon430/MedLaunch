import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProviderPerformanceTable from './ProviderPerformanceTable'
import { mockDashboardData } from '../../data/mockDashboardData'
import { formatNumber } from '../../utils/format'

test('renders core metric rows with detail rows open by default', async () => {
  const user = userEvent.setup()
  const node = mockDashboardData.providerPerformance['2024'][0]

  render(<ProviderPerformanceTable node={node} />)

  expect(screen.getByText(/Total Visits/i)).toBeInTheDocument()
  expect(screen.getByText(/Charge Per Patient/i)).toBeInTheDocument()
  expect(screen.getByText(/99204 - New Patient/i)).toBeInTheDocument()

  const cptMetric = node.data.cptCodes[0]
  expect(screen.getAllByText(formatNumber(cptMetric.values[0])).length).toBeGreaterThan(0)
  expect(screen.getAllByText(formatNumber(cptMetric.total)).length).toBeGreaterThan(0)

  await user.click(screen.getByRole('button', { name: /Charges/i }))
  expect(screen.queryByText(/Charge Per Patient/i)).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /CPT Coding Total/i }))
  expect(screen.queryByText(/99204 - New Patient/i)).not.toBeInTheDocument()
})

test('toggles CPT detail rows from expanded to collapsed state', async () => {
  const user = userEvent.setup()
  const node = mockDashboardData.providerPerformance['2024'][0]

  render(<ProviderPerformanceTable node={node} />)

  expect(screen.getByText(/99204 - New Patient/i)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /CPT Coding Total/i }))
  expect(screen.queryByText(/99204 - New Patient/i)).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /CPT Coding Total/i }))
  expect(screen.getByText(/99204 - New Patient/i)).toBeInTheDocument()
})

test('styles operating profit cells red and green based on value sign', () => {
  const node = mockDashboardData.providerPerformance['2024'][0]

  render(<ProviderPerformanceTable node={node} />)

  const operatingProfitRow = screen.getByRole('row', { name: /Operating Profit/i })
  const cells = within(operatingProfitRow).getAllByRole('cell').slice(1)

  const negativeCell = cells.find((cell) => cell.textContent?.includes('-$'))
  const positiveCell = cells.find(
    (cell) => cell.textContent?.includes('$') && !cell.textContent?.includes('-$')
  )

  expect(negativeCell).toBeDefined()
  expect(positiveCell).toBeDefined()
  expect(negativeCell).toHaveClass('text-rose-900')
  expect(positiveCell).toHaveClass('text-emerald-900')
})
