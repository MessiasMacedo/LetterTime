import { useState, useEffect } from 'react'
import { FaClock, FaEye, FaHeart } from 'react-icons/fa'
import { buscarDetalhes } from '../services/tmdb.js'
import { lerDados, alternarNaLista } from '../utils/storage.js'
import ListaSecao from '../components/ListaSecao.jsx'

const SECOES = [
  { chave: 'queroVer', titulo: 'Quero Ver', Icone: FaClock },
  { chave: 'assisti', titulo: 'Assisti', Icone: FaEye },
  { chave: 'favoritos', titulo: 'Favoritos', Icone: FaHeart },
]

function MinhasListas() {
  const [listasCompletas, setListasCompletas] = useState({ queroVer: [], assisti: [], favoritos: [] })
  const [status, setStatus] = useState('carregando')

  useEffect(() => {
    carregarListas()
  }, [])

  async function carregarListas() {
    setStatus('carregando')
    try {
      const dados = lerDados()
      const entradas = await Promise.all(
        SECOES.map(async ({ chave }) => {
          const itens = await Promise.all(
            dados.listas[chave].map(async (id) => {
              const detalhe = await buscarDetalhes(id)
              return { ...detalhe, notaPessoal: dados.avaliacoes[id]?.nota }
            }),
          )
          return [chave, itens]
        }),
      )
      setListasCompletas(Object.fromEntries(entradas))
      setStatus('sucesso')
    } catch {
      setStatus('erro')
    }
  }

  function aoRemover(nomeLista, id) {
    alternarNaLista(id, nomeLista)
    setListasCompletas((atual) => ({
      ...atual,
      [nomeLista]: atual[nomeLista].filter((item) => item.id !== id),
    }))
  }

  if (status === 'carregando') return <p>Carregando...</p>
  if (status === 'erro') return <p>Não foi possível carregar suas listas.</p>

  return (
    <div>
      <h1>Minhas listas</h1>
      {SECOES.map(({ chave, titulo, Icone }) => (
        <ListaSecao
          key={chave}
          titulo={titulo}
          Icone={Icone}
          itens={listasCompletas[chave]}
          aoRemover={(id) => aoRemover(chave, id)}
        />
      ))}
    </div>
  )
}

export default MinhasListas
