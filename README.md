# LetterTime

MVP de um app para registrar filmes e séries assistidos, organizar em listas pessoais e avaliar com nota + comentário.

Projeto acadêmico (CP1 — Criando o novo TV Time), desenvolvido seguindo Spec Driven Development: a documentação em [`docs/`](./docs) foi escrita antes do código.

## Integrantes

- Messias Macedo — RM: 573247
- Fabrício Zanzarinne — RM: 572631

## Problema

Com o fim do TV Time, quem tinha o hábito de registrar os filmes e séries que assistia, dar notas e escrever opiniões pessoais perdeu essa ferramenta — e, junto com ela, todo o histórico acumulado. Não existe hoje uma forma simples e independente de organizar "o que eu já vi, o que eu achei e o que eu ainda quero ver".

## Solução

Uma plataforma web onde a pessoa busca filmes e séries (usando dados reais da API do TMDB), organiza o que encontrou em três listas — **Quero Ver**, **Assisti** e **Favoritos** — e, para o que já assistiu, registra uma nota de 1 a 5 e um comentário pessoal curto. Tudo fica salvo no próprio navegador (localStorage), sem necessidade de conta ou login.

## Tecnologias

- React (Vite)
- React Router (múltiplas páginas, layout comum, rota dinâmica `/titulo/:id`)
- react-icons
- localStorage (persistência local, sem backend)

## API usada

[TMDB (The Movie Database)](https://developer.themoviedb.org/docs/getting-started) — busca de títulos e dados de detalhes (pôster, sinopse, gênero, nota, imagem de fundo).

## Funcionalidades

- **Buscar filmes e séries** por nome, com resultados reais da TMDB.
- **Ver detalhes** de um título (pôster, sinopse, gênero, nota da TMDB).
- **Adicionar a uma lista** — Quero Ver, Assisti e/ou Favoritos (não são exclusivas entre si).
- **Avaliar e comentar** — nota de 1 a 5 e comentário curto, disponível só para títulos marcados como "Assisti".
- **Minhas Listas** — visão de tudo que foi organizado, agrupado por lista, com opção de remover.

## Uso de IA

O desenvolvimento foi feito com apoio do Claude (Anthropic), seguindo a metodologia de Spec Driven Development: a IA ajudou a estruturar e escrever a documentação (`requirements.md`, `architecture.md`, `references.md`) antes de qualquer código, e depois a implementar o código com base nessa especificação, sempre em conversa com os integrantes do grupo.

As decisões técnicas (que bibliotecas usar, como estruturar os componentes, como persistir os dados), estéticas (paleta de cores, layout da página de detalhes) e de negócio (quais funcionalidades entram no MVP, quais regras cada uma segue) foram feitas pelos integrantes do grupo — a IA implementou e sugeriu, mas as escolhas finais foram sempre revisadas e aprovadas por nós.

## Rodando o projeto

```bash
npm install
npm run dev
```

Crie um arquivo `.env` na raiz (veja `.env.example`) com uma chave de API do TMDB:

```
VITE_TMDB_API_KEY=sua_chave_aqui
```

## Documentação

- [Requisitos](./docs/requirements.md)
- [Arquitetura](./docs/architecture.md)
- [Referências](./docs/references/references.md)

## Link
link vercel: letter-time.vercel.app
