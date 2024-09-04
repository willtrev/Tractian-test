import './styles.css'

import { useEffect, useState } from 'react'

import SearchIcon from '../../assets/search.svg'
import { useTree } from '../../contexts/TreeContext'
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

export function TreeSystemContainer() {
  const { dispatch, state } = useTree()

  const nodes = state.filteredNodes as Node[]

  const [name, setName] = useState('')
  const debouncedName = useDebounce(name, 300)

  useEffect(() => {
    dispatch({ type: 'FILTER_BY_NAME', name: debouncedName })
  }, [debouncedName, dispatch])

  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debouncedValue
  }

  return (
    <section className="tree-system-container">
      <form action="" className="tree-system-search">
        <input
          type="text"
          placeholder="Buscar Ativo ou Local"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <img src={SearchIcon} alt="lupa" />
      </form>

      <ul className="tree-system-list">
        {nodes.map((node) => (
          <TreeSystemItem node={node} key={node.id} />
        ))}
      </ul>
    </section>
  )
}
