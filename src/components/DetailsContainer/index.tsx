import './styles.css'

import PlaceholderImg from '../../assets/placeholder-img.png'
import ReceptorIcon from '../../assets/receptor.svg'
import SensorIcon from '../../assets/sensor.svg'

export function DetailsContainer() {
  return (
    <section className="details-container">
      <div>
        <div className="details-title-container">
          <h2 className="details-title">Nome do item</h2>
        </div>
        <div className="details-content-container">
          <div className="details-content">
            <img src={PlaceholderImg} alt="" />
            <div className="details-content-info">
              <article className="content-article">
                <h3>Tipo de Equipamento</h3>
                <span>Motor Elétrico (Trifásico)</span>
              </article>
              <hr className="divider" />
              <article className="content-article">
                <h3>Responsáveis</h3>
                <div className="details-content-span">
                  <div className="circle">
                    <span>E</span>
                  </div>
                  <span>Elétrica</span>
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
                  <span>TFV655</span>
                </div>
              </article>
              <article className="content-article">
                <h3>Responsáveis</h3>
                <div className="details-content-span">
                  <img src={ReceptorIcon} alt="receptor de sinal" />
                  <span>YTF265</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
