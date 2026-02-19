import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DrawerMenu from '../components/navigation/DrawerMenu'
import Navbar from '../components/navigation/Navbar'
import { useAppContext } from '../context/AppContext'

const titleMap: Record<string, string> = {
  '/provider-performance': 'Provider Performance',
  '/provider-rankings': 'Provider Rankings',
  '/financial': 'Financial Dashboard',
  '/operational': 'Operational Dashboard',
  '/clinical': 'Clinical Dashboard',
  '/data-sources': 'Data Sources',
}

const AppShell = () => {
  const location = useLocation()
  const { currentDashboard, isDrawerOpen, setCurrentDashboard, setDrawerOpen, toggleDrawer } =
    useAppContext()

  useEffect(() => {
    setCurrentDashboard(titleMap[location.pathname] ?? 'Provider Performance')
    setDrawerOpen(false)
  }, [location.pathname, setCurrentDashboard, setDrawerOpen])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar title={currentDashboard} onMenuClick={toggleDrawer} />
      <DrawerMenu open={isDrawerOpen} onClose={() => setDrawerOpen(false)} />

      {isDrawerOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 top-16 z-10 bg-slate-900/20"
        />
      ) : null}

      <main className="relative z-0 px-4 pb-8 pt-20">
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell
