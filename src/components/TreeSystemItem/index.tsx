import './styles.css'

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import AssetIcon from '../../assets/asset.svg'
import ChevronIcon from '../../assets/chevron-icon.svg'
import ComponentIcon from '../../assets/component.svg'
import LocationIcon from '../../assets/location.svg'
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

type IconMapType = {
  [key: string]: {
    src: string
    alt: string
  }
}

type TreeSystemItemProps = {
  node: Node
}

export function TreeSystemItem({ node }: TreeSystemItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const iconMap: IconMapType = {
    Location: { src: LocationIcon, alt: 'Localização' },
    Component: { src: ComponentIcon, alt: 'Componente' },
    Asset: { src: AssetIcon, alt: 'Asset' },
  }

  const { dispatch } = useTree()
  const [, setSearchParams] = useSearchParams()

  const { src, alt } = iconMap[node.type]

  return (
    <li key={node.name} className="tree-system-item">
      <span className="tree-system-title">
        {node.nodes && node.nodes.length > 0 && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`tree-system-expand ${isOpen ? '' : 'rotate-270'}`}
          >
            <img src={ChevronIcon} alt="Chevron" />
          </button>
        )}

        <img
          src={src}
          alt={alt}
          className={`node-icon ${node.nodes && node.nodes?.length > 0 ? '' : 'empty-node-margin'}`}
        />
        {node.type === 'Component' ? (
          <button
            className="tree-system-nav-button"
            onClick={() => {
              dispatch({ type: 'SET_SELECTED_NODE', selectedNode: node })
              setSearchParams({ componentId: node.id })
            }}
          >
            {node.name}{' '}
            <div
              className="item-status"
              style={{
                backgroundColor:
                  node.type === 'Component' &&
                  (node as AssetLoaderData).status === 'alert'
                    ? 'red'
                    : '#52C41A',
              }}
            />
          </button>
        ) : (
          `${node.name}`
        )}
      </span>

      {isOpen && (
        <ul className="tree-system-sublist">
          {node.nodes?.map((node) => (
            <TreeSystemItem node={node} key={node.id} />
          ))}
        </ul>
      )}
    </li>
  )
}
