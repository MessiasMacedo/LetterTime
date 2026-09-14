# LetterTime

MVP de um app para registrar filmes e séries assistidos, organizar em listas pessoais e avaliar com nota + comentário — inspirado no TV Time (descontinuado) e no Letterboxd.

Projeto acadêmico (CP1 — Criando o novo TV Time), desenvolvido seguindo Spec Driven Development: a documentação em [`docs/`](./docs) foi escrita antes do código.

## Documentação

- [Requisitos](./docs/requirements.md)
- [Arquitetura](./docs/architecture.md)
- [Referências](./docs/references/references.md)

## Stack

- React (Vite)
- React Router
- react-icons
- API do TMDB (dados de filmes/séries)
- localStorage (persistência, sem backend)

## Rodando o projeto

```bash
npm install
npm run dev
```

Crie um arquivo `.env` na raiz (veja `.env.example`) com uma chave de API do TMDB:

```
VITE_TMDB_API_KEY=sua_chave_aqui
```
