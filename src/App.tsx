import './global.css'

import { RouterProvider } from 'react-router-dom'

import { TreeProvider } from './contexts/TreeContext'
import { router } from './routes'

function App() {
  return (
    <TreeProvider>
      <RouterProvider fallbackElement={<></>} router={router} />
    </TreeProvider>
  )
}

export default App
