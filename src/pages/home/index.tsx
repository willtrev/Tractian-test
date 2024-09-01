import './styles.css'

import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'

import { DetailsContainer } from '../../components/DetailsContainer'
import { MainCardHeader } from '../../components/MainCardHeader'
import { TreeSystemContainer } from '../../components/TreeSystemContainer'

type Node = {
  name: string
  type: string
  nodes?: Node[]
}

const nodes: Node[] = [
  {
    name: 'Home',
    type: 'Location',
    nodes: [
      {
        name: 'Movies',
        type: 'Location',
        nodes: [
          {
            name: 'Action',
            type: 'Asset',
            nodes: [
              {
                name: '2000s',
                type: 'Asset',
                nodes: [
                  { name: 'Gladiator.mp4', type: 'Component' },
                  { name: 'The-Dark-Knight.mp4', type: 'Component' },
                ],
              },
              { name: '2010s', nodes: [], type: 'Component' },
            ],
          },
          {
            name: 'Comedy',
            type: 'Asset',
            nodes: [
              {
                name: '2000s',
                type: 'Asset',
                nodes: [{ name: 'Superbad.mp4', type: 'Component' }],
              },
            ],
          },
          {
            name: 'Drama',
            type: 'Asset',
            nodes: [
              {
                name: '2000s',
                type: 'Asset',
                nodes: [{ name: 'American-Beauty.mp4', type: 'Component' }],
              },
            ],
          },
        ],
      },
      {
        name: 'Music',
        type: 'Location',
        nodes: [
          { name: 'Rock', nodes: [], type: 'Component' },
          { name: 'Classical', nodes: [], type: 'Component' },
        ],
      },
      { name: 'Pictures', nodes: [], type: 'Component' },
      {
        name: 'Documents',
        type: 'Component',
        nodes: [],
      },
      { name: 'passwords.txt', type: 'Component', nodes: [] },
    ],
  },
]

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
}

type CompaniesLoaderSingleton = {
  (props: LoaderFunctionArgs): Promise<CompanyLoaderData>
  currentRequest?: Promise<CompanyLoaderData>
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
  const { assets, locations } = useLoaderData() as CompanyLoaderData

  console.log({ assets, locations })

  return (
    <div className="main-card-container">
      <MainCardHeader />
      <div className="grid-view">
        <TreeSystemContainer nodes={nodes} />
        <DetailsContainer />
      </div>
    </div>
  )
}

export default Home
