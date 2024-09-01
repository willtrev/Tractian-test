import './styles.css'

import SearchIcon from '../../assets/search.svg'
import { TreeSystemItem } from '../TreeSystemItem'

type Node = {
  name: string
  type: string
  nodes?: Node[]
}

interface TreeSystemContainerProps {
  nodes: Node[]
}

export function TreeSystemContainer({ nodes }: TreeSystemContainerProps) {
  return (
    <section className="tree-system-container">
      <form action="" className="tree-system-search">
        <input type="text" placeholder="Buscar Ativo ou Local" />
        <img src={SearchIcon} alt="lupa" />
      </form>
      <ul className="tree-system-list">
        {nodes.map((node) => (
          <TreeSystemItem node={node} key={node.name} />
        ))}
      </ul>
    </section>
  )
}
