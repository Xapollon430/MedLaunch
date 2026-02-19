import { createContext, useContext, useMemo, useState } from 'react'

type AppContextValue = {
  isDrawerOpen: boolean
  setDrawerOpen: (value: boolean) => void
  toggleDrawer: () => void
  currentDashboard: string
  setCurrentDashboard: (value: string) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [currentDashboard, setCurrentDashboard] = useState('Provider Performance')

  const value = useMemo(
    () => ({
      isDrawerOpen,
      setDrawerOpen,
      toggleDrawer: () => setDrawerOpen((prev) => !prev),
      currentDashboard,
      setCurrentDashboard,
    }),
    [isDrawerOpen, currentDashboard]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }

  return context
}
