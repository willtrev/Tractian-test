import './styles.css'

import PlaceholderImg from '../../assets/placeholder-img.png'
import ReceptorIcon from '../../assets/receptor.svg'
import SensorIcon from '../../assets/sensor.svg'

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

type DetailsContainerProps = {
  asset?: AssetLoaderData
}

export function DetailsContainer({ asset }: DetailsContainerProps) {
  if (!asset) return <div className="details-container" />
  return (
    <section className="details-container">
      <div>
        <div className="details-title-container">
          <h2 className="details-title">{asset?.name ?? '--'} </h2>
          <div
            className="item-status"
            style={{
              backgroundColor: asset.status === 'alert' ? 'red' : '#52C41A',
            }}
          />
        </div>
        <div className="details-content-container">
          <div className="details-content">
            <img src={PlaceholderImg} alt="" />
            <div className="details-content-info">
              <article className="content-article">
                <h3>Tipo de Equipamento</h3>
                <span>{asset.sensorType ?? '--'}</span>
              </article>
              <hr className="divider" />
              <article className="content-article">
                <h3>Responsáveis</h3>
                <div className="details-content-span">
                  <div className="circle">
                    <span>{asset.sensorType === 'energy' ? 'E' : 'M'}</span>
                  </div>
                  <span>
                    {asset.sensorType === 'energy' ? 'Elétrica' : 'Mecânica'}
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
                  <span>{asset.sensorId ?? '--'}</span>
                </div>
              </article>
              <article className="content-article">
                <h3>Responsáveis</h3>
                <div className="details-content-span">
                  <img src={ReceptorIcon} alt="receptor de sinal" />
                  <span>{asset.gatewayId ?? '--'}</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
