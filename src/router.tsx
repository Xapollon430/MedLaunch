import { Navigate, createBrowserRouter } from 'react-router-dom'
import AppShell from './layout/AppShell'
import FinancialPage from './pages/FinancialPage'
import OperationalPage from './pages/OperationalPage'
import ProviderPerformancePage from './pages/ProviderPerformancePage'
import ProviderRankingsPage from './pages/ProviderRankingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/provider-performance" replace /> },
      { path: 'provider-performance', element: <ProviderPerformancePage /> },
      { path: 'provider-rankings', element: <ProviderRankingsPage /> },
      { path: 'financial', element: <FinancialPage /> },
      { path: 'operational', element: <OperationalPage /> },
      { path: 'clinical', element: <ProviderPerformancePage /> },
      { path: 'data-sources', element: <ProviderPerformancePage /> },
    ],
  },
  { path: '*', element: <Navigate to="/provider-performance" replace /> },
])
