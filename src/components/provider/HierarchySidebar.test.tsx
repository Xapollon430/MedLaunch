import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HierarchySidebar from './HierarchySidebar'
import { mockDashboardData } from '../../data/mockDashboardData'

test('filters providers by search term in Provider mode', async () => {
  const user = userEvent.setup()

  render(
    <HierarchySidebar
      nodes={mockDashboardData.providerPerformance['2024']}
      selectedId={null}
      onSelect={() => {}}
    />
  )

  expect(screen.getAllByTestId('location-icon').length).toBeGreaterThan(0)

  await user.click(screen.getByRole('button', { name: /Provider/i }))
  await user.type(screen.getByPlaceholderText(/Search/i), 'Jane')

  expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument()
  expect(screen.getAllByTestId('provider-icon').length).toBeGreaterThan(0)
})
