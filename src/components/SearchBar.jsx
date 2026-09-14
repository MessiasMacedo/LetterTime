import './SearchBar.css'

function SearchBar({ valor, aoMudar, aoBuscar }) {
  return (
    <form className="busca" onSubmit={aoBuscar}>
      <input
        type="text"
        placeholder="Buscar filme ou série..."
        value={valor}
        onChange={(evento) => aoMudar(evento.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  )
}

export default SearchBar
