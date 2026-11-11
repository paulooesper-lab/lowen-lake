# Echo Ridge · site da região (universo Lowen Lake)

Site de uma página só, com navegação **horizontal**: roda do mouse, setas do teclado, arrastar no celular, menu do topo ou as setas de baixo. Nada rola para baixo, exceto partes específicas: faixas de cards (que rolam para os lados), a lista de avistamentos, o guia e as telas pequenas.

Online: https://paulooesper-lab.github.io/lowen-lake/echo-ridge/
Local: dois cliques no `index.html`, ou `python -m http.server 8533` dentro da pasta (launch **echo-ridge-site** no app do Claude).

## Seções
1. **Início**: foto de abertura da estação, efeito animado (pétalas, vaga-lumes sincronizados, folhas ou neve) e o cartão "Nesta estação".
2. **Mapa**: 13 ícones clicáveis e 4 trilhas desenhadas (clique na linha para ver distância, tempo, desnível e perfil de altitude). Tem zoom (roda, + / −, duplo clique) e arrastar. As camadas Lugares e Trilhas ligam e desligam.
3. **Curiosidades**: 10 cards.
4. **Postais**: 10 postais que viram ao clicar, mais o **Crie seu postal**, que gera um PNG com frente e verso.
5. **Fauna**: 5 categorias. Aves, alce, coiote, rã-touro, cigarra e esperança têm som real.
6. **Lendas**: 7 criaturas e 16 avistamentos no mapa (1883–2026), com filtro por criatura, linha do tempo e o caderno do guarda Dale. O símbolo no canto leva ao dossiê secreto da Área 52.
7. **História**: linha do tempo com fotos antigas.
8. **Camping**: 4 opções, regras dos ursos e um checklist "o que levar" (fica salvo no navegador).
9. **Guia do parque**: abas Equipe (com a líder escoteira Cora Benning em destaque), Boas maneiras, Regras, Caça e pesca, e Como chegar.
10. **Atividades**: jogos "De quem é essa pegada?" e "Quem está cantando?".
11. **Créditos**: inclui o autor e a licença de cada som.

No topo ficam o **seletor de estação** (troca a foto de abertura, os mapas e o efeito; o padrão segue o mês atual), o botão **Ambiente** (floresta de dia, riacho ou noite, em loop) e o **PT/EN**.

## Como trocar uma IMAGEM
- **Jeito mais fácil:** salve a nova imagem **por cima do arquivo**, com o mesmo nome e na mesma pasta.
- **Outro jeito:** abra `js/dados.js` e mude o caminho.
- Se faltar um arquivo, o site mostra um quadro listrado com o caminho esperado.
- Se faltar uma imagem de estação (`img/hero/<estação>.jpg` ou `img/mapa/<estação>.jpg`), o site usa a de verão (`inicio.jpg` / `base.jpg`).

| Pasta | Conteúdo |
|---|---|
| `img/hero/` | fotos de abertura: inicio (verão), primavera, outono, inverno (16:9) |
| `img/mapa/` | mapas: base (verão), primavera, outono, inverno (3:2, mesmo enquadramento) |
| `img/icones/` | ícones do mapa (PNG transparente) |
| `img/postais/`, `img/curiosidades/` | fotos 3:2 |
| `img/fauna/<categoria>/` | animais, e `fauna/lendas/` para as criaturas |
| `img/historia/` | fotos antigas da linha do tempo |
| `img/pegadas/` | fotos das pegadas do jogo |
| `img/camping/`, `img/guia/` | camping, guardas, escoteira, caça e pesca |

Se você **trocar um mapa**, mantenha o mesmo enquadramento ou ajuste em `js/dados.js` as posições `x`/`y` (0 a 100, em %) de `mapa.pontos`, `trilhas[].pontos` e `lendas.avistamentos`.

## Como trocar um SOM
- Substitua o MP3 (`audio/aves/`, `audio/fauna/` ou `audio/ambiente/`), mantendo o nome, e atualize o crédito em `js/creditos-sons.js`.
- Ou edite a lista `SONS` em `ferramentas/baixar_sons.py` (título de um arquivo do Wikimedia Commons ou id do xeno-canto), apague o MP3 antigo e rode:
  `python -I echo-ridge-site/ferramentas/baixar_sons.py`
  O script baixa, corta, ajusta o volume, remonta as paisagens sonoras (`AMBIENTES`) e regrava os créditos.

## Gerar imagens de novo no ChatGPT
- `ferramentas/fila-chatgpt.js` (lote 1) e `ferramentas/fila-chatgpt-2.js` (lote 2) têm todos os prompts. Os mapas de estação são feitos **anexando o mapa base** e pedindo "o mesmo mapa" na nova estação.
- Os downloads saem como `er__<nome>.png`. Depois rode `python -I echo-ridge-site/ferramentas/organizar.py`; os originais ficam em `ferramentas/originais/`.
- Para conferir se falta algo: `python -I echo-ridge-site/ferramentas/verificar.py`.

## Textos
Tudo está em `js/dados.js` no formato `{ pt: "...", en: "..." }`. Os rótulos fixos da interface ficam no objeto `UI` no início de `js/app.js`. Depois de editar, aumente o `?v=` no `index.html`.

## Cânone × invenção
Vêm do dossiê de Lowen Lake: Echo Falls, Great Pine, Minas que Sussurram, Dead Pine Lake, Northend Fork, Área 52, SR-55, o hidroavião, Crooked River, Puma Host, Águia Vermelha, White Moth Man, Drypine Hag, Mossfoot e Gigantus Silvestris.

**Inventados para este site:**
- Pessoas: os guardas Rosa Delgado, Dale Whitaker, Marcus Reed e Linda Hayes, e a líder escoteira Cora Benning (Tropa 17).
- Lugares: Hawk Knob Fire Tower, Cedar Bend Campground, Lakeview Primitive Sites, Hawk Knob Cabins e o Prado dos Alces.
- Histórias: os avistamentos com datas, a linha do tempo (Echo & Co. Mining etc.), as regras e temporadas de caça e as mensagens dos postais.
- Fauna e dados: os alces no norte da serra e a altitude de 1.840 m.
