import { createBrowserRouter } from 'react-router-dom'

import DefaultLayout, { companiesLoader } from './layout/DefaultLayout'
import Home, { companyLoader } from './pages/home'

// Transformar Home e main-container em um layout e colocar o card para vir no Outlet dele

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    loader: companiesLoader,
    children: [
      // {
      //   index: true,
      //   element: <Home />,
      // },
      {
        path: '/:companyId',
        element: <Home />,
        loader: companyLoader,
      },
    ],
  },
])
