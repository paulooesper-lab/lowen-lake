# Lowen Lake Rescue

Jogo 2D de resgate de animais em Lowen Lake. Você joga com Jim, Jane e Asha em 5 fases. Antes e depois de cada fase há cutscenes com imagens estáticas e diálogos, e o jogo termina com um epílogo.

## Como jogar no PC

- **Mais fácil:** dê dois cliques em `index.html`. Funciona no Chrome, no Edge e no Firefox, sem internet; só a fonte dos títulos vem da internet.
- **Se algo não carregar:** na pasta `hack animaçao`, rode
  `python -m http.server 8521 --directory lowen-lake-game` e abra http://localhost:8521

## Como publicar na web

A pasta inteira é um site estático. É só subir `lowen-lake-game/` para o GitHub Pages (pode ser uma pasta do repositório `lowen-lake`, por exemplo `/jogo`), Netlify, itch.io (como jogo HTML5, em um .zip da pasta) ou Cloudflare Pages.

## Controles

| Tecla | Ação |
|---|---|
| WASD / setas | andar |
| 1 · 2 · 3 (ou TAB / Q) | trocar entre Jim, Jane e Asha |
| ESPAÇO | habilidade: Jim empurra os perigos · Jane dá uma arrancada · Asha toca um riff |
| P / ESC | pausa (R reinicia, Q volta ao menu) |
| M | liga e desliga o som |
| L (no menu) | troca o idioma entre português e inglês. Também dá para escolher no item "Idioma" do menu. |
| ESPAÇO / ENTER / clique | avança os diálogos (ESC pula a cutscene) |

O anel embaixo de cada bicho diz quem pode pegá-lo:

- **Branco:** qualquer um.
- **Verde (Jim):** bicho pesado.
- **Rosa (Jane):** bicho arisco, que foge.
- **Vermelho (Asha):** bicho assustado. Primeiro acalme com o riff; depois qualquer um pega.

## Onde mexer

- **Roteiro, diálogos, bichos, perigos e posições:** tudo em `js/dados.js`.
- **Inglês:** todos os textos em inglês ficam em `js/idioma.js` (`UI.en` para a interface e `EN_DADOS` para o roteiro), na mesma ordem das falas de `dados.js`. Se você acrescentar uma fala em português, acrescente também a versão em inglês na mesma posição. O jogo começa no idioma do navegador e lembra a escolha do jogador.
- **Motor do jogo:** `js/jogo.js`. A tecla **F2** durante a fase mostra as áreas de colisão e as coordenadas do herói, o que ajuda a posicionar as coisas.
- **Som e música:** `js/audio.js`. São sintetizados na hora, sem arquivos de áudio.
- **Imagens:** ficam em `img/`. As artes novas do ChatGPT devem ser salvas como `ll__lg_<nome>.png` na pasta Downloads. Depois rode `python -I lowen-lake-game/ferramentas/organizar.py`. Esse script recorta os sprites, separa as folhas de sprites e reduz as cenas. Os originais ficam em `ferramentas/originais/`.
