import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'medlaunch-theme'

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme
  }

  return 'light'
}

type AppContextValue = {
  isDrawerOpen: boolean
  setDrawerOpen: (value: boolean) => void
  toggleDrawer: () => void
  currentDashboard: string
  setCurrentDashboard: (value: string) => void
  theme: ThemeMode
  setTheme: (value: ThemeMode) => void
  toggleTheme: () => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [currentDashboard, setCurrentDashboard] = useState('Provider Performance')
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      isDrawerOpen,
      setDrawerOpen,
      toggleDrawer: () => setDrawerOpen((prev) => !prev),
      currentDashboard,
      setCurrentDashboard,
      theme,
      setTheme,
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [isDrawerOpen, currentDashboard, theme]
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
