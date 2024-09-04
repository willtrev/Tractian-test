import './global.css'

import { RouterProvider } from 'react-router-dom'

import { router } from './routes'
import { TreeProvider } from './store/contexts/TreeContext'

function App() {
  return (
    <TreeProvider>
      <RouterProvider fallbackElement={<></>} router={router} />
    </TreeProvider>
  )
}

export default App
