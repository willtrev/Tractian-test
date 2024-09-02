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

export type NodeState = {
  originalNodes: Node[]
  filteredNodes: Node[]
}

export type Action =
  | {
      type: 'ADD_DATA'
      payload: { locations: LocationLoaderData[]; assets: AssetLoaderData[] }
    }
  | { type: 'FILTER_BY_ENERGY_SENSOR' }
  | { type: 'FILTER_BY_CRITICAL_STATUS' }
  | { type: 'FILTER_BY_NAME'; name: string }
  | { type: 'RESET_FILTERS' }

function filterByEnergySensor(node: Node): Node | null {
  if (
    node.type === 'Component' &&
    (node as AssetLoaderData).sensorType === 'energy'
  ) {
    return node
  }

  if (node.nodes) {
    const filteredNodes = node.nodes
      .map((child) => filterByEnergySensor(child))
      .filter((child) => child !== null) as Node[]

    if (filteredNodes.length > 0) {
      return { ...node, nodes: filteredNodes }
    }
  }

  return null
}

function filterByCriticalStatus(node: Node): Node | null {
  if (
    node.type === 'Component' &&
    (node as AssetLoaderData).status === 'alert'
  ) {
    return node
  }

  if (node.nodes) {
    const filteredNodes = node.nodes
      .map((child) => filterByCriticalStatus(child))
      .filter((child) => child !== null) as Node[]

    if (filteredNodes.length > 0) {
      return { ...node, nodes: filteredNodes }
    }
  }

  return null
}

function filterNodesByName(nodes: Node[], name: string): Node[] {
  return nodes
    .filter((node) => node.name.toLowerCase().includes(name.toLowerCase()))
    .map((node) => ({
      ...node,
      nodes: node.nodes ? filterNodesByName(node.nodes, name) : [],
    }))
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

      return { originalNodes: rootNodes, filteredNodes: rootNodes }
    }

    case 'FILTER_BY_ENERGY_SENSOR': {
      const filteredNodes = state.originalNodes
        .map((node) => filterByEnergySensor(node))
        .filter((node) => node !== null) as Node[]
      return { ...state, filteredNodes }
    }

    case 'FILTER_BY_CRITICAL_STATUS': {
      const filteredNodes = state.originalNodes
        .map((node) => filterByCriticalStatus(node))
        .filter((node) => node !== null) as Node[]
      return { ...state, filteredNodes }
    }

    case 'FILTER_BY_NAME': {
      const filteredNodes = filterNodesByName(state.originalNodes, action.name)
      return {
        ...state,
        filteredNodes,
      }
    }

    case 'RESET_FILTERS': {
      return { ...state, filteredNodes: state.originalNodes }
    }

    default:
      return state
  }
}
