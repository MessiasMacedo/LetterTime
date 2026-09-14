import TituloCard from './TituloCard.jsx'
import EstrelaRating from './EstrelaRating.jsx'
import './ListaSecao.css'

function ListaSecao({ titulo, Icone, itens, aoRemover }) {
  return (
    <section className="lista-secao">
      <h2>
        <Icone /> {titulo}
        <span className="lista-secao__contagem">{itens.length}</span>
      </h2>
      {itens.length === 0 ? (
        <p className="lista-secao__vazio">Nenhum título aqui ainda.</p>
      ) : (
        <div className="lista-secao__grid">
          {itens.map((item) => (
            <div key={item.id} className="lista-secao__item">
              <TituloCard titulo={item} />
              {item.notaPessoal && <EstrelaRating valor={item.notaPessoal} />}
              <button
                type="button"
                className="lista-secao__remover"
                onClick={() => aoRemover(item.id)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ListaSecao
