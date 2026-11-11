/* ECHO RIDGE · motor do site.
   Conteúdo fica em js/dados.js — aqui só a lógica. Seções:
   textos fixos · utilidades · navegação · estações · ambiente · mapa (+zoom, trilhas) · curiosidades
   · postais (+criador) · fauna (+sons) · lendas · história · camping · guia · atividades · créditos */
(() => {
  const D = window.ER;
  const SONS = window.ER_SONS || {};

  /* ---------- textos fixos da interface ---------- */
  const UI = {
    pt: {
      inicio: "Início", mapa: "Mapa", curiosidades: "Curiosidades", postais: "Postais", fauna: "Fauna", lendas: "Lendas",
      historia: "História", camping: "Camping", guia: "Guia do parque", atividades: "Atividades", creditos: "Créditos",
      licenca: "Licença", licencaSub: "Monte sua licença de pesca ou de caça de Lowen Lake, com sua foto, e imprima no tamanho de um documento de carteira.",
      gerarLicenca: "Gerar minha licença →",
      explorar: "Explorar o mapa", dica: "Role, arraste ou use as setas →",
      mapaSub: "Clique nos ícones para conhecer cada lugar e nas linhas coloridas para ver as trilhas.",
      dicaZoom: "Role sobre o mapa ou use + / − para ampliar · arraste para mover",
      curiosidadesSub: "O que os moradores contam (e o que é verdade de fato).",
      postaisSub: "Clique num postal para ler o verso.", crieSeu: "Crie seu postal",
      faunaSub: "Os bichos reais das montanhas, por categoria. Aperte o play para ouvir sons gravados na natureza.",
      historiaSub: "De trilhas antigas a luzes no céu: como a serra chegou até aqui.",
      atividadesSub: "Teste o que você aprendeu sobre a serra.",
      pontos: "Lugares do mapa", pontosSub: "Escolha um ícone, um nome ou uma trilha.", trilhasTit: "Trilhas",
      lista: "Todos os lugares", camadaLugares: "Lugares", camadaTrilhas: "Trilhas",
      distancia: "Distância", tempo: "Tempo", desnivel: "Desnível", dificuldade: "Dificuldade", perfil: "Perfil de altitude", destaquesTit: "No caminho",
      virar: "virar ↻", saudacao: "Lembranças de", para: "Para:", destino: ["Família Walker", "Lowen Lake", "Condado de Lowen Lake"],
      tamanho: "Tamanho", onde: "Onde", ouvir: "Ouvir", parar: "Parar", especies: "espécies",
      estacaoTit: "Nesta estação", estacoesRot: "Estação do ano",
      ambiente: "Ambiente", desligado: "Desligado",
      todas: "Todas", ate: "Avistamentos até", avist: "avistamentos", conselho: "Se encontrar", notasDale: "Caderno do guarda Dale", testemunha: "Testemunha",
      nenhum: "Nenhum avistamento com esses filtros.",
      vagas: "Vagas", preco: "Preço", temporada: "Temporada", regrasCamping: "Regras do camping", levar: "O que levar", marcados: "itens prontos",
      abaEquipe: "Equipe", abaBoas: "Boas maneiras", abaRegras: "Regras", abaCaca: "Caça e pesca", abaChegar: "Como chegar",
      destaqueCom: "Destaque da comunidade", guardas: "Guardas florestais", etiqueta: "Etiqueta na trilha",
      temporadas: "Temporadas de caça", especie: "Espécie", periodo: "Período", situacao: "Situação", pesca: "Pesca",
      jogoPegadas: "De quem é essa pegada?", jogoSons: "Quem está cantando?", certo: "Certo!", errado: "Quase! Era: ",
      proxima: "Próxima →", deNovo: "Jogar de novo", acertos: "acertos", rodada: "Rodada", ouvirSom: "Ouvir o som",
      fimPegadas: "Você é um rastreador de verdade.", fimSons: "Seu ouvido está afiado.",
      escolhaFoto: "Escolha a foto", tituloPostal: "Título", mensagem: "Mensagem", assinatura: "Assinatura",
      incluirVerso: "Incluir o verso com a mensagem", baixar: "Baixar PNG",
      msgPadrao: "Lembranças de Echo Ridge! A neblina sobe, o eco responde e eu queria que você estivesse aqui.",
      erroBaixar: "Para baixar, abra o site online ou por um servidor local (o navegador bloqueia imagens abertas direto do disco).",
      sons: "Sons", sonsTxt: "Gravações reais da natureza, do Wikimedia Commons (xeno-canto, Yellowstone Sound Library e outros). Cortadas e com volume ajustado.",
      imagensTit: "Imagens", trocar: "Todas as imagens e sons podem ser trocados: veja LEIA-ME.md na pasta do site.",
      sobre: "Sobre", licencaSom: "licença", fonte: "fonte", inventado: "Guardas, a líder escoteira, camping e regras do parque são ficção criada para este site.",
    },
    en: {
      inicio: "Home", mapa: "Map", curiosidades: "Curiosities", postais: "Postcards", fauna: "Wildlife", lendas: "Legends",
      historia: "History", camping: "Camping", guia: "Park guide", atividades: "Activities", creditos: "Credits",
      licenca: "License", licencaSub: "Make your own Lowen Lake fishing or hunting license with your photo and print it at wallet-card size.",
      gerarLicenca: "Make my license →",
      explorar: "Explore the map", dica: "Scroll, drag or use the arrows →",
      mapaSub: "Click the icons to discover each place and the colored lines to see the trails.",
      dicaZoom: "Scroll over the map or use + / − to zoom · drag to move",
      curiosidadesSub: "What the locals say (and what is actually true).",
      postaisSub: "Click a postcard to read the back.", crieSeu: "Make your postcard",
      faunaSub: "The real animals of the mountains, by category. Press play to hear sounds recorded in the wild.",
      historiaSub: "From ancient trails to lights in the sky: how the ridge got here.",
      atividadesSub: "Test what you've learned about the ridge.",
      pontos: "Places on the map", pontosSub: "Pick an icon, a name or a trail.", trilhasTit: "Trails",
      lista: "All places", camadaLugares: "Places", camadaTrilhas: "Trails",
      distancia: "Distance", tempo: "Time", desnivel: "Elevation gain", dificuldade: "Difficulty", perfil: "Elevation profile", destaquesTit: "Along the way",
      virar: "flip ↻", saudacao: "Greetings from", para: "To:", destino: ["The Walker family", "Lowen Lake", "Lowen Lake County"],
      tamanho: "Size", onde: "Where", ouvir: "Play", parar: "Stop", especies: "species",
      estacaoTit: "This season", estacoesRot: "Season",
      ambiente: "Ambience", desligado: "Off",
      todas: "All", ate: "Sightings up to", avist: "sightings", conselho: "If you meet it", notasDale: "Ranger Dale's notebook", testemunha: "Witness",
      nenhum: "No sightings with these filters.",
      vagas: "Sites", preco: "Price", temporada: "Season", regrasCamping: "Campground rules", levar: "What to bring", marcados: "items ready",
      abaEquipe: "Team", abaBoas: "Good manners", abaRegras: "Rules", abaCaca: "Hunting & fishing", abaChegar: "Getting here",
      destaqueCom: "Community highlight", guardas: "Park rangers", etiqueta: "Trail etiquette",
      temporadas: "Hunting seasons", especie: "Species", periodo: "Period", situacao: "Status", pesca: "Fishing",
      jogoPegadas: "Whose track is this?", jogoSons: "Who's calling?", certo: "Correct!", errado: "Close! It was: ",
      proxima: "Next →", deNovo: "Play again", acertos: "correct", rodada: "Round", ouvirSom: "Play the sound",
      fimPegadas: "You're a real tracker.", fimSons: "Your ears are sharp.",
      escolhaFoto: "Pick the photo", tituloPostal: "Title", mensagem: "Message", assinatura: "Signature",
      incluirVerso: "Include the back with the message", baixar: "Download PNG",
      msgPadrao: "Greetings from Echo Ridge! The fog rises, the echo answers and I wish you were here.",
      erroBaixar: "To download, open the site online or through a local server (browsers block images opened straight from disk).",
      sons: "Sounds", sonsTxt: "Real field recordings from Wikimedia Commons (xeno-canto, Yellowstone Sound Library and others). Trimmed and volume-matched.",
      imagensTit: "Images", trocar: "Every image and sound can be swapped: see LEIA-ME.md in the site folder.",
      sobre: "About", licencaSom: "license", fonte: "source", inventado: "The rangers, the scout leader, the campgrounds and the park rules are fiction made for this site.",
    },
  };

  /* ---------- utilidades ---------- */
  const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sem storage */ } };
  const ler = (k, padrao) => { try { const v = localStorage.getItem(k); return v == null ? padrao : JSON.parse(v); } catch (e) { return padrao; } };
  let lang = ler("er-idioma2", null) || (navigator.language.startsWith("pt") ? "pt" : "en");
  const t = v => (v == null ? "" : typeof v === "object" && !Array.isArray(v) ? (v[lang] ?? v.pt ?? "") : v);
  const ui = k => UI[lang][k] ?? k;
  const caminho = (obj, p) => p.split(".").reduce((o, k) => o?.[k], obj);
  const $ = (s, e = document) => e.querySelector(s);
  const $$ = (s, e = document) => [...e.querySelectorAll(s)];
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const lista = arr => (arr || []).map(i => `<li>${esc(i)}</li>`).join("");
  const embaralhar = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const todasEspecies = () => D.fauna.flatMap(c => c.especies);

  /* imagem com aviso visível quando o arquivo não existe; carrega quando o painel fica perto */
  function foto(src, alt = "", cls = "foto") {
    const box = el("div", cls);
    const img = new Image();
    img.alt = alt; img.decoding = "async";
    img.onerror = () => { box.classList.add("sem-imagem"); box.dataset.arquivo = src; };
    img.dataset.lazy = src;
    box.appendChild(img);
    return box;
  }
  /* troca a imagem; se o arquivo da estação não existir, usa a reserva */
  function imagemComReserva(img, src, reserva) {
    img.onerror = () => { if (reserva && img.getAttribute("src") !== reserva) img.src = reserva; else { img.parentElement.classList.add("sem-imagem"); img.parentElement.dataset.arquivo = src; } };
    img.parentElement.classList.remove("sem-imagem");
    img.src = src;
  }

  /* ---------- navegação horizontal ---------- */
  const trilho = $("#trilho");
  const paineis = $$(".painel");
  const N = paineis.length;
  let atual = 0, travado = false;
  const modalAberto = () => !$("#lightbox").hidden || !$("#criador").hidden;

  function carregarPerto() { // o loading="lazy" do navegador não funciona com painéis deslocados por transform
    [atual - 1, atual, atual + 1].forEach(k => paineis[k]?.querySelectorAll("img[data-lazy]").forEach(img => {
      img.src = img.dataset.lazy;
      img.removeAttribute("data-lazy");
    }));
  }
  function ir(i, suave = true) {
    atual = Math.max(0, Math.min(N - 1, i));
    trilho.style.transition = suave ? "" : "none";
    trilho.style.transform = `translateX(${-atual * 100}vw)`;
    $("#barra").style.width = `${((atual + 1) / N) * 100}%`;
    $("#contador").textContent = `${String(atual + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
    $("#anterior").disabled = atual === 0;
    $("#proximo").disabled = atual === N - 1;
    $$(".menu button").forEach((b, k) => b.classList.toggle("ativo", k === atual));
    $(".menu button.ativo")?.scrollIntoView({ inline: "center", block: "nearest" });
    const id = paineis[atual].id;
    if (location.hash.slice(1) !== id) history.replaceState(null, "", "#" + id);
    carregarPerto();
    efeito.ligar(atual === 0);
    travado = true; setTimeout(() => (travado = false), 850);
  }
  function montarMenu() {
    const menu = $("#menu");
    menu.innerHTML = "";
    paineis.forEach((p, k) => {
      const b = el("button", "", esc(ui(p.dataset.nome)));
      b.onclick = () => ir(k);
      menu.appendChild(b);
      const num = $(".numero", p);
      if (num) num.textContent = String(k + 1).padStart(2, "0");
    });
  }

  function podeRolar(alvo, dx, dy) { // elemento que ainda pode rolar na direção pedida?
    for (let n = alvo; n && n !== document.body; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (Math.abs(dy) >= Math.abs(dx) && /(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 2) {
        if ((dy > 0 && n.scrollTop + n.clientHeight < n.scrollHeight - 2) || (dy < 0 && n.scrollTop > 2)) return { n, eixo: "y" };
      }
      if (n.classList.contains("rola-x") && n.scrollWidth > n.clientWidth + 2) {
        const d = Math.abs(dx) > Math.abs(dy) ? dx : dy;
        if ((d > 0 && n.scrollLeft + n.clientWidth < n.scrollWidth - 2) || (d < 0 && n.scrollLeft > 2)) return { n, eixo: "x", d };
      }
    }
    return null;
  }
  let acumulado = 0, ultimoGiro = 0;
  window.addEventListener("wheel", e => {
    if (modalAberto()) return;
    if (e.target.closest(".ambiente-menu")) return;
    const r = podeRolar(e.target, e.deltaX, e.deltaY);
    if (r) {
      if (r.eixo === "x") { e.preventDefault(); r.n.style.scrollBehavior = "auto"; r.n.scrollLeft += r.d; }
      return;
    }
    e.preventDefault();
    const agora = Date.now();
    if (agora - ultimoGiro > 250) acumulado = 0;
    ultimoGiro = agora;
    acumulado += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (travado || Math.abs(acumulado) < 50) return;
    ir(atual + (acumulado > 0 ? 1 : -1));
    acumulado = 0;
  }, { passive: false });

  window.addEventListener("keydown", e => {
    if (e.key === "Escape") { fecharLightbox(); fecharCriador(); fecharAmbiente(); return; }
    if (modalAberto() || e.target.closest("input, textarea, select")) return;
    if (["ArrowRight", "PageDown"].includes(e.key)) { e.preventDefault(); ir(atual + 1); }
    if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); ir(atual - 1); }
    if (e.key === "Home") ir(0);
    if (e.key === "End") ir(N - 1);
  });
  let toque = null;
  window.addEventListener("touchstart", e => { const p = e.touches[0]; toque = { x: p.clientX, y: p.clientY, alvo: e.target }; }, { passive: true });
  window.addEventListener("touchend", e => {
    if (!toque || modalAberto()) return;
    const p = e.changedTouches[0], dx = toque.x - p.clientX, dy = toque.y - p.clientY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (toque.alvo.closest(".mapa-moldura.ampliado, input[type=range]")) { toque = null; return; }
      const faixa = toque.alvo.closest(".rola-x");
      const temMais = faixa && (dx > 0 ? faixa.scrollLeft + faixa.clientWidth < faixa.scrollWidth - 4 : faixa.scrollLeft > 4);
      if (!temMais) ir(atual + (dx > 0 ? 1 : -1));
    }
    toque = null;
  });
  $("#anterior").onclick = () => ir(atual - 1);
  $("#proximo").onclick = () => ir(atual + 1);
  document.addEventListener("click", e => { const b = e.target.closest("[data-ir]"); if (b) { e.preventDefault(); ir(+b.dataset.ir); } });
  window.addEventListener("resize", () => { ir(atual, false); efeito.redimensionar(); });
  const palco = $(".palco"); // âncoras (#id) e foco não podem rolar o palco por conta própria
  palco.addEventListener("scroll", () => { palco.scrollLeft = 0; palco.scrollTop = 0; });
  document.addEventListener("focusin", e => { const k = paineis.indexOf(e.target.closest(".painel")); if (k >= 0 && k !== atual) ir(k); });
  window.addEventListener("hashchange", () => { const k = paineis.findIndex(p => p.id === location.hash.slice(1)); if (k >= 0 && k !== atual) ir(k); });

  /* ---------- lightbox ---------- */
  function abrirLightbox(src, legenda) {
    $("#lightboxImg").src = src;
    $("#lightboxLegenda").textContent = legenda || "";
    $("#lightbox").hidden = false;
  }
  function fecharLightbox() { $("#lightbox").hidden = true; }
  $("#lightbox").addEventListener("click", e => { if (e.target.id !== "lightboxImg") fecharLightbox(); });

  /* ---------- estações ---------- */
  const ICONES_ESTACAO = {
    primavera: '<svg viewBox="0 0 24 24"><g fill="currentColor"><circle cx="12" cy="6" r="3.2"/><circle cx="17.7" cy="10.2" r="3.2"/><circle cx="15.5" cy="17" r="3.2"/><circle cx="8.5" cy="17" r="3.2"/><circle cx="6.3" cy="10.2" r="3.2"/></g><circle cx="12" cy="12" r="2.6" fill="#f3d36b"/></svg>',
    verao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>',
    outono: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l1.6 4.4 3.2-1.6-.8 4 4-.8-2.4 3.2 3.4 1.6-4.6 1.4.8 3.4-3.6-1.6-.6 4h-2l-.6-4-3.6 1.6.8-3.4L3 12.6l3.4-1.6L4 7.8l4 .8-.8-4 3.2 1.6z"/></svg>',
    inverno: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"/></svg>',
  };
  const mesAtual = new Date().getMonth() + 1;
  let estacao = ler("er-estacao", null) || (D.estacoes.find(s => s.meses.includes(mesAtual)) || D.estacoes[1]).id;
  const est = () => D.estacoes.find(s => s.id === estacao) || D.estacoes[0];

  function montarEstacoes() {
    const g = $("#estacoes");
    g.setAttribute("aria-label", ui("estacoesRot"));
    g.innerHTML = "";
    D.estacoes.forEach(s => {
      const b = el("button", s.id === estacao ? "ativa" : "", ICONES_ESTACAO[s.id] || "");
      b.title = t(s.nome);
      b.setAttribute("aria-label", t(s.nome));
      b.setAttribute("aria-pressed", s.id === estacao);
      b.onclick = () => { estacao = s.id; guardar("er-estacao", estacao); aplicarEstacao(); montarEstacoes(); };
      g.appendChild(b);
    });
  }
  function aplicarEstacao() {
    const s = est();
    document.body.dataset.estacao = s.id;
    imagemComReserva($("#heroImg"), s.hero, D.inicio.imagem);
    imagemComReserva($("#mapaImg"), s.mapa, D.mapa.imagem);
    imagemComReserva($("#lendasMapaImg"), s.mapa, D.mapa.imagem);
    $("#estacaoCartao").innerHTML = `<p class="rotulo">${esc(ui("estacaoTit"))}</p>
      <h3><span class="estacao-icone">${ICONES_ESTACAO[s.id] || ""}</span>${esc(t(s.nome))}</h3>
      <ul>${lista(t(s.dicas))}</ul>`;
    efeito.tipo(s.efeito);
  }

  /* efeito animado do Início: pétalas, vaga-lumes, folhas ou neve */
  const efeito = (() => {
    const cv = $("#efeito"), cx = cv.getContext("2d");
    const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tipoAtual = null, parts = [], ligado = false, raf = 0, W = 0, H = 0;
    const CORES = { petalas: ["#f6c1d1", "#f9dbe4", "#fff2f6"], folhas: ["#d2541f", "#e88b2e", "#b8381c", "#f0b43c"], neve: ["#ffffff"], vagalumes: ["#d9ff7a"] };
    function redimensionar() { const r = cv.parentElement.getBoundingClientRect(); W = cv.width = r.width; H = cv.height = r.height; }
    function nova(inicio) {
      const qual = tipoAtual, c = CORES[qual] || ["#fff"];
      return { x: Math.random() * W, y: inicio ? Math.random() * H : -20, r: qual === "neve" ? 1.5 + Math.random() * 2.5 : qual === "vagalumes" ? 1.8 + Math.random() * 1.6 : 4 + Math.random() * 4,
        vx: (Math.random() - .5) * (qual === "vagalumes" ? .4 : .8), vy: qual === "vagalumes" ? (Math.random() - .5) * .3 : .5 + Math.random() * (qual === "neve" ? 1.2 : .9),
        a: Math.random() * Math.PI * 2, va: (Math.random() - .5) * .05, cor: c[Math.floor(Math.random() * c.length)], fase: Math.random() * 6 };
    }
    function quadro(ms) {
      cx.clearRect(0, 0, W, H);
      const sinc = (Math.sin(ms / 520) + 1) / 2; // vaga-lumes sincronizados piscam juntos
      parts.forEach((p, i) => {
        p.x += p.vx + (tipoAtual === "vagalumes" ? 0 : Math.sin(ms / 900 + p.fase) * .4); p.y += p.vy; p.a += p.va;
        if (tipoAtual === "vagalumes") { p.vx += (Math.random() - .5) * .04; p.vy += (Math.random() - .5) * .04; p.vx *= .98; p.vy *= .98; if (p.y < H * .35) p.vy += .02; }
        if (p.y > H + 20 || p.x < -30 || p.x > W + 30 || (tipoAtual === "vagalumes" && p.y < 0)) parts[i] = nova(false);
        cx.save(); cx.translate(p.x, p.y);
        if (tipoAtual === "vagalumes") {
          const brilho = Math.max(0, sinc * 1.2 - .2 + Math.sin(p.fase) * .1);
          cx.globalAlpha = brilho; cx.shadowColor = p.cor; cx.shadowBlur = 12; cx.fillStyle = p.cor;
          cx.beginPath(); cx.arc(0, 0, p.r, 0, Math.PI * 2); cx.fill();
        } else if (tipoAtual === "neve") {
          cx.globalAlpha = .85; cx.fillStyle = p.cor; cx.beginPath(); cx.arc(0, 0, p.r, 0, Math.PI * 2); cx.fill();
        } else {
          cx.rotate(p.a); cx.globalAlpha = .9; cx.fillStyle = p.cor; cx.beginPath(); cx.ellipse(0, 0, p.r, p.r * .55, 0, 0, Math.PI * 2); cx.fill();
        }
        cx.restore();
      });
      raf = requestAnimationFrame(quadro);
    }
    function reiniciar() {
      cancelAnimationFrame(raf); cx.clearRect(0, 0, W, H);
      if (!ligado || calmo || !tipoAtual) return;
      const n = { neve: 110, folhas: 34, petalas: 40, vagalumes: 60 }[tipoAtual] || 40;
      parts = Array.from({ length: Math.round(n * Math.min(1, W / 1400)) + 10 }, () => nova(true));
      raf = requestAnimationFrame(quadro);
    }
    document.addEventListener("visibilitychange", () => { if (document.hidden) cancelAnimationFrame(raf); else reiniciar(); });
    redimensionar();
    return { tipo: k => { tipoAtual = k; reiniciar(); }, ligar: on => { if (on !== ligado) { ligado = on; reiniciar(); } }, redimensionar: () => { redimensionar(); reiniciar(); } };
  })();

  /* ---------- paisagem sonora ---------- */
  const amb = new Audio();
  amb.loop = true; amb.volume = .35;
  let ambAtual = null;
  function montarAmbiente() {
    $("#ambienteNome").textContent = ambAtual ? t(D.ambientes.find(a => a.id === ambAtual).nome) : ui("ambiente");
    $("#ambienteBotao").classList.toggle("ativo", !!ambAtual);
    const m = $("#ambienteMenu");
    m.innerHTML = "";
    [{ id: null, nome: ui("desligado") }, ...D.ambientes].forEach(a => {
      const b = el("button", a.id === ambAtual ? "ativo" : "", esc(t(a.nome)));
      b.onclick = () => {
        ambAtual = a.id;
        if (a.id) { amb.src = a.arquivo; amb.play().catch(() => {}); } else amb.pause();
        fecharAmbiente(); montarAmbiente();
      };
      m.appendChild(b);
    });
  }
  function fecharAmbiente() { $("#ambienteMenu").hidden = true; $("#ambienteBotao").setAttribute("aria-expanded", "false"); }
  $("#ambienteBotao").onclick = e => { e.stopPropagation(); const m = $("#ambienteMenu"); m.hidden = !m.hidden; $("#ambienteBotao").setAttribute("aria-expanded", String(!m.hidden)); };
  document.addEventListener("click", e => { if (!e.target.closest(".ambiente")) fecharAmbiente(); });

  /* ---------- início ---------- */
  function montarInicio() {
    $("#fatos").innerHTML = D.inicio.fatos.map(f => `<dl class="fato"><dt>${esc(t(f.rotulo))}</dt><dd>${esc(t(f.valor))}</dd></dl>`).join("");
  }

  /* ---------- mapa: lugares + trilhas ---------- */
  let pontoAtivo = null, trilhaAtiva = null;
  const camadas = ler("er-camadas", { lugares: true, trilhas: true });
  function montarCamadas() {
    const g = $("#mapaCamadas");
    g.innerHTML = "";
    [["lugares", "camadaLugares"], ["trilhas", "camadaTrilhas"]].forEach(([k, r]) => {
      const b = el("button", camadas[k] ? "ativo" : "", `<span class="caixinha"></span>${esc(ui(r))}`);
      b.setAttribute("aria-pressed", camadas[k]);
      b.onclick = () => { camadas[k] = !camadas[k]; guardar("er-camadas", camadas); montarCamadas(); };
      g.appendChild(b);
    });
    $("#mapaPinos").hidden = !camadas.lugares;
    $("#mapaTrilhas").style.display = camadas.trilhas ? "" : "none";
  }
  function montarMapa() {
    const pinos = $("#mapaPinos");
    pinos.innerHTML = "";
    D.mapa.pontos.forEach(p => {
      const b = el("button", "pino");
      b.style.left = p.x + "%"; b.style.top = p.y + "%";
      b.setAttribute("aria-label", t(p.nome));
      b.dataset.id = p.id;
      const ic = new Image();
      ic.alt = "";
      ic.onerror = () => { b.classList.add("sem-icone"); ic.remove(); };
      ic.src = `img/icones/${p.icone}.png`;
      b.appendChild(ic);
      b.appendChild(el("span", "pino-rotulo", esc(t(p.nome))));
      b.onclick = () => mostrarPonto(p.id);
      pinos.appendChild(b);
    });
    const svg = $("#mapaTrilhas");
    svg.innerHTML = D.trilhas.map(tr => {
      const pts = tr.pontos.map(p => p.join(",")).join(" ");
      return `<g class="trilha" data-id="${tr.id}" style="--cor:${tr.cor}">
        <polyline class="trilha-sombra" points="${pts}"/><polyline class="trilha-linha" points="${pts}"/><polyline class="trilha-toque" points="${pts}"><title>${esc(t(tr.nome))}</title></polyline></g>`;
    }).join("");
    $$(".trilha", svg).forEach(g => g.addEventListener("click", () => mostrarTrilha(g.dataset.id)));
    montarCamadas();
    if (trilhaAtiva) mostrarTrilha(trilhaAtiva); else if (pontoAtivo) mostrarPonto(pontoAtivo); else mostrarLista();
  }
  function marcarAtivos() {
    $$(".pino").forEach(b => b.classList.toggle("ativo", b.dataset.id === pontoAtivo));
    $$(".trilha").forEach(g => { g.classList.toggle("ativa", g.dataset.id === trilhaAtiva); g.classList.toggle("apagada", !!trilhaAtiva && g.dataset.id !== trilhaAtiva); });
  }
  function mostrarLista() {
    pontoAtivo = null; trilhaAtiva = null; marcarAtivos();
    const c = $("#mapaCartao");
    c.innerHTML = "";
    const ul = el("div", "mapa-lista");
    ul.appendChild(el("h3", "", esc(ui("pontos"))));
    ul.appendChild(el("p", "", esc(ui("pontosSub"))));
    D.mapa.pontos.forEach(p => {
      const b = el("button", "", `<img src="img/icones/${p.icone}.png" alt="" onerror="this.outerHTML='<span class=bola></span>'"><span>${esc(t(p.nome))}</span>`);
      b.onclick = () => mostrarPonto(p.id);
      ul.appendChild(b);
    });
    ul.appendChild(el("h4", "", esc(ui("trilhasTit"))));
    D.trilhas.forEach(tr => {
      const b = el("button", "", `<span class="traco" style="background:${tr.cor}"></span><span>${esc(t(tr.nome))}</span><small>${esc(t(tr.distancia))}</small>`);
      b.onclick = () => mostrarTrilha(tr.id);
      ul.appendChild(b);
    });
    c.appendChild(ul);
  }
  function botaoVoltar(corpo) {
    const acoes = el("div", "cartao-acoes");
    const voltar = el("button", "", "← " + esc(ui("lista")));
    voltar.onclick = mostrarLista;
    acoes.appendChild(voltar);
    corpo.appendChild(acoes);
  }
  function mostrarPonto(id) {
    const p = D.mapa.pontos.find(q => q.id === id);
    if (!p) return mostrarLista();
    pontoAtivo = id; trilhaAtiva = null; marcarAtivos();
    const c = $("#mapaCartao");
    c.innerHTML = "";
    const f = foto(p.foto, t(p.nome));
    f.style.cursor = "zoom-in";
    f.onclick = () => abrirLightbox(p.foto, t(p.nome));
    c.appendChild(f);
    const corpo = el("div", "corpo", `<p class="tipo">${esc(t(p.tipo))}</p><h3>${esc(t(p.nome))}</h3><p>${esc(t(p.texto))}</p>`);
    botaoVoltar(corpo);
    c.appendChild(corpo);
    carregarPerto(); // o cartão nasce depois da navegação: carrega a foto agora
  }
  function perfilSVG(alts, cor) {
    const w = 300, h = 84, min = Math.min(...alts) - 40, max = Math.max(...alts) + 40;
    const pts = alts.map((a, i) => [(i / (alts.length - 1)) * w, h - ((a - min) / (max - min)) * h]);
    const linha = pts.map(p => p.map(n => n.toFixed(1)).join(",")).join(" ");
    return `<svg class="perfil" viewBox="0 0 ${w} ${h + 16}" role="img" aria-label="${esc(ui("perfil"))}">
      <polygon points="0,${h} ${linha} ${w},${h}" fill="${cor}" opacity=".22"/>
      <polyline points="${linha}" fill="none" stroke="${cor}" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="2" y="${h + 13}">${Math.min(...alts)} m</text><text x="${w - 2}" y="${h + 13}" text-anchor="end">${Math.max(...alts)} m</text></svg>`;
  }
  function mostrarTrilha(id) {
    const tr = D.trilhas.find(q => q.id === id);
    if (!tr) return mostrarLista();
    trilhaAtiva = id; pontoAtivo = null; marcarAtivos();
    if (!camadas.trilhas) { camadas.trilhas = true; montarCamadas(); }
    const c = $("#mapaCartao");
    c.innerHTML = "";
    const corpo = el("div", "corpo trilha-info", `
      <p class="tipo" style="color:${tr.cor}">${esc(ui("trilhasTit"))}</p><h3>${esc(t(tr.nome))}</h3>
      <dl class="trilha-dados">
        <div><dt>${esc(ui("distancia"))}</dt><dd>${esc(t(tr.distancia))}</dd></div>
        <div><dt>${esc(ui("tempo"))}</dt><dd>${esc(t(tr.tempo))}</dd></div>
        <div><dt>${esc(ui("desnivel"))}</dt><dd>${esc(t(tr.desnivel))}</dd></div>
        <div><dt>${esc(ui("dificuldade"))}</dt><dd>${esc(t(tr.dificuldade))}</dd></div></dl>
      <p class="rotulo">${esc(ui("perfil"))}</p>${perfilSVG(tr.perfil, tr.cor)}
      <p>${esc(t(tr.texto))}</p>
      <p class="rotulo">${esc(ui("destaquesTit"))}</p><ul class="lista-pontos">${lista(t(tr.destaques))}</ul>`);
    corpo.style.setProperty("--cor", tr.cor);
    botaoVoltar(corpo);
    c.appendChild(corpo);
  }

  /* zoom do mapa: roda do mouse, botões, duplo clique e arrastar */
  const moldura = $("#mapaMoldura"), camada = $("#mapaZoom");
  const ZMAX = 4;
  let z = 1, zx = 0, zy = 0;
  function aplicarZoom() {
    const W = moldura.clientWidth, H = moldura.clientHeight;
    z = Math.min(ZMAX, Math.max(1, z));
    zx = Math.min(0, Math.max(W * (1 - z), zx));
    zy = Math.min(0, Math.max(H * (1 - z), zy));
    camada.style.transform = `translate(${zx}px, ${zy}px) scale(${z})`;
    camada.style.setProperty("--z", z);
    moldura.classList.toggle("ampliado", z > 1.01);
    $("#zoomMenos").disabled = z <= 1.01;
    $("#zoomMais").disabled = z >= ZMAX - 0.01;
  }
  function zoomEm(novo, cx, cy) {
    if (cx == null) { cx = moldura.clientWidth / 2; cy = moldura.clientHeight / 2; }
    const nz = Math.min(ZMAX, Math.max(1, novo));
    zx = cx - ((cx - zx) * nz) / z;
    zy = cy - ((cy - zy) * nz) / z;
    z = nz;
    aplicarZoom();
  }
  const posNaMoldura = e => { const r = moldura.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  $("#zoomMais").onclick = () => zoomEm(z * 1.5);
  $("#zoomMenos").onclick = () => zoomEm(z / 1.5);
  $("#zoomReset").onclick = () => { z = 1; zx = 0; zy = 0; aplicarZoom(); };
  moldura.addEventListener("wheel", e => {
    if (e.target.closest(".mapa-camadas")) return;
    e.preventDefault(); e.stopPropagation(); // sobre o mapa a roda amplia em vez de trocar de painel
    zoomEm(z * (e.deltaY < 0 ? 1.2 : 1 / 1.2), ...posNaMoldura(e));
  }, { passive: false });
  moldura.addEventListener("dblclick", e => {
    if (e.target.closest(".pino, .mapa-controles, .mapa-camadas, .trilha")) return;
    zoomEm(z >= ZMAX - 0.01 ? 1 : z * 2, ...posNaMoldura(e));
  });
  let arraste = null, arrastou = false;
  moldura.addEventListener("pointerdown", e => {
    if (z <= 1.01 || e.target.closest(".mapa-controles, .mapa-camadas")) return;
    arraste = { x: e.clientX, y: e.clientY, zx, zy };
    arrastou = false;
  });
  window.addEventListener("pointermove", e => {
    if (!arraste) return;
    const dx = e.clientX - arraste.x, dy = e.clientY - arraste.y;
    if (!arrastou && Math.hypot(dx, dy) < 5) return;
    arrastou = true;
    camada.classList.add("arrastando");
    zx = arraste.zx + dx; zy = arraste.zy + dy;
    aplicarZoom();
  });
  window.addEventListener("pointerup", () => { arraste = null; camada.classList.remove("arrastando"); });
  moldura.addEventListener("click", e => { if (arrastou) { e.stopPropagation(); e.preventDefault(); arrastou = false; } }, true);
  window.addEventListener("resize", aplicarZoom);

  /* ---------- curiosidades ---------- */
  function montarCuriosidades() {
    const faixa = $("#faixaCuriosidades");
    faixa.innerHTML = "";
    D.curiosidades.forEach((c, k) => {
      const card = el("article", "curio");
      const f = foto(c.imagem, t(c.titulo));
      f.onclick = () => abrirLightbox(c.imagem, t(c.titulo));
      card.appendChild(f);
      card.appendChild(el("div", "corpo", `<p class="num">${String(k + 1).padStart(2, "0")}</p><h3>${esc(t(c.titulo))}</h3><p>${esc(t(c.texto))}</p>`));
      faixa.appendChild(card);
    });
  }

  /* ---------- postais ---------- */
  function montarPostais() {
    const faixa = $("#faixaPostais");
    faixa.innerHTML = "";
    D.postais.forEach((p, k) => {
      const local = t(p.local);
      const card = el("article", "postal");
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${ui("saudacao")} ${local}`);
      const giro = el("div", "postal-giro");
      const frente = el("div", "postal-face postal-frente");
      const f = foto(p.imagem, local);
      f.appendChild(el("div", "postal-titulo", `<small>${esc(ui("saudacao"))}</small><strong>${esc(local)}</strong>`));
      f.appendChild(el("span", "postal-virar", esc(ui("virar"))));
      frente.appendChild(f);
      const destino = UI[lang].destino[k % UI[lang].destino.length];
      const verso = el("div", "postal-face postal-verso", `
        <div class="verso-msg">${esc(t(p.verso))}<span class="assin">— ${esc(t(p.de))}</span></div>
        <div class="verso-dir">
          <div class="selo"><img data-lazy="${esc(p.imagem)}" alt=""></div>
          <div class="carimbo">ECHO RIDGE<br>★<br>SR-55</div>
          <div class="endereco"><span>${esc(ui("para"))} ${esc(destino)}</span><span>Main St.</span><span>Lowen Lake</span></div>
          <p class="verso-local">${esc(local)}</p>
        </div>`);
      giro.append(frente, verso);
      card.appendChild(giro);
      const virar = () => card.classList.toggle("virado");
      card.onclick = virar;
      card.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); virar(); } };
      faixa.appendChild(card);
    });
  }

  /* criador de postal (canvas → PNG) */
  const criador = { foto: null, imgs: {} };
  function fotosDisponiveis() {
    const vistos = new Set();
    return [...D.postais.map(p => ({ src: p.imagem, local: t(p.local) })), ...D.estacoes.map(s => ({ src: s.hero, local: "Echo Ridge" })),
      ...D.curiosidades.map(c => ({ src: c.imagem, local: "Echo Ridge" }))].filter(f => !vistos.has(f.src) && vistos.add(f.src));
  }
  function abrirCriador() {
    const fotos = fotosDisponiveis();
    if (!criador.foto) { criador.foto = fotos[0].src; $("#cTitulo").value = fotos[0].local; $("#cMensagem").value = ui("msgPadrao"); }
    const g = $("#criadorFotos");
    g.innerHTML = "";
    fotos.forEach(f => {
      const b = el("button", f.src === criador.foto ? "ativa" : "", `<img src="${esc(f.src)}" alt="${esc(f.local)}" onerror="this.parentElement.remove()">`);
      b.onclick = () => { criador.foto = f.src; if (f.local !== "Echo Ridge" || !$("#cTitulo").value) $("#cTitulo").value = f.local; $$("#criadorFotos button").forEach(x => x.classList.toggle("ativa", x === b)); desenharPostal(); };
      g.appendChild(b);
    });
    $("#criador").hidden = false;
    desenharPostal();
  }
  function fecharCriador() { $("#criador").hidden = true; }
  function carregarImg(src) {
    if (criador.imgs[src]) return criador.imgs[src];
    return (criador.imgs[src] = new Promise((ok, erro) => { const i = new Image(); i.onload = () => ok(i); i.onerror = erro; i.src = src; }));
  }
  function capa(cx, img, x, y, w, h) { // desenha a imagem cobrindo a área (como object-fit: cover)
    const s = Math.max(w / img.width, h / img.height), sw = w / s, sh = h / s;
    cx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
  }
  function quebrar(cx, txt, max) {
    const linhas = []; let l = "";
    txt.split(/\s+/).forEach(p => { const tst = l ? l + " " + p : p; if (cx.measureText(tst).width > max && l) { linhas.push(l); l = p; } else l = tst; });
    if (l) linhas.push(l);
    return linhas;
  }
  async function desenharPostal() {
    const cv = $("#postalCanvas"), verso = $("#cVerso").checked;
    const W = 1500, H = 1000;
    cv.width = W; cv.height = verso ? H * 2 + 40 : H;
    const cx = cv.getContext("2d");
    await Promise.all([document.fonts.load("700 80px Caveat"), document.fonts.load("800 120px Fraunces")]).catch(() => {});
    let img = null;
    try { img = await carregarImg(criador.foto); } catch (e) { /* sem foto */ }
    cx.fillStyle = "#14130f"; cx.fillRect(0, 0, cv.width, cv.height);
    // frente
    cx.fillStyle = "#fbf8f0"; cx.fillRect(0, 0, W, H);
    if (img) capa(cx, img, 32, 32, W - 64, H - 64);
    const g = cx.createLinearGradient(0, H * .45, 0, H - 32);
    g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.65)");
    cx.fillStyle = g; cx.fillRect(32, H * .45, W - 64, H * .55 - 32);
    cx.fillStyle = "#fff"; cx.shadowColor = "rgba(0,0,0,.6)"; cx.shadowBlur = 18;
    cx.font = "700 78px Caveat, cursive"; cx.fillText(ui("saudacao"), 90, H - 215);
    let tam = 150; cx.font = `800 ${tam}px Fraunces, Georgia, serif`;
    const titulo = $("#cTitulo").value.trim() || "Echo Ridge";
    while (cx.measureText(titulo).width > W - 180 && tam > 60) { tam -= 6; cx.font = `800 ${tam}px Fraunces, Georgia, serif`; }
    cx.fillStyle = "#fff6dc"; cx.fillText(titulo, 86, H - 85);
    cx.shadowBlur = 0;
    cx.font = "700 24px 'Source Sans 3', sans-serif"; cx.fillStyle = "rgba(255,255,255,.85)"; cx.textAlign = "right";
    cx.fillText("ECHO RIDGE · LOWEN LAKE", W - 70, 80); cx.textAlign = "left";
    if (!verso) return;
    // verso
    const y0 = H + 40;
    cx.fillStyle = "#f7f0e1"; cx.fillRect(0, y0, W, H);
    cx.strokeStyle = "#c9b994"; cx.lineWidth = 3; cx.beginPath(); cx.moveTo(W * .58, y0 + 80); cx.lineTo(W * .58, y0 + H - 80); cx.stroke();
    cx.fillStyle = "#2a2620"; cx.font = "600 56px Caveat, cursive";
    const linhas = quebrar(cx, $("#cMensagem").value.trim() || ui("msgPadrao"), W * .58 - 160);
    linhas.slice(0, 11).forEach((l, i) => cx.fillText(l, 90, y0 + 150 + i * 66));
    const ass = $("#cAssinatura").value.trim();
    if (ass) { cx.font = "700 64px Caveat, cursive"; cx.textAlign = "right"; cx.fillText("— " + ass, W * .58 - 70, y0 + H - 110); cx.textAlign = "left"; }
    // selo, carimbo e endereço
    const sx = W - 250, sy = y0 + 70;
    cx.fillStyle = "#fff"; cx.fillRect(sx, sy, 170, 210);
    if (img) capa(cx, img, sx + 12, sy + 12, 146, 186);
    cx.strokeStyle = "rgba(90,40,30,.6)"; cx.lineWidth = 4;
    cx.beginPath(); cx.arc(sx - 90, sy + 130, 95, 0, Math.PI * 2); cx.stroke();
    cx.beginPath(); cx.arc(sx - 90, sy + 130, 80, 0, Math.PI * 2); cx.stroke();
    cx.fillStyle = "rgba(90,40,30,.7)"; cx.font = "700 26px 'Source Sans 3', sans-serif"; cx.textAlign = "center";
    cx.fillText("ECHO RIDGE", sx - 90, sy + 120); cx.fillText("★ SR-55 ★", sx - 90, sy + 155); cx.textAlign = "left";
    cx.strokeStyle = "#c9b994"; cx.lineWidth = 2; cx.fillStyle = "#2a2620"; cx.font = "600 50px Caveat, cursive";
    [ui("para"), "Main St.", "Lowen Lake"].forEach((l, i) => {
      const ly = y0 + 560 + i * 110;
      cx.fillText(l, W * .58 + 70, ly - 14);
      cx.beginPath(); cx.moveTo(W * .58 + 60, ly); cx.lineTo(W - 80, ly); cx.stroke();
    });
  }
  $("#abrirCriador").onclick = abrirCriador;
  $("#fecharCriador").onclick = fecharCriador;
  $("#criador").addEventListener("click", e => { if (e.target.id === "criador") fecharCriador(); });
  ["cTitulo", "cMensagem", "cAssinatura", "cVerso"].forEach(id => $("#" + id).addEventListener("input", desenharPostal));
  $("#baixarPostal").onclick = () => {
    try {
      $("#postalCanvas").toBlob(b => {
        const a = el("a"); a.href = URL.createObjectURL(b); a.download = "postal-echo-ridge.png";
        document.body.appendChild(a); a.click(); a.remove();
      });
    } catch (e) { alert(ui("erroBaixar")); }
  };

  /* ---------- fauna + sons ---------- */
  let catAtual = D.fauna[0].id;
  const audio = new Audio();
  let tocandoId = null;
  const PLAY = '<svg viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z"/></svg>';
  const STOP = '<svg viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" rx="1"/></svg>';
  function pararSom() {
    audio.pause();
    if (tocandoId) {
      const s = $(`.som[data-id="${tocandoId}"]`);
      if (s) { s.classList.remove("tocando"); $(".som-botao", s).innerHTML = PLAY; $(".som-botao", s).setAttribute("aria-label", ui("ouvir")); $(".som-progresso", s).style.width = "0"; }
    }
    tocandoId = null;
    amb.volume = .35;
  }
  function tocar(e) {
    if (tocandoId === e.id) return pararSom();
    pararSom();
    audio.src = e.som; audio.currentTime = 0;
    audio.play().catch(() => {});
    amb.volume = .08; // abaixa o ambiente enquanto um bicho canta
    tocandoId = e.id;
    const s = $(`.som[data-id="${e.id}"]`);
    if (s) { s.classList.add("tocando"); $(".som-botao", s).innerHTML = STOP; $(".som-botao", s).setAttribute("aria-label", ui("parar")); }
  }
  audio.addEventListener("timeupdate", () => {
    const s = tocandoId && $(`.som[data-id="${tocandoId}"]`);
    if (s && audio.duration) $(".som-progresso", s).style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  });
  audio.addEventListener("ended", pararSom);
  audio.addEventListener("error", pararSom);

  function montarAbas() {
    const abas = $("#abasFauna");
    abas.innerHTML = "";
    D.fauna.forEach(c => {
      const b = el("button", "aba" + (c.id === catAtual ? " ativa" : ""), `<span>${esc(t(c.nome))}</span><small>${c.especies.length} ${esc(ui("especies"))}</small>`);
      b.dataset.cat = c.id;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", c.id === catAtual);
      b.onclick = () => { catAtual = c.id; pararSom(); montarAbas(); montarFauna(); carregarPerto(); };
      abas.appendChild(b);
    });
  }
  function montarFauna() {
    const cat = D.fauna.find(c => c.id === catAtual);
    const faixa = $("#faixaFauna");
    faixa.innerHTML = "";
    faixa.scrollLeft = 0;
    cat.especies.forEach((e, k) => {
      const card = el("article", "bicho");
      card.style.animationDelay = `${k * 60}ms`;
      const f = foto(e.imagem, t(e.nome));
      f.onclick = () => abrirLightbox(e.imagem, `${t(e.nome)} · ${t(e.cientifico)}`);
      card.appendChild(f);
      const corpo = el("div", "corpo", `
        <h3>${esc(t(e.nome))}</h3><p class="cient">${esc(t(e.cientifico))}</p>
        <div class="chips">${e.tamanho ? `<span class="chip">${esc(ui("tamanho"))}: ${esc(t(e.tamanho))}</span>` : ""}${e.onde ? `<span class="chip">${esc(ui("onde"))}: ${esc(t(e.onde))}</span>` : ""}</div>
        <p>${esc(t(e.texto))}</p>`);
      if (e.som) {
        const s = el("div", "som" + (tocandoId === e.id ? " tocando" : ""), `
          <button class="som-botao" aria-label="${esc(ui(tocandoId === e.id ? "parar" : "ouvir"))}">${tocandoId === e.id ? STOP : PLAY}</button>
          <div class="som-linha"><div class="som-progresso"></div></div>
          <div class="som-ondas"><i></i><i></i><i></i><i></i></div>`);
        s.dataset.id = e.id;
        $(".som-botao", s).onclick = ev => { ev.stopPropagation(); tocar(e); };
        $(".som-linha", s).onclick = ev => {
          if (tocandoId !== e.id) tocar(e);
          const r = ev.currentTarget.getBoundingClientRect();
          const pular = () => { audio.currentTime = ((ev.clientX - r.left) / r.width) * audio.duration; };
          audio.duration ? pular() : audio.addEventListener("loadedmetadata", pular, { once: true });
        };
        corpo.appendChild(s);
      }
      card.appendChild(corpo);
      faixa.appendChild(card);
    });
  }

  /* ---------- lendas e avistamentos ---------- */
  const L = D.lendas;
  let filtroLenda = null, criaturaVista = L.criaturas[0].id, anoMax = 2026, avistAtivo = null;
  const criatura = id => L.criaturas.find(c => c.id === id);
  function montarLendas() {
    const f = $("#filtrosLendas");
    f.innerHTML = "";
    [{ id: null, nome: ui("todas"), cor: "transparent" }, ...L.criaturas].forEach(c => {
      const b = el("button", c.id === filtroLenda ? "ativo" : "", `<i style="background:${c.cor}"></i>${esc(t(c.nome))}`);
      b.onclick = () => { filtroLenda = c.id; if (c.id) criaturaVista = c.id; avistAtivo = null; montarLendas(); };
      f.appendChild(b);
    });
    const anos = L.avistamentos.map(a => a.ano);
    const r = $("#anoLendas");
    r.min = Math.min(...anos); r.max = Math.max(...anos); r.value = anoMax = Math.min(anoMax, +r.max);
    $("#anoLendasRotulo").textContent = `${ui("ate")} ${anoMax}`;
    const vis = L.avistamentos.filter(a => a.ano <= anoMax && (!filtroLenda || a.criatura === filtroLenda));
    const pts = $("#lendasPontos");
    pts.innerHTML = "";
    vis.forEach(a => {
      const c = criatura(a.criatura);
      const b = el("button", "avist-ponto" + (avistAtivo === a ? " ativo" : ""));
      b.style.left = a.x + "%"; b.style.top = a.y + "%"; b.style.setProperty("--cor", c.cor);
      b.title = `${a.ano} · ${t(c.nome)} · ${t(a.local)}`;
      b.onclick = () => { avistAtivo = a; criaturaVista = a.criatura; montarLendas(); $(".avist.ativo")?.scrollIntoView({ block: "nearest", behavior: "smooth" }); };
      pts.appendChild(b);
    });
    // cartão da criatura
    const c = criatura(criaturaVista);
    const card = $("#criaturaCartao");
    card.innerHTML = "";
    const fc = foto(c.imagem, t(c.nome));
    fc.onclick = () => abrirLightbox(c.imagem, t(c.nome));
    card.appendChild(fc);
    card.appendChild(el("div", "corpo", `<h3><i style="background:${c.cor}"></i>${esc(t(c.nome))}</h3>
      <div class="chips"><span class="chip">${esc(ui("tamanho"))}: ${esc(t(c.tamanho))}</span><span class="chip">${esc(ui("onde"))}: ${esc(t(c.onde))}</span>
      <span class="chip">${L.avistamentos.filter(a => a.criatura === c.id).length} ${esc(ui("avist"))}</span></div>
      <p>${esc(t(c.texto))}</p><p class="conselho"><strong>${esc(ui("conselho"))}:</strong> ${esc(t(c.conselho))}</p>`));
    // lista
    const lst = $("#listaAvistamentos");
    lst.innerHTML = vis.length ? "" : `<p class="vazio">${esc(ui("nenhum"))}</p>`;
    [...vis].sort((a, b) => b.ano - a.ano).forEach(a => {
      const cc = criatura(a.criatura);
      const it = el("button", "avist" + (avistAtivo === a ? " ativo" : ""), `<span class="ano">${a.ano}</span>
        <span class="avist-txt"><strong><i style="background:${cc.cor}"></i>${esc(t(cc.nome))} · ${esc(t(a.local))}</strong>${esc(t(a.texto))}
        <small>${esc(ui("testemunha"))}: ${esc(t(a.testemunha))}</small></span>`);
      it.onclick = () => { avistAtivo = a; criaturaVista = a.criatura; montarLendas(); };
      lst.appendChild(it);
    });
    $("#cadernoDale").innerHTML = `<h3>${esc(ui("notasDale"))}</h3><ul>${lista(t(L.notas))}</ul>`;
    const seg = $("#segredoLendas");
    seg.href = L.segredo.url; seg.title = t(L.segredo.dica); seg.setAttribute("aria-label", t(L.segredo.dica));
    carregarPerto();
  }
  $("#anoLendas").addEventListener("input", e => { anoMax = +e.target.value; avistAtivo = null; montarLendas(); });

  /* ---------- história ---------- */
  function montarHistoria() {
    const faixa = $("#faixaHistoria");
    faixa.innerHTML = "";
    D.historia.forEach(h => {
      const card = el("article", "marco");
      card.appendChild(el("p", "marco-ano", esc(t(h.ano))));
      const f = foto(h.imagem, t(h.titulo));
      f.onclick = () => abrirLightbox(h.imagem, `${t(h.ano)} · ${t(h.titulo)}`);
      card.appendChild(f);
      card.appendChild(el("div", "corpo", `<h3>${esc(t(h.titulo))}</h3><p>${esc(t(h.texto))}</p>`));
      faixa.appendChild(card);
    });
  }

  /* ---------- camping ---------- */
  let marcados = new Set(ler("er-checklist", []));
  function montarCamping() {
    const C = D.camping, faixa = $("#faixaCamping");
    faixa.innerHTML = "";
    C.locais.forEach(l => {
      const card = el("article", "camp" + (l.id === "noite" ? " camp-destaque" : ""));
      const f = foto(l.imagem, t(l.nome));
      f.onclick = () => abrirLightbox(l.imagem, t(l.nome));
      card.appendChild(f);
      card.appendChild(el("div", "corpo", `<p class="tipo">${esc(t(l.tipo))}</p><h3>${esc(t(l.nome))}</h3>
        <dl class="camp-dados"><div><dt>${esc(ui("vagas"))}</dt><dd>${esc(t(l.vagas))}</dd></div>
        <div><dt>${esc(ui("preco"))}</dt><dd>${esc(t(l.preco))}</dd></div><div><dt>${esc(ui("temporada"))}</dt><dd>${esc(t(l.periodo))}</dd></div></dl>
        <p>${esc(t(l.texto))}</p><div class="chips">${t(l.itens).map(i => `<span class="chip">${esc(i)}</span>`).join("")}</div>`));
      faixa.appendChild(card);
    });
    const itens = t(C.checklist);
    const lado = $("#campingLado");
    lado.innerHTML = `<h3>${esc(ui("regrasCamping"))}</h3><ul class="lista-pontos">${lista(t(C.regras))}</ul>
      <h3>${esc(ui("levar"))} <small id="contaChecklist"></small></h3><div class="checklist"></div>`;
    if (C.regrasImagem) {
      const fr = foto(C.regrasImagem, ui("regrasCamping"), "foto camp-regras-foto");
      fr.onclick = () => abrirLightbox(C.regrasImagem, ui("regrasCamping"));
      lado.prepend(fr);
    }
    const ck = $(".checklist", lado);
    itens.forEach((i, k) => {
      const lb = el("label", "", `<input type="checkbox" ${marcados.has(k) ? "checked" : ""}><span>${esc(i)}</span>`);
      $("input", lb).onchange = e => { e.target.checked ? marcados.add(k) : marcados.delete(k); guardar("er-checklist", [...marcados]); contar(); };
      ck.appendChild(lb);
    });
    const contar = () => { $("#contaChecklist").textContent = `${[...marcados].filter(k => k < itens.length).length}/${itens.length} ${ui("marcados")}`; };
    contar();
  }

  /* ---------- guia do parque ---------- */
  let abaGuia = "equipe";
  function montarGuia() {
    const G = D.guia;
    const abas = [["equipe", "abaEquipe"], ["boas", "abaBoas"], ["regras", "abaRegras"], ["caca", "abaCaca"], ["chegar", "abaChegar"]];
    const g = $("#guiaAbas");
    g.innerHTML = "";
    abas.forEach(([id, r]) => {
      const b = el("button", id === abaGuia ? "ativa" : "", esc(ui(r)));
      b.setAttribute("role", "tab"); b.setAttribute("aria-selected", id === abaGuia);
      b.onclick = () => { abaGuia = id; montarGuia(); };
      g.appendChild(b);
    });
    const c = $("#guiaConteudo");
    c.innerHTML = "";
    c.className = "guia-conteudo rola-y guia-" + abaGuia;
    if (abaGuia === "equipe") {
      const d = G.destaque;
      const dest = el("article", "destaque-escoteira");
      const fotos = el("div", "dest-fotos");
      const f1 = foto(d.imagem, d.nome, "foto f1"); f1.onclick = () => abrirLightbox(d.imagem, d.nome);
      const f2 = foto(d.imagem2, d.nome, "foto f2"); f2.onclick = () => abrirLightbox(d.imagem2, d.nome);
      fotos.append(f1, f2);
      dest.appendChild(fotos);
      dest.appendChild(el("div", "corpo", `<span class="fita">★ ${esc(ui("destaqueCom"))}</span><h3>${esc(d.nome)}</h3><p class="cargo">${esc(t(d.cargo))}</p>
        <p>${esc(t(d.texto))}</p><blockquote>${esc(t(d.citacao))}</blockquote><div class="chips">${t(d.fatos).map(i => `<span class="chip">${esc(i)}</span>`).join("")}</div>`));
      c.appendChild(dest);
      const eq = el("div", "equipe", `<h3>${esc(ui("guardas"))}</h3>`);
      G.equipe.forEach(p => {
        const card = el("article", "guarda");
        const f = foto(p.imagem, p.nome); f.onclick = () => abrirLightbox(p.imagem, p.nome);
        card.appendChild(f);
        card.appendChild(el("div", "corpo", `<h4>${esc(p.nome)}</h4><p class="cargo">${esc(t(p.cargo))}</p><p>${esc(t(p.texto))}</p>`));
        eq.appendChild(card);
      });
      c.appendChild(eq);
    } else if (abaGuia === "boas") {
      const b = G.boasManeiras;
      c.innerHTML = `<div class="principios"><h3>${esc(t(b.titulo))}</h3><ol>${t(b.lista).map(i => `<li>${esc(i)}</li>`).join("")}</ol></div>
        <div class="etiqueta"><h3>${esc(ui("etiqueta"))}</h3><ul class="lista-pontos">${lista(t(b.etiqueta))}</ul></div>`;
    } else if (abaGuia === "regras") {
      c.innerHTML = `<ol class="regras">${t(G.regras).map(i => `<li>${esc(i)}</li>`).join("")}</ol>`;
    } else if (abaGuia === "caca") {
      const k = G.caca;
      c.innerHTML = `<div class="caca-txt"><p>${esc(t(k.texto))}</p>
          <h3>${esc(ui("temporadas"))}</h3><table class="tabela"><thead><tr><th>${esc(ui("especie"))}</th><th>${esc(ui("periodo"))}</th><th>${esc(ui("situacao"))}</th></tr></thead>
          <tbody>${k.temporadas.map(s => `<tr class="${s.proibido ? "proibido" : ""}"><td>${esc(t(s.especie))}</td><td>${esc(t(s.periodo))}</td><td>${esc(t(s.status))}</td></tr>`).join("")}</tbody></table></div>
        <div class="caca-pesca"><h3>${esc(ui("pesca"))}</h3><ul class="lista-pontos">${lista(t(k.pesca))}</ul></div>
        <div class="caca-fotos"></div>
        <button class="botao caca-licenca" data-ir="${paineis.findIndex(p => p.id === "licenca")}">${esc(ui("gerarLicenca"))}</button>`;
      const fs = $(".caca-fotos", c);
      [[k.imagem, ui("abaCaca")], [k.imagemPesca, ui("pesca")]].forEach(([src, leg]) => { const f = foto(src, leg); f.onclick = () => abrirLightbox(src, leg); fs.appendChild(f); });
    } else {
      c.innerHTML = `<div class="chegar"><ul class="lista-pontos grande">${lista(t(G.chegar))}</ul></div><div class="chegar-foto"></div>`;
      const f = foto("img/postais/sr55.jpg", "SR-55"); $(".chegar-foto", c).appendChild(f);
    }
    carregarPerto();
  }

  /* ---------- atividades: jogo das pegadas e jogo dos sons ---------- */
  const jogos = { pegadas: null, sons: null };
  const especiePor = id => todasEspecies().find(e => e.id === id);
  function novoJogoPegadas() { jogos.pegadas = { ordem: embaralhar(D.atividades.pegadas), i: 0, pontos: 0, resp: null }; montarJogoPegadas(); }
  function montarJogoPegadas() {
    const J = jogos.pegadas, box = $("#jogoPegadas");
    box.innerHTML = `<h3>${esc(ui("jogoPegadas"))}</h3>`;
    if (J.i >= J.ordem.length) {
      box.appendChild(el("div", "jogo-fim", `<p class="placar">${J.pontos}/${J.ordem.length} ${esc(ui("acertos"))}</p><p>${esc(ui("fimPegadas"))}</p>`));
      const b = el("button", "botao", esc(ui("deNovo"))); b.onclick = novoJogoPegadas; $(".jogo-fim", box).appendChild(b);
      return;
    }
    const q = J.ordem[J.i];
    box.appendChild(el("p", "jogo-rodada", `${esc(ui("rodada"))} ${J.i + 1}/${J.ordem.length} · ${J.pontos} ${esc(ui("acertos"))}`));
    const f = foto(q.imagem, ui("jogoPegadas"), "foto jogo-foto");
    box.appendChild(f);
    if (!q._opcoes) {
      const outros = embaralhar(["urso-negro", "puma", "veado", "raposa", "alce", "coiote", "lince", "castor"].filter(id => id !== q.resposta)).slice(0, 3);
      q._opcoes = embaralhar([q.resposta, ...outros]);
    }
    const ops = el("div", "opcoes");
    q._opcoes.forEach(id => {
      const b = el("button", "", esc(t(especiePor(id)?.nome || id)));
      if (J.resp) { b.disabled = true; if (id === q.resposta) b.classList.add("certa"); else if (id === J.resp) b.classList.add("errada"); }
      b.onclick = () => { J.resp = id; if (id === q.resposta) J.pontos++; montarJogoPegadas(); };
      ops.appendChild(b);
    });
    box.appendChild(ops);
    if (J.resp) {
      box.appendChild(el("p", "jogo-retorno " + (J.resp === q.resposta ? "ok" : "nao"),
        `${J.resp === q.resposta ? esc(ui("certo")) : esc(ui("errado")) + esc(t(especiePor(q.resposta).nome))} ${esc(t(q.dica))}`));
      const b = el("button", "botao botao-pequeno", esc(ui("proxima")));
      b.onclick = () => { J.i++; J.resp = null; montarJogoPegadas(); };
      box.appendChild(b);
    }
    carregarPerto();
  }
  const audioJogo = new Audio();
  function novoJogoSons() {
    const pool = todasEspecies().filter(e => e.som);
    jogos.sons = { ordem: embaralhar(pool).slice(0, 8), pool, i: 0, pontos: 0, resp: null };
    montarJogoSons();
  }
  function montarJogoSons() {
    const J = jogos.sons, box = $("#jogoSons");
    box.innerHTML = `<h3>${esc(ui("jogoSons"))}</h3>`;
    if (J.i >= J.ordem.length) {
      audioJogo.pause();
      box.appendChild(el("div", "jogo-fim", `<p class="placar">${J.pontos}/${J.ordem.length} ${esc(ui("acertos"))}</p><p>${esc(ui("fimSons"))}</p>`));
      const b = el("button", "botao", esc(ui("deNovo"))); b.onclick = novoJogoSons; $(".jogo-fim", box).appendChild(b);
      return;
    }
    const q = J.ordem[J.i];
    box.appendChild(el("p", "jogo-rodada", `${esc(ui("rodada"))} ${J.i + 1}/${J.ordem.length} · ${J.pontos} ${esc(ui("acertos"))}`));
    const tocarB = el("button", "botao-som-grande", `${PLAY}<span>${esc(ui("ouvirSom"))}</span>`);
    tocarB.onclick = () => { pararSom(); audioJogo.src = q.som; audioJogo.currentTime = 0; audioJogo.play().catch(() => {}); };
    box.appendChild(tocarB);
    if (!q._opcoes) q._opcoes = embaralhar([q, ...embaralhar(J.pool.filter(e => e.id !== q.id)).slice(0, 3)]);
    const ops = el("div", "opcoes opcoes-foto");
    q._opcoes.forEach(e => {
      const b = el("button", "", `<span class="mini" style="background-image:url('${esc(e.imagem)}')"></span><span>${esc(t(e.nome))}</span>`);
      if (J.resp) { b.disabled = true; if (e.id === q.id) b.classList.add("certa"); else if (e.id === J.resp) b.classList.add("errada"); }
      b.onclick = () => { J.resp = e.id; if (e.id === q.id) J.pontos++; montarJogoSons(); };
      ops.appendChild(b);
    });
    box.appendChild(ops);
    if (J.resp) {
      box.appendChild(el("p", "jogo-retorno " + (J.resp === q.id ? "ok" : "nao"), J.resp === q.id ? esc(ui("certo")) : esc(ui("errado")) + esc(t(q.nome))));
      const b = el("button", "botao botao-pequeno", esc(ui("proxima")));
      b.onclick = () => { J.i++; J.resp = null; audioJogo.pause(); montarJogoSons(); };
      box.appendChild(b);
    }
  }

  /* ---------- créditos ---------- */
  function montarCreditos() {
    const C = D.creditos;
    const comSom = todasEspecies().filter(e => e.som).map(e => ({ id: e.id, nome: t(e.nome) }));
    const amb = D.ambientes.map(a => ({ id: "amb-" + a.id, nome: t(a.nome) }));
    const sons = [...comSom, ...amb].map(e => {
      const s = SONS[e.id];
      return `<li><strong>${esc(e.nome)}</strong> · ${s ? `${esc(s.autor)} · ${esc(ui("licencaSom"))}: ${esc(s.licenca)} · <a href="${esc(s.fonte)}" target="_blank" rel="noopener">${esc(ui("fonte"))}</a>` : "—"}</li>`;
    }).join("");
    $("#creditosArea").innerHTML = `
      <div>
        <h3>${esc(ui("sobre"))}</h3><p>${esc(t(C.texto))}</p><p>${esc(ui("inventado"))}</p>
        <h3>${esc(ui("imagensTit"))}</h3><p>${esc(t(C.imagens))}</p><p>${esc(ui("trocar"))}</p>
        <p><a href="${esc(C.link.url)}" target="_blank" rel="noopener">${esc(t(C.link.texto))} ↗</a></p>
      </div>
      <div><h3>${esc(ui("sons"))}</h3><p>${esc(ui("sonsTxt"))}</p><ul class="lista-sons">${sons}</ul></div>`;
  }

  /* ---------- aplicar idioma ---------- */
  function aplicarIdioma() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    $$("[data-idioma]").forEach(b => b.classList.toggle("ativo", b.dataset.idioma === lang));
    $$("[data-t]").forEach(n => (n.textContent = t(caminho(D, n.dataset.t))));
    $$("[data-ui]").forEach(n => (n.textContent = ui(n.dataset.ui)));
    $("#anterior").setAttribute("aria-label", lang === "pt" ? "Anterior" : "Previous");
    $("#proximo").setAttribute("aria-label", lang === "pt" ? "Próximo" : "Next");
    const viradas = $$(".postal").map(p => p.classList.contains("virado"));
    montarMenu(); montarEstacoes(); aplicarEstacao(); montarAmbiente(); montarInicio(); montarMapa(); montarCuriosidades(); montarPostais();
    montarAbas(); montarFauna(); montarLendas(); montarHistoria(); montarCamping(); montarGuia();
    if (jogos.pegadas) montarJogoPegadas(); else novoJogoPegadas();
    if (jogos.sons) montarJogoSons(); else novoJogoSons();
    montarCreditos();
    $$(".postal").forEach((p, k) => viradas[k] && p.classList.add("virado"));
    $$(".menu button").forEach((b, k) => b.classList.toggle("ativo", k === atual));
    if (!$("#criador").hidden) abrirCriador();
    carregarPerto();
  }
  $$("[data-idioma]").forEach(b => (b.onclick = () => {
    lang = b.dataset.idioma; guardar("er-idioma2", lang); aplicarIdioma();
    document.dispatchEvent(new Event("er-idioma")); // avisa o gerador de licença (js/licenca.js)
  }));

  /* ---------- início ---------- */
  aplicarIdioma();
  aplicarZoom();
  const k0 = paineis.findIndex(p => p.id === location.hash.slice(1));
  ir(k0 >= 0 ? k0 : 0, false);
})();
