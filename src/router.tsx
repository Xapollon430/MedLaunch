import { Navigate, createBrowserRouter } from 'react-router-dom'
import AppShell from './layout/AppShell'
import ProviderPerformancePage from './pages/ProviderPerformancePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/provider-performance" replace /> },
      { path: 'provider-performance', element: <ProviderPerformancePage /> },
      { path: 'provider-rankings', element: <ProviderPerformancePage /> },
      { path: 'financial', element: <ProviderPerformancePage /> },
      { path: 'operational', element: <ProviderPerformancePage /> },
      { path: 'clinical', element: <ProviderPerformancePage /> },
      { path: 'data-sources', element: <ProviderPerformancePage /> },
    ],
  },
  { path: '*', element: <Navigate to="/provider-performance" replace /> },
])
