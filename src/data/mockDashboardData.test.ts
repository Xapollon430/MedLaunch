import { mockDashboardData } from './mockDashboardData'

test('contains required route datasets', () => {
  expect(mockDashboardData.providerPerformance).toBeDefined()
  expect(mockDashboardData.providerRankings).toBeDefined()
  expect(mockDashboardData.financial).toBeDefined()
  expect(mockDashboardData.operational).toBeDefined()
  expect(mockDashboardData.clinical).toBeDefined()
  expect(mockDashboardData.dataSources).toBeDefined()
})

test('includes multiple locations and providers for demo exploration', () => {
  const providerHierarchy2024 = mockDashboardData.providerPerformance['2024'] ?? []

  const providerCount = providerHierarchy2024.reduce(
    (total, locationNode) => total + (locationNode.children?.length ?? 0),
    0
  )

  expect(providerHierarchy2024.length).toBeGreaterThanOrEqual(4)
  expect(providerCount).toBeGreaterThanOrEqual(8)

  const rankingProviders = Object.keys(
    mockDashboardData.providerRankings['2024']?.PatientCount ?? {}
  )
  expect(rankingProviders.length).toBeGreaterThanOrEqual(8)
})
