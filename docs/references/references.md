# References — LetterTime

## 1. Objetivo

As referências abaixo orientam as decisões de experiência e interface do LetterTime. A referência principal é o próprio Letterboxd, já que o projeto se propõe a resolver o mesmo tipo de problema (registro pessoal de filmes/séries assistidos). As outras duas vêm de fora do universo de filmes/séries, mas trazem padrões de lista e avaliação pessoal que também se aplicam aqui.

## 2. Referência 01 — Letterboxd

### Fonte
https://letterboxd.com

### Imagem

![Referência 01](./imagens/referencia-01.png)

### O que observamos?
O Letterboxd organiza a experiência em torno de três ações simples sobre um título: marcar como assistido, adicionar a uma lista/watchlist e avaliar com estrelas + uma resenha curta. Os cartões de filme são compactos (pôster + título + ano) e repetem o mesmo padrão visual em qualquer grade — busca, listas ou perfil.

### O que vamos aproveitar?
A estrutura de três listas (Quero Ver / Assisti / Favoritos) e o padrão de avaliação por estrelas (1 a 5) diretamente na página de detalhes do título, sem precisar de uma tela separada.

### Como será adaptado?
O LetterTime usa a mesma lógica de cartão compacto (pôster + título + ano) em `TituloCard`, mas com paleta própria: fundo preto, destaques em roxo (em vez do laranja/verde do Letterboxd), já que o projeto não pode simplesmente copiar a identidade visual do produto original.

## 3. Referência 02 — Spotify (Playlists/Curtidas)

### Fonte
https://www.spotify.com

### Imagem

![Referência 02](./imagens/referencia-02.png)

### O que observamos?
O Spotify usa tema escuro como padrão, com uma única cor de destaque (verde) usada apenas em pontos específicos — botões ativos, ícones selecionados, barra de progresso — enquanto o resto da interface fica em tons de cinza/preto. Isso mantém a leitura limpa mesmo com muita informação na tela.

### O que vamos aproveitar?
O padrão de "uma cor de destaque sobre fundo escuro": no LetterTime, o roxo cumpre esse papel (botões de ação, estados ativos de lista, nota em destaque), evitando poluir a tela com muita cor.

### Como será adaptado?
Definido como variáveis CSS em `index.css` (ex.: `--cor-fundo: #121212`, `--cor-destaque: roxo`), reaproveitadas em todos os componentes em vez de cores fixas espalhadas pelo código.

## 4. Referência 03 — Todoist (Listas e Checklists)

### Fonte
https://todoist.com

### Imagem

![Referência 03](./imagens/referencia-03.png)

### O que observamos?
Itens de uma lista aparecem com uma ação de remover/concluir sempre visível ou a um clique de distância, e cada lista tem um cabeçalho claro separando os grupos — sem precisar entrar em outra tela para gerenciar o que já foi adicionado.

### O que vamos aproveitar?
A página "Minhas Listas" do LetterTime segue esse padrão: os três grupos (Quero Ver / Assisti / Favoritos) aparecem com cabeçalho próprio, e cada item tem uma ação de remover diretamente ali, sem navegar para outra página.

### Como será adaptado?
Implementado no componente `ListaSecao`, que recebe os itens de uma lista e uma função `aoRemover` — mantendo a página `MinhasListas.jsx` simples, apenas orquestrando os dados vindos do `localStorage`.

---

**Pendente:** salvar os 3 prints de tela em `docs/references/imagens/` com os nomes `referencia-01.png` (Letterboxd), `referencia-02.png` (Spotify) e `referencia-03.png` (Todoist).
