import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { ROUTES } from './routes/index.jsx'

function App() {
 
  const routes  = createBrowserRouter(ROUTES)

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
