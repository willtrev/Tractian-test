import './styles.css'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CriticalIcon from '../../assets/critical.svg'
import CriticalToggledIcon from '../../assets/critical-toggled.svg'
import EnergyIcon from '../../assets/energy.svg'
import EnergyToggledIcon from '../../assets/energy-toggled.svg'
import { useTree } from '../../store/contexts/TreeContext'

export function MainCardHeader() {
  const { dispatch, state } = useTree()
  const [isFilteringEnergy, setIsFilteringEnergy] = useState(false)
  const [isFilteringCriticalStatus, setIsFilteringCriticalStatus] =
    useState(false)

  const params = useParams()

  function filterByEnergy() {
    if (isFilteringEnergy) {
      resetFilters()
      return
    }

    if (isFilteringCriticalStatus) {
      resetFilters()
      setIsFilteringCriticalStatus(false)
    }

    setIsFilteringEnergy(true)
    dispatch({ type: 'FILTER_BY_ENERGY_SENSOR' })
  }

  function filterByCriticalStatus() {
    if (isFilteringCriticalStatus) {
      resetFilters()
      return
    }

    if (isFilteringEnergy) {
      resetFilters()
      setIsFilteringEnergy(false)
    }

    setIsFilteringCriticalStatus(true)
    dispatch({ type: 'FILTER_BY_CRITICAL_STATUS' })
  }

  function resetFilters() {
    setIsFilteringEnergy(false)
    setIsFilteringCriticalStatus(false)
    dispatch({ type: 'RESET_FILTERS' })
    if (state.name !== '') {
      dispatch({ type: 'FILTER_BY_NAME', name: state.name })
    }
  }

  useEffect(() => {
    resetFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.companyId])

  return (
    <div className="main-card-header">
      <div className="main-card-title">
        <h2>Ativos </h2> <span>/ Apex Unit</span>
      </div>
      <div className="filter-buttons-row">
        <button
          className={`filter-button ${isFilteringEnergy ? 'active' : ''}`}
          onClick={() => filterByEnergy()}
        >
          <img
            src={isFilteringEnergy ? EnergyToggledIcon : EnergyIcon}
            alt="Raio"
          />
          Sensor de Energia
        </button>
        <button
          className={`filter-button ${isFilteringCriticalStatus ? 'active' : ''}`}
          onClick={() => filterByCriticalStatus()}
        >
          <img
            src={isFilteringCriticalStatus ? CriticalToggledIcon : CriticalIcon}
            alt="Alerta"
          />
          Crítico
        </button>
      </div>
    </div>
  )
}
