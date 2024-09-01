import './global.css'

import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

function App() {
  return <RouterProvider fallbackElement={<></>} router={router} />
}

export default App
