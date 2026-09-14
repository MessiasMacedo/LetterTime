# Requirements — LetterTime

## 1. Visão do Produto

### Nome
LetterTime

### Problema
Com o fim do TV Time, quem tinha o hábito de registrar os filmes e séries que assistia, dar notas e escrever opiniões pessoais perdeu essa ferramenta — e, junto com ela, todo o histórico acumulado. Não existe hoje uma forma simples e independente de organizar "o que eu já vi, o que eu achei e o que eu ainda quero ver".

### Público
Pessoas que assistem filmes e séries com frequência e querem manter um registro pessoal organizado — sem depender de um app que pode fechar as portas a qualquer momento e apagar tudo.

### Proposta de solução
Uma plataforma web onde a pessoa busca filmes e séries (usando dados reais da API do TMDB), organiza o que encontrou em três listas — **Quero Ver**, **Assisti** e **Favoritos** — e, para o que já assistiu, registra uma nota de 1 a 5 e um comentário pessoal curto. Tudo fica salvo no próprio navegador (localStorage), sem necessidade de conta ou login.

## 2. Objetivo do MVP

Ao final do projeto, a pessoa deve conseguir:
- Buscar um filme ou série pelo nome e ver resultados reais vindos da TMDB;
- Abrir a página de detalhes de um título e ver sinopse, gênero e nota da TMDB;
- Adicionar esse título a uma ou mais das três listas (Quero Ver, Assisti, Favoritos);
- Avaliar (nota de 1 a 5 + comentário curto) os títulos marcados como "Assisti";
- Visualizar e gerenciar todas as suas listas em uma página dedicada, removendo itens quando quiser;
- Ter tudo isso preservado entre visitas, mesmo fechando e reabrindo o navegador.

## 3. Funcionalidades

### F01 — Buscar Filmes e Séries

**Descrição:** A pessoa digita um termo em um campo de busca e vê os resultados correspondentes vindos da API do TMDB, exibidos em grade com pôster, título e ano de lançamento.

**Critérios de aceitação:**
- [ ] Ao digitar um termo e confirmar a busca, os resultados aparecem em um grid de cartões.
- [ ] Cada cartão mostra pôster, título e ano de lançamento.
- [ ] Clicar em um cartão leva à página de detalhes daquele título (`/titulo/:id`).

**Estados:**
- [ ] Inicial — campo de busca vazio, nenhuma busca realizada ainda
- [ ] Carregando — aguardando resposta da API
- [ ] Sucesso — resultados exibidos
- [ ] Vazio — busca realizada, mas sem resultados
- [ ] Erro — falha ao consultar a API

### F02 — Ver Detalhes do Título

**Descrição:** Página dedicada a um filme ou série específico, acessada por rota dinâmica, com pôster em destaque, sinopse, gênero(s) e nota média da TMDB.

**Critérios de aceitação:**
- [ ] A rota `/titulo/:id` carrega os dados do título correspondente na TMDB.
- [ ] São exibidos pôster, título, sinopse, gênero(s) e nota média da TMDB.
- [ ] Os controles de "adicionar a uma lista" (F03) e de avaliação (F04, quando aplicável) aparecem nessa mesma página.

**Estados:**
- [ ] Carregando — aguardando dados da API
- [ ] Sucesso — dados exibidos
- [ ] Erro — id inválido ou falha na API

### F03 — Adicionar a uma Lista

**Descrição:** A partir da página de detalhes, a pessoa marca o título como "Quero Ver", "Assisti" e/ou "Favorito".

**Critérios de aceitação:**
- [ ] Existe um controle (botão/toggle) para cada uma das três listas.
- [ ] O controle reflete visualmente se o título já está naquela lista.
- [ ] Um título pode estar em mais de uma lista ao mesmo tempo (ex.: Assisti + Favorito).
- [ ] A escolha é salva no localStorage e continua lá após recarregar a página.

**Estados:**
- [ ] Inicial — título ainda não está em nenhuma lista
- [ ] Sucesso — título marcado em uma ou mais listas

### F04 — Avaliar e Comentar

**Descrição:** Para títulos marcados como "Assisti", a pessoa registra uma nota de 1 a 5 e um comentário pessoal curto.

**Critérios de aceitação:**
- [ ] A opção de avaliar só fica disponível se o título estiver na lista "Assisti".
- [ ] A nota (1 a 5) e o comentário são salvos no localStorage, vinculados àquele título.
- [ ] É possível editar a nota/comentário depois de salvos.

**Estados:**
- [ ] Inicial — título assistido, ainda sem avaliação
- [ ] Sucesso — avaliação salva

### F05 — Minhas Listas

**Descrição:** Página que reúne os títulos organizados pelas três listas, permitindo revisar e remover itens.

**Critérios de aceitação:**
- [ ] A página exibe os títulos agrupados por lista (Quero Ver / Assisti / Favoritos).
- [ ] Cada item mostra pôster, título e, se avaliado, a nota dada.
- [ ] É possível remover um título de uma lista diretamente por essa página.

**Estados:**
- [ ] Vazio — lista sem nenhum item
- [ ] Sucesso — itens exibidos

## 4. Fora do Escopo

- Criação de conta ou login — os dados ficam salvos localmente, no navegador de cada pessoa
- Sincronização entre dispositivos diferentes
- Recomendações personalizadas por algoritmo
- Interação social entre usuários (comentários públicos, seguir outras pessoas, etc.)
- Informação de "onde assistir" (disponibilidade em serviços de streaming)
