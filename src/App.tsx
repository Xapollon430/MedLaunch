import { RouterProvider } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { router } from './router'

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
