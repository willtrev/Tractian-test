import './styles.css'

export function MainCardHeader() {
  return (
    <div className="main-card-header">
      <div className="main-card-title">
        <h2>Ativos </h2> <span>/ Apex Unit</span>
      </div>
      <form action="" className="filter-form">
        <button className="filter-button" onClick={(e) => e.preventDefault()}>
          Sensor de Energia
        </button>
        <button
          className="filter-button active"
          onClick={(e) => e.preventDefault()}
        >
          Crítico
        </button>
      </form>
    </div>
  )
}
