# Architecture — LetterTime

## 1. Visão Geral

A aplicação é uma SPA em React com três páginas principais, todas dentro de um layout comum (header com nome do app e navegação). Não há backend: os dados de filmes/séries vêm da API do TMDB, e as listas/avaliações da pessoa ficam salvas no `localStorage` do navegador.

Cada página é responsável por ler/escrever seus próprios dados no `localStorage` quando monta ou quando o usuário faz uma ação — não há estado global compartilhado entre páginas (evitamos Context API de propósito, já que não foi visto em aula). Como só uma página fica montada por vez (a navegação troca de rota), isso é suficiente: ao entrar em "Minhas Listas", por exemplo, a página relê o `localStorage` do zero.

## 2. Estrutura de Pastas

```text
src/
├── components/
│   ├── Layout.jsx
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── ResultadosGrid.jsx
│   ├── TituloCard.jsx
│   ├── ListaBotoes.jsx
│   ├── AvaliacaoForm.jsx
│   ├── EstrelaRating.jsx
│   └── ListaSecao.jsx
├── pages/
│   ├── Inicio.jsx
│   ├── DetalhesTitulo.jsx
│   └── MinhasListas.jsx
├── services/
│   └── tmdb.js
├── utils/
│   └── storage.js
├── App.jsx
├── main.jsx
└── index.css
```

`services/tmdb.js` centraliza as chamadas `fetch` para a API do TMDB (busca e detalhes), pra não repetir a mesma lógica em duas páginas. `utils/storage.js` centraliza as funções de ler/gravar listas e avaliações no `localStorage`, pelo mesmo motivo. Nenhum dos dois usa bibliotecas ou padrões além de funções JavaScript simples.

`index.css` concentra a paleta de cores do app (preto e roxo, inspirada no Letterboxd) como variáveis CSS, reaproveitadas em todos os componentes.

## 3. Páginas e Rotas

| Página | Rota | Objetivo |
|---|---|---|
| Início | `/` | Buscar filmes/séries na TMDB e ver os resultados em grid |
| Detalhes do Título | `/titulo/:id` | Ver informações completas de um título, marcar em listas e avaliar |
| Minhas Listas | `/minhas-listas` | Ver e gerenciar os títulos organizados pelas 3 listas |

Todas as rotas ficam aninhadas dentro do `Layout` (rota raiz), que renderiza o `Header` fixo e um `<Outlet />` pra página atual.

## 4. Componentes

| Componente | Responsabilidade | Props |
|---|---|---|
| `Layout` | Estrutura comum: `Header` + `<Outlet />` | — |
| `Header` | Nome do app + links de navegação (Início / Minhas Listas) | — |
| `SearchBar` | Campo de busca controlado + botão de submit | `valor`, `aoMudar`, `aoBuscar` |
| `ResultadosGrid` | Organiza os resultados da busca em grade, trata estado vazio | `itens`, `status` |
| `TituloCard` | Cartão de pôster + título + ano, usado na busca e nas listas | `titulo` (objeto), `aoClicar` |
| `ListaBotoes` | Os 3 botões de marcar lista (Quero Ver / Assisti / Favorito) | `tituloId`, `listasAtuais`, `aoAlternar` |
| `AvaliacaoForm` | Nota (1–5) + campo de comentário pessoal | `tituloId`, `avaliacaoAtual`, `aoSalvar` |
| `EstrelaRating` | Exibe/permite escolher uma nota de 1 a 5 com ícones de estrela | `valor`, `aoMudar` (opcional) |
| `ListaSecao` | Uma seção (uma das 3 listas) dentro de "Minhas Listas" | `titulo`, `itens`, `aoRemover` |

Páginas (`Inicio`, `DetalhesTitulo`, `MinhasListas`) não recebem props externas — pegam o que precisam da rota (`useParams`) ou do `localStorage`, e passam dados para os componentes acima via props.

## 5. Estado da Aplicação

| Estado | Onde será controlado? | Por quê? |
|---|---|---|
| `termoBusca` | Página Início | Input controlado do campo de busca |
| `resultadosBusca` | Página Início | Resultados vindos da TMDB para o termo buscado |
| `statusBusca` | Página Início | Controla os estados da F01 (inicial / carregando / sucesso / vazio / erro) |
| `detalhesTitulo` | Página Detalhes do Título | Dados do título vindos da TMDB |
| `statusDetalhes` | Página Detalhes do Título | Controla os estados da F02 (carregando / sucesso / erro) |
| `listasDoTitulo` | Página Detalhes do Título | Em quais das 3 listas esse título específico está — lido do `localStorage` ao montar, atualizado a cada clique em `ListaBotoes` |
| `avaliacaoDoTitulo` | Página Detalhes do Título | Nota + comentário desse título — lido/gravado no `localStorage` |
| `listasCompletas` | Página Minhas Listas | Todos os títulos salvos, agrupados por lista — lido do `localStorage` ao montar; atualizado localmente (e regravado) ao remover um item |

## 6. useEffect

| Efeito | Quando acontece? | O que faz? |
|---|---|---|
| Buscar na TMDB | Ao confirmar uma busca | Chama `services/tmdb.js` e atualiza `resultadosBusca`/`statusBusca` |
| Buscar detalhes do título | Ao montar a página de Detalhes (ou o `:id` da rota mudar) | Chama `services/tmdb.js` para aquele id e atualiza `detalhesTitulo`/`statusDetalhes` |
| Ler dados salvos do título | Ao montar a página de Detalhes | Lê `utils/storage.js` para saber se esse título já está em alguma lista e/ou já foi avaliado |
| Ler todas as listas | Ao montar a página Minhas Listas | Lê `utils/storage.js` e carrega os itens agrupados por lista |

## 7. Dependências

| Biblioteca | Uso | Motivo |
|---|---|---|
| `react-router-dom` | Navegação entre páginas, layout com `Outlet`, rota dinâmica `/titulo/:id` | Requisito do projeto |
| `react-icons` | Ícones (estrelas de avaliação, ícones de navegação e das listas) | Requisito do projeto |

Chamadas HTTP usam `fetch`, nativo do navegador — sem biblioteca extra (ex.: axios) não vista em aula.
