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
        path: '/:companyId/:assetId?',
        element: <Home />,
        loader: companyLoader,
      },
    ],
  },
])
