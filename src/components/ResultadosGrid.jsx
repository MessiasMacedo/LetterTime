import TituloCard from './TituloCard.jsx'
import './ResultadosGrid.css'

function ResultadosGrid({ itens, status }) {
  if (status === 'carregando') return <p>Carregando...</p>
  if (status === 'erro') return <p>Não foi possível buscar agora. Tente de novo.</p>
  if (status === 'vazio') return <p>Nenhum resultado para essa busca.</p>
  if (status !== 'sucesso') return null

  return (
    <div className="resultados-grid">
      {itens.map((titulo) => (
        <TituloCard key={titulo.id} titulo={titulo} />
      ))}
    </div>
  )
}

export default ResultadosGrid
