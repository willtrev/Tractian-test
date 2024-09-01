import './styles.css'

import { useEffect } from 'react'
import {
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { Header } from '../../components/Header'

type CompanyLoaderData = {
  name: string
  id: string
}

type CompaniesLoaderData = {
  data: CompanyLoaderData[]
  defaultCompany: CompanyLoaderData
}

type CompaniesLoaderSingleton = {
  (props: LoaderFunctionArgs): Promise<CompaniesLoaderData>
  currentRequest?: Promise<CompaniesLoaderData>
}

export const companiesLoader: CompaniesLoaderSingleton = async () => {
  if (!companiesLoader.currentRequest) {
    companiesLoader.currentRequest = (async () => {
      const response = await fetch('https://fake-api.tractian.com/companies')
      const data = await response.json()

      return { data, defaultCompany: data[0] }
    })().finally(() => {
      companiesLoader.currentRequest = undefined
    })
  }

  return companiesLoader.currentRequest
}

function DefaultLayout() {
  const { data, defaultCompany } = useLoaderData() as CompaniesLoaderData

  const { pathname } = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    if (defaultCompany && pathname === '/') {
      navigate('/' + defaultCompany.id)
    }
  }, [defaultCompany, pathname, navigate])

  return (
    <div>
      <Header companies={data} />
      <main className="main-container">
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout
