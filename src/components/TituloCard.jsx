import { Link } from 'react-router-dom'
import './TituloCard.css'

function TituloCard({ titulo }) {
  return (
    <Link to={`/titulo/${titulo.id}`} className="titulo-card">
      {titulo.poster
        ? <img src={titulo.poster} alt={titulo.titulo} />
        : <div className="titulo-card__sem-poster">Sem imagem</div>}
      <h3>{titulo.titulo}</h3>
      {titulo.ano && <span>{titulo.ano}</span>}
    </Link>
  )
}

export default TituloCard
