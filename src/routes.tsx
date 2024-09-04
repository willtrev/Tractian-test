import { createBrowserRouter } from 'react-router-dom'

import DefaultLayout, { companiesLoader } from './layout/DefaultLayout'
import Home, { companyLoader } from './pages/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    loader: companiesLoader,
    children: [
      {
        path: '/:companyId',
        element: <Home />,
        loader: companyLoader,
      },
    ],
  },
])
