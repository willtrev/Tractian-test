import React, { createContext, ReactNode, useContext, useReducer } from 'react'

import { Action, NodeState, treeReducer } from '../hooks/useTreeViewReducer'

type TreeContextType = {
  state: NodeState
  dispatch: React.Dispatch<Action>
}

const TreeContext = createContext<TreeContextType | undefined>(undefined)

const initialState: NodeState = {
  originalNodes: [],
  filteredNodes: [],
  selectedNode: null,
  assets: [],
}

export const TreeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(treeReducer, initialState)

  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeContext.Provider>
  )
}

export const useTree = (): TreeContextType => {
  const context = useContext(TreeContext)
  if (!context) {
    throw new Error('useTree must be used within a TreeProvider')
  }
  return context
}
