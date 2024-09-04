import './styles.css'

import { useEffect } from 'react'
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom'

import { DetailsContainer } from '../../components/DetailsContainer'
import { MainCardHeader } from '../../components/MainCardHeader'
import { TreeSystemContainer } from '../../components/TreeSystemContainer'
import { useTree } from '../../store/contexts/TreeContext'

type AssetLoaderData = {
  id: string
  name: string
  locationId?: string
  gatewayId?: string
  parentId?: string
  sensorId?: string
  sensorType?: string
  status?: string
}

type LocationLoaderData = {
  id: string
  name: string
  parentId?: string
}
type CompanyLoaderData = {
  assets: AssetLoaderData[]
  locations: LocationLoaderData[]
  companyId: string
}

type CompaniesLoaderSingleton = {
  (props: LoaderFunctionArgs): Promise<CompanyLoaderData>
  currentRequest?: Promise<CompanyLoaderData>
}

export type NodeState = {
  originalNodes: []
  filteredNodes: []
}

export const companyLoader: CompaniesLoaderSingleton = async (
  props: LoaderFunctionArgs,
) => {
  const companyId = props.params.companyId
  if (!companyLoader.currentRequest) {
    companyLoader.currentRequest = (async () => {
      const [assetsResponse, locationsResponse] = await Promise.all([
        fetch(
          `https://fake-api.tractian.com/companies/${companyId}/assets`,
        ).then((response) => response.json()),
        fetch(
          `https://fake-api.tractian.com/companies/${companyId}/locations`,
        ).then((response) => response.json()),
      ])

      const data: CompanyLoaderData = {
        assets: assetsResponse,
        locations: locationsResponse,
        companyId: companyId!,
      }

      return data
    })().finally(() => {
      companyLoader.currentRequest = undefined
    })
  }

  return companyLoader.currentRequest
}

function Home() {
  const { assets, locations } = useLoaderData() as CompanyLoaderData
  const { dispatch } = useTree()

  const { companyId } = useParams()

  useEffect(() => {
    dispatch({ type: 'ADD_DATA', payload: { locations, assets } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId])

  return (
    <div className="main-card-container">
      <MainCardHeader />
      <div className="grid-view">
        <TreeSystemContainer />
        <DetailsContainer />
      </div>
    </div>
  )
}

export default Home
