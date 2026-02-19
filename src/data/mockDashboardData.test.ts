import { mockDashboardData } from './mockDashboardData'

test('contains required route datasets', () => {
  expect(mockDashboardData.providerPerformance).toBeDefined()
  expect(mockDashboardData.providerRankings).toBeDefined()
  expect(mockDashboardData.financial).toBeDefined()
  expect(mockDashboardData.operational).toBeDefined()
  expect(mockDashboardData.clinical).toBeDefined()
  expect(mockDashboardData.dataSources).toBeDefined()
})
