import './styles.css'

import { useLocation, useNavigate } from 'react-router-dom'

import GoldIcon from '../../assets/gold.svg'
import Logo from '../../assets/logo-tractian.png'

type HeaderProps = {
  companies: {
    name: string
    id: string
  }[]
}

export function Header({ companies }: HeaderProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const companyIdRoute = `/${pathname.split('/')[1]}`

  const isCurrentPage = (to: string) => companyIdRoute === to

  const handleNavigate = (id: string) => {
    if (!isCurrentPage(id)) {
      navigate('/' + id)
    }
  }

  return (
    <header className="header">
      <img src={Logo} alt="Tractian" />
      <nav className="nav">
        {companies.map((company) => (
          <button
            className="nav-button"
            disabled={isCurrentPage(`/${company.id}`)}
            onClick={() => handleNavigate(company.id)}
            data-current={isCurrentPage(`/${company.id}`)}
            key={company.id}
          >
            <img src={GoldIcon} alt="3 Barras de ouro" />
            <span>{company.name}</span>
          </button>
        ))}
      </nav>
    </header>
  )
}
