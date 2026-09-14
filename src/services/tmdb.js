const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w342'
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280'

function paraResumo(item) {
  const tipo = item.media_type === 'tv' ? 'serie' : 'filme'
  return {
    id: `${tipo}-${item.id}`,
    tipo,
    titulo: item.title || item.name,
    ano: (item.release_date || item.first_air_date || '').slice(0, 4),
    poster: item.poster_path ? `${IMG_URL}${item.poster_path}` : null,
  }
}

export async function buscarTitulos(termo) {
  const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(termo)}`
  const resposta = await fetch(url)
  if (!resposta.ok) throw new Error('Falha ao buscar na TMDB')

  const dados = await resposta.json()
  return dados.results
    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
    .map(paraResumo)
}

export async function buscarDetalhes(idComposto) {
  const [tipo, id] = idComposto.split('-')
  const endpoint = tipo === 'serie' ? 'tv' : 'movie'
  const url = `${BASE_URL}/${endpoint}/${id}?api_key=${API_KEY}&language=pt-BR`
  const resposta = await fetch(url)
  if (!resposta.ok) throw new Error('Falha ao buscar detalhes na TMDB')

  const item = await resposta.json()
  return {
    id: idComposto,
    tipo,
    titulo: item.title || item.name,
    ano: (item.release_date || item.first_air_date || '').slice(0, 4),
    sinopse: item.overview,
    tagline: item.tagline || null,
    generos: item.genres?.map((genero) => genero.name) ?? [],
    nota: item.vote_average,
    poster: item.poster_path ? `${IMG_URL}${item.poster_path}` : null,
    backdrop: item.backdrop_path ? `${BACKDROP_URL}${item.backdrop_path}` : null,
  }
}
