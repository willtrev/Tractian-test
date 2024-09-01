import './styles.css'

import { useState } from 'react'

import AssetIcon from '../../assets/asset.svg'
import ChevronIcon from '../../assets/chevron-icon.svg'
import ComponentIcon from '../../assets/component.svg'
import LocationIcon from '../../assets/location.svg'

type Node = {
  name: string
  type: string
  nodes?: Node[]
}

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
        {node.name}
      </span>

      {isOpen && (
        <ul className="tree-system-sublist">
          {node.nodes?.map((node) => (
            <TreeSystemItem node={node} key={node.name} />
          ))}
        </ul>
      )}
    </li>
  )
}
