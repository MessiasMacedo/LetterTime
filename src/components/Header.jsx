import { NavLink } from 'react-router-dom'
import { FaFilm, FaListUl } from 'react-icons/fa'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container header__conteudo">
        <NavLink to="/" className="header__logo">
          <FaFilm /> LetterTime
        </NavLink>
        <nav className="header__nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'ativo' : ''}>
            Início
          </NavLink>
          <NavLink to="/minhas-listas" className={({ isActive }) => isActive ? 'ativo' : ''}>
            <FaListUl /> Minhas Listas
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
