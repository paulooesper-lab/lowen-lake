# Echo Ridge · site da região (universo Lowen Lake)

Site de uma página só, com navegação **horizontal**: roda do mouse, setas do teclado, arrastar no celular, menu do topo ou as setas de baixo. Nada rola para baixo, exceto partes específicas (faixas de cards, que rolam para os lados, e textos longos em telas pequenas).

Para abrir, dê dois cliques no `index.html`, ou rode um servidor local (`python -m http.server 8533` dentro da pasta). No app do Claude, use o launch **echo-ridge-site**.

## Seções
1. **Início**: foto de abertura, lema e fatos.
2. **Mapa interativo**: mapa ilustrado com 12 ícones clicáveis. Cada um abre um cartão com foto e texto.
3. **Curiosidades**: 10 cards com foto.
4. **Cartões postais**: 10 postais em foto. Clique para virar e ler a mensagem no verso.
5. **Fauna**: 6 categorias (mamíferos, aves, peixes e anfíbios, répteis, insetos e "não confirmados"). As **aves tocam o canto real**.
6. **Visite**: estações, trilhas, como chegar e regras da montanha.
7. **Créditos**: inclui os autores e as licenças de cada som.

O idioma (PT/EN) fica no canto superior direito, e a escolha é lembrada.

## Como trocar uma IMAGEM
- **Jeito mais fácil:** salve a nova imagem **por cima do arquivo**, com o mesmo nome e na mesma pasta. Exemplo: `img/fauna/aves/coruja-barrada.jpg`.
- **Outro jeito:** abra `js/dados.js` e mude o caminho no campo `imagem`, `foto` ou `icone`.
- Se faltar um arquivo, o site mostra um quadro listrado com o caminho esperado. Assim fica fácil ver o que falta.

| Pasta | Conteúdo | Tamanho sugerido |
|---|---|---|
| `img/hero/` | foto de abertura | 2000 px, 16:9 |
| `img/mapa/base.jpg` | mapa ilustrado | 3:2 |
| `img/icones/` | ícones do mapa, PNG transparente | 200 px |
| `img/postais/` | fotos dos postais | 3:2 |
| `img/curiosidades/` | fotos das curiosidades | 3:2 |
| `img/fauna/<categoria>/` | fotos dos animais | 3:2 |
| `img/marca/emblema.png` | logo (também usado como favicon) | PNG transparente |

Se você **trocar o mapa**, ajuste a posição dos ícones em `js/dados.js` → `mapa.pontos`. Os valores `x` e `y` são porcentagens (0 a 100) a partir do canto superior esquerdo.

## Como trocar um SOM de ave
- Substitua `audio/aves/<id>.mp3`, mantendo o nome, e atualize o crédito em `js/creditos-sons.js`.
- Ou edite a lista `SONS` em `ferramentas/baixar_sons.py` com o título de outro arquivo do Wikimedia Commons, apague o MP3 antigo e rode:
  `python -I echo-ridge-site/ferramentas/baixar_sons.py`
  O script baixa o arquivo, corta em 30 s com fade e regrava os créditos.

## Gerar imagens de novo no ChatGPT
1. `ferramentas/fila-chatgpt.js` tem todos os prompts. Cole no console de chatgpt.com, deixando no array só as imagens que quiser refazer.
2. Os downloads saem como `er__<nome>.png`.
3. Rode `python -I echo-ridge-site/ferramentas/organizar.py`. O script otimiza as imagens e coloca cada uma na pasta certa. Os originais ficam em `ferramentas/originais/`.

## Conferir se falta algo
`python -I echo-ridge-site/ferramentas/verificar.py` lista todas as imagens e sons citados em `js/dados.js` e avisa os que faltam.

## Textos
Todos os textos estão em `js/dados.js`, no formato `{ pt: "...", en: "..." }`. Os rótulos fixos da interface (menu, botões) ficam no início de `js/app.js` (objeto `UI`). Depois de editar, aumente o `?v=` das tags `<script>` e `<link>` no `index.html` para o navegador não usar a versão antiga em cache.

## Cânone × invenção
Vêm do dossiê de Lowen Lake: Echo Falls, Great Pine, Minas que Sussurram, Dead Pine Lake, Northend Fork, Área 52, SR-55, o hidroavião, Crooked River, Puma Host, Águia Vermelha e White Moth Man. Foram **inventados para este site**: Hawk Knob Fire Tower, Cedar Bend Campground, o guarda florestal Dale, a altitude de 1.840 m e as mensagens dos postais.
