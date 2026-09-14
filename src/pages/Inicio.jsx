import { useState, useEffect } from 'react'
import { buscarTitulos } from '../services/tmdb.js'
import SearchBar from '../components/SearchBar.jsx'
import ResultadosGrid from '../components/ResultadosGrid.jsx'

function Inicio() {
  const [termoBusca, setTermoBusca] = useState('')
  const [termoPesquisado, setTermoPesquisado] = useState('')
  const [resultados, setResultados] = useState([])
  const [status, setStatus] = useState('inicial')

  useEffect(() => {
    if (!termoPesquisado) return
    let cancelado = false

    setStatus('carregando')
    buscarTitulos(termoPesquisado)
      .then((itens) => {
        if (cancelado) return
        setResultados(itens)
        setStatus(itens.length === 0 ? 'vazio' : 'sucesso')
      })
      .catch(() => {
        if (!cancelado) setStatus('erro')
      })

    return () => { cancelado = true }
  }, [termoPesquisado])

  function aoBuscar(evento) {
    evento.preventDefault()
    setTermoPesquisado(termoBusca)
  }

  return (
    <section>
      <h1>Buscar filmes e séries</h1>
      <SearchBar valor={termoBusca} aoMudar={setTermoBusca} aoBuscar={aoBuscar} />
      <ResultadosGrid itens={resultados} status={status} />
    </section>
  )
}

export default Inicio
