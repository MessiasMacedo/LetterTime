import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './EstrelaRating.css'

function EstrelaRating({ valor, aoMudar }) {
  const [hover, setHover] = useState(0)
  const somenteLeitura = !aoMudar
  const valorExibido = hover || valor

  return (
    <div className="estrela-rating" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={n <= valorExibido ? 'preenchida' : ''}
          onMouseEnter={() => !somenteLeitura && setHover(n)}
          onClick={() => aoMudar?.(n)}
          disabled={somenteLeitura}
        >
          <FaStar />
        </button>
      ))}
    </div>
  )
}

export default EstrelaRating
