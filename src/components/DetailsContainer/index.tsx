import './styles.css'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import EmptyIcon from '../../assets/empty.svg'
import ReceptorIcon from '../../assets/receptor.svg'
import SensorIcon from '../../assets/sensor.svg'
import { useTree } from '../../store/contexts/TreeContext'

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

export function DetailsContainer() {
  const { state, dispatch } = useTree()
  const [selectedNode, setSelectedNode] = useState<AssetLoaderData | null>(null)
  const [searchParams] = useSearchParams()
  const componentId = searchParams.get('componentId')

  useEffect(() => {
    if (componentId) {
      if (state.selectedNode?.id !== componentId) {
        dispatch({ type: 'GET_COMPONENT_BY_ID', assetId: componentId })
      } else {
        setSelectedNode(state.selectedNode)
      }
    } else {
      setSelectedNode(null)
    }
  }, [componentId, state.selectedNode, dispatch])

  useEffect(() => {
    if (state.selectedNode?.id === componentId) {
      setSelectedNode(state.selectedNode)
    }
  }, [state, componentId])

  if (!selectedNode) {
    return (
      <div className="empty details-container">
        <h2>Nenhum componente selecionado.</h2>
        <span>
          Selecione um componente na lista ao lado para ver os detalhes.
        </span>
      </div>
    )
  }

  const firstName = selectedNode.name.split(' ')[0]

  return (
    <section className="details-container">
      <div>
        <div className="details-title-container">
          <h2 className="details-title">{selectedNode?.name ?? '--'} </h2>
          <div
            className="item-status"
            style={{
              backgroundColor:
                selectedNode?.status === 'alert' ? 'red' : '#52C41A',
            }}
          />
        </div>
        <div className="details-content-container">
          <div className="details-content">
            <div className="empty-image">
              <img src={EmptyIcon} alt="" />
              <span>Componente sem imagem</span>
            </div>
            <div className="details-content-info">
              <article className="content-article">
                <h3>Tipo de Equipamento</h3>
                <span>{firstName ?? '--'}</span>
              </article>
              <hr className="divider" />
              <article className="content-article">
                <h3>Responsáveis</h3>
                <div className="details-content-span">
                  <div className="circle">
                    <span>
                      {selectedNode?.sensorType === 'energy' ? 'E' : 'M'}
                    </span>
                  </div>
                  <span>
                    {selectedNode?.sensorType === 'energy'
                      ? 'Elétrica'
                      : 'Mecânica'}
                  </span>
                </div>
              </article>
            </div>
          </div>
          <hr className="divider" />
          <div>
            <div className="sensor-content">
              <article className="content-article">
                <h3>Sensor</h3>
                <div className="details-content-span">
                  <img src={SensorIcon} alt="três barras circulares" />
                  <span>{selectedNode?.sensorId ?? '--'}</span>
                </div>
              </article>
              <article className="content-article">
                <h3>Responsáveis</h3>
                <div className="details-content-span">
                  <img src={ReceptorIcon} alt="receptor de sinal" />
                  <span>{selectedNode?.gatewayId ?? '--'}</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
