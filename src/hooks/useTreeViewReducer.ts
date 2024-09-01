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
  type?: string
  nodes?: Node[]
} & (AssetLoaderData | LocationLoaderData)

type NodeState = Node[]

type Action = {
  type: 'ADD_DATA'
  payload: { locations: LocationLoaderData[]; assets: AssetLoaderData[] }
}

export function treeReducer(state: NodeState, action: Action): NodeState {
  switch (action.type) {
    case 'ADD_DATA': {
      const { locations, assets } = action.payload
      const nodeMap: Record<string, Node> = {}
      const rootNodes: Node[] = []

      locations.forEach((location) => {
        nodeMap[location.id] = { ...location, type: 'Location', nodes: [] }
      })

      assets.forEach((asset) => {
        nodeMap[asset.id] = {
          ...asset,
          type: asset.status ? 'Component' : 'Asset',
          nodes: [],
        }
      })

      assets.forEach((asset) => {
        if (asset.locationId) {
          nodeMap[asset.locationId].nodes?.push(nodeMap[asset.id])
        } else if (asset.parentId) {
          nodeMap[asset.parentId].nodes?.push(nodeMap[asset.id])
        } else {
          rootNodes.push(nodeMap[asset.id])
        }
      })

      locations.forEach((location) => {
        if (location.parentId) {
          nodeMap[location.parentId].nodes?.push(nodeMap[location.id])
        } else {
          rootNodes.push(nodeMap[location.id])
        }
      })

      state = rootNodes

      return state
    }

    default:
      return state
  }
}
