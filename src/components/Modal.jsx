import './Modal.css'

function Modal({ titulo, aoFechar, children }) {
  return (
    <div className="modal__fundo" onClick={aoFechar}>
      <div className="modal__caixa" onClick={(evento) => evento.stopPropagation()}>
        <div className="modal__cabecalho">
          <h2>{titulo}</h2>
          <button type="button" className="modal__fechar" onClick={aoFechar}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
