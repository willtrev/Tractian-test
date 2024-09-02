import './styles.css'

import { useEffect, useState } from 'react'
import {
  LoaderFunctionArgs,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { DetailsContainer } from '../../components/DetailsContainer'
import { MainCardHeader } from '../../components/MainCardHeader'
import { TreeSystemContainer } from '../../components/TreeSystemContainer'
import { useTree } from '../../contexts/TreeContext'

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

type Node = {
  type: string
  nodes?: Node[]
} & (AssetLoaderData | LocationLoaderData)

type CompanyLoaderData = {
  assets: AssetLoaderData[]
  locations: LocationLoaderData[]
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
      }

      return data
    })().finally(() => {
      companyLoader.currentRequest = undefined
    })
  }

  return companyLoader.currentRequest
}

function Home() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [selectedAssetId, setSelectedAssetId] = useState('')
  const { assets, locations } = useLoaderData() as CompanyLoaderData

  const { state, dispatch } = useTree()

  useEffect(() => {
    dispatch({ type: 'ADD_DATA', payload: { locations, assets } })
  }, [assets, dispatch, locations])

  const handleNavToDetails = (id: string) => {
    const companyId = pathname.split('/')[1]
    setSelectedAssetId(id)
    navigate(`/${companyId}/${id}`)
  }

  const selectedAsset = assets.filter(
    (asset) => asset.id === selectedAssetId,
  )[0]

  return (
    <div className="main-card-container">
      <MainCardHeader />
      <div className="grid-view">
        <TreeSystemContainer
          nodes={state.filteredNodes as Node[]}
          handleNavToDetails={handleNavToDetails}
        />
        <DetailsContainer asset={selectedAsset} />
      </div>
    </div>
  )
}

export default Home
