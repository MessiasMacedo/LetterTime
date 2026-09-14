import { FaClock, FaEye, FaHeart } from 'react-icons/fa'
import './ListaBotoes.css'

const LISTAS = [
  { chave: 'queroVer', rotulo: 'Quero Ver', Icone: FaClock },
  { chave: 'assisti', rotulo: 'Assisti', Icone: FaEye },
  { chave: 'favoritos', rotulo: 'Favorito', Icone: FaHeart },
]

function ListaBotoes({ listasAtuais, aoAlternar }) {
  return (
    <div className="lista-botoes">
      {LISTAS.map(({ chave, rotulo, Icone }) => (
        <button
          key={chave}
          type="button"
          className={listasAtuais[chave] ? 'ativo' : ''}
          onClick={() => aoAlternar(chave)}
        >
          <Icone /> {rotulo}
        </button>
      ))}
    </div>
  )
}

export default ListaBotoes
