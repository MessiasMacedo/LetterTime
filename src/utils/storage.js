const CHAVE = 'lettertime_dados'

const DADOS_INICIAIS = {
  listas: {
    queroVer: [],
    assisti: [],
    favoritos: [],
  },
  avaliacoes: {},
}

export function lerDados() {
  const bruto = localStorage.getItem(CHAVE)
  if (!bruto) return DADOS_INICIAIS
  return JSON.parse(bruto)
}

export function salvarDados(dados) {
  localStorage.setItem(CHAVE, JSON.stringify(dados))
}

export function estaNaLista(tituloId, nomeLista) {
  const dados = lerDados()
  return dados.listas[nomeLista].includes(tituloId)
}

export function alternarNaLista(tituloId, nomeLista) {
  const dados = lerDados()
  const lista = dados.listas[nomeLista]
  const jaEsta = lista.includes(tituloId)

  dados.listas[nomeLista] = jaEsta
    ? lista.filter((id) => id !== tituloId)
    : [...lista, tituloId]

  salvarDados(dados)
  return dados
}

export function obterAvaliacao(tituloId) {
  const dados = lerDados()
  return dados.avaliacoes[tituloId] ?? null
}

export function salvarAvaliacao(tituloId, nota, comentario) {
  const dados = lerDados()
  dados.avaliacoes[tituloId] = { nota, comentario }
  salvarDados(dados)
  return dados
}
