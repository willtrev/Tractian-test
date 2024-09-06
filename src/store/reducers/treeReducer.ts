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

type FilterProps = {
  energy: boolean
  critical: boolean
  name: string
}

export type NodeState = {
  originalNodes: Node[]
  filteredNodes: Node[]
  selectedNode: AssetLoaderData | null
  assets: AssetLoaderData[]
  filters: FilterProps
}

export type Action =
  | {
      type: 'ADD_DATA'
      payload: { locations: LocationLoaderData[]; assets: AssetLoaderData[] }
    }
  | { type: 'FILTER_TREE'; filters: FilterProps }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_SELECTED_NODE'; selectedNode: Node }
  | { type: 'GET_COMPONENT_BY_ID'; assetId: string }

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

function filterNodesByName(node: Node, name: string): Node | null {
  if (node.nodes) {
    const filteredNodes = node.nodes
      .map((child) => filterNodesByName(child, name))
      .filter((child) => child !== null) as Node[]

    if (filteredNodes.length > 0) {
      return { ...node, nodes: filteredNodes }
    }
  }
  if (node.name.toLowerCase().includes(name.toLowerCase())) {
    return node
  }

  return null
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

      return {
        ...state,
        originalNodes: rootNodes,
        filteredNodes: rootNodes,
        assets,
      }
    }

    case 'GET_COMPONENT_BY_ID': {
      const component = state.assets.find(
        (asset) => asset.id === action.assetId,
      )

      if (!component) {
        return state
      }

      return { ...state, selectedNode: component }
    }

    case 'FILTER_TREE': {
      const filteredNodesByName = state.originalNodes
        .map((node) => filterNodesByName(node, action.filters.name))
        .filter((node) => node !== null) as Node[]

      const filteredNodesByEnergy = action.filters.energy
        ? (filteredNodesByName
            .map((node) => filterByEnergySensor(node))
            .filter((node) => node !== null) as Node[])
        : filteredNodesByName

      const filteredNodes = action.filters.critical
        ? (filteredNodesByEnergy
            .map((node) => filterByCriticalStatus(node))
            .filter((node) => node !== null) as Node[])
        : filteredNodesByEnergy

      return {
        ...state,
        filteredNodes,
        filters: action.filters,
      }
    }

    case 'RESET_FILTERS': {
      return {
        ...state,
        filteredNodes: state.originalNodes,
        filters: { name: '', critical: false, energy: false },
      }
    }

    case 'SET_SELECTED_NODE': {
      return { ...state, selectedNode: action.selectedNode }
    }

    default:
      return state
  }
}
