import './styles.css'

import SearchIcon from '../../assets/search.svg'
import { TreeSystemItem } from '../TreeSystemItem'

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

interface TreeSystemContainerProps {
  nodes: Node[]
  handleNavToDetails: (id: string) => void
}

export function TreeSystemContainer({
  nodes,
  handleNavToDetails,
}: TreeSystemContainerProps) {
  return (
    <section className="tree-system-container">
      <form action="" className="tree-system-search">
        <input type="text" placeholder="Buscar Ativo ou Local" />
        <img src={SearchIcon} alt="lupa" />
      </form>

      <ul className="tree-system-list">
        {nodes.map((node) => (
          <TreeSystemItem
            node={node}
            key={node.id}
            handleNavToDetails={handleNavToDetails}
          />
        ))}
      </ul>
    </section>
  )
}
