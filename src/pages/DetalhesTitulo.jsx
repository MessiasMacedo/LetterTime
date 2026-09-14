import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { buscarDetalhes } from '../services/tmdb.js'
import { estaNaLista, alternarNaLista, obterAvaliacao, salvarAvaliacao } from '../utils/storage.js'
import ListaBotoes from '../components/ListaBotoes.jsx'
import AvaliacaoForm from '../components/AvaliacaoForm.jsx'
import EstrelaRating from '../components/EstrelaRating.jsx'
import Modal from '../components/Modal.jsx'
import './DetalhesTitulo.css'

const LISTAS = ['queroVer', 'assisti', 'favoritos']

function DetalhesTitulo() {
  const { id } = useParams()
  const [titulo, setTitulo] = useState(null)
  const [status, setStatus] = useState('carregando')
  const [listasAtuais, setListasAtuais] = useState({})
  const [avaliacao, setAvaliacao] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)

  useEffect(() => {
    let cancelado = false

    setStatus('carregando')
    buscarDetalhes(id)
      .then((dados) => {
        if (cancelado) return
        setTitulo(dados)
        setStatus('sucesso')
      })
      .catch(() => {
        if (!cancelado) setStatus('erro')
      })

    const listas = {}
    LISTAS.forEach((nome) => { listas[nome] = estaNaLista(id, nome) })
    setListasAtuais(listas)
    setAvaliacao(obterAvaliacao(id))

    return () => { cancelado = true }
  }, [id])

  function aoAlternarLista(nomeLista) {
    const ativandoAssisti = nomeLista === 'assisti' && !listasAtuais.assisti
    alternarNaLista(id, nomeLista)
    setListasAtuais((atual) => ({ ...atual, [nomeLista]: !atual[nomeLista] }))
    if (ativandoAssisti) setModalAberto(true)
  }

  function aoSalvarAvaliacao(nota, comentario) {
    salvarAvaliacao(id, nota, comentario)
    setAvaliacao({ nota, comentario })
    setModalAberto(false)
  }

  if (status === 'carregando') return <p>Carregando...</p>
  if (status === 'erro') return <p>Não foi possível carregar esse título.</p>

  return (
    <section className="detalhes-titulo">
      <div
        className="detalhes-hero"
        style={titulo.backdrop ? { backgroundImage: `url(${titulo.backdrop})` } : undefined}
      >
        <div className="detalhes-hero__overlay">
          {titulo.poster
            ? <img className="detalhes-hero__poster" src={titulo.poster} alt={titulo.titulo} />
            : <div className="detalhes-hero__poster detalhes-titulo__sem-poster">Sem imagem</div>}

          <div className="detalhes-hero__info">
            <h1>
              {titulo.titulo} {titulo.ano && <span className="detalhes-titulo__ano">({titulo.ano})</span>}
            </h1>
            {titulo.generos.length > 0 && (
              <p className="detalhes-titulo__generos">{titulo.generos.join(', ')}</p>
            )}
            <p className="detalhes-titulo__nota">
              <FaStar /> {titulo.nota.toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      <div className="detalhes-titulo__corpo">
        {titulo.tagline && <p className="detalhes-titulo__tagline">{titulo.tagline}</p>}
        <p className="detalhes-titulo__sinopse">{titulo.sinopse || 'Sem sinopse disponível.'}</p>

        <ListaBotoes listasAtuais={listasAtuais} aoAlternar={aoAlternarLista} />

        {listasAtuais.assisti && (
          <div className="detalhes-titulo__avaliacao">
            {avaliacao ? (
              <>
                <EstrelaRating valor={avaliacao.nota} />
                {avaliacao.comentario && <p className="detalhes-titulo__comentario">"{avaliacao.comentario}"</p>}
                <button
                  type="button"
                  className="detalhes-titulo__botao-avaliar"
                  onClick={() => setModalAberto(true)}
                >
                  Editar avaliação
                </button>
              </>
            ) : (
              <button
                type="button"
                className="detalhes-titulo__botao-avaliar"
                onClick={() => setModalAberto(true)}
              >
                Avaliar
              </button>
            )}
          </div>
        )}
      </div>

      {modalAberto && (
        <Modal titulo="Avaliar" aoFechar={() => setModalAberto(false)}>
          <AvaliacaoForm avaliacaoAtual={avaliacao} aoSalvar={aoSalvarAvaliacao} />
        </Modal>
      )}
    </section>
  )
}

export default DetalhesTitulo
