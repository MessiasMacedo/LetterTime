import { useState } from 'react'
import EstrelaRating from './EstrelaRating.jsx'
import './AvaliacaoForm.css'

function AvaliacaoForm({ avaliacaoAtual, aoSalvar }) {
  const [nota, setNota] = useState(avaliacaoAtual?.nota ?? 0)
  const [comentario, setComentario] = useState(avaliacaoAtual?.comentario ?? '')

  function aoEnviar(evento) {
    evento.preventDefault()
    aoSalvar(nota, comentario)
  }

  return (
    <form className="avaliacao-form" onSubmit={aoEnviar}>
      <EstrelaRating valor={nota} aoMudar={setNota} />
      <textarea
        placeholder="O que você achou?"
        value={comentario}
        onChange={(evento) => setComentario(evento.target.value)}
      />
      <button type="submit" className="avaliacao-form__botao" disabled={nota === 0}>
        Salvar avaliação
      </button>
    </form>
  )
}

export default AvaliacaoForm
