/* ECHO RIDGE · motor do site (navegação horizontal, idioma, mapa, postais, fauna e sons).
   Conteúdo fica em js/dados.js — aqui só a lógica. */
(() => {
  const D = window.ER;
  const SONS = window.ER_SONS || {};

  /* ---------- textos fixos da interface ---------- */
  const UI = {
    pt: {
      inicio: "Início", mapa: "Mapa", curiosidades: "Curiosidades", postais: "Postais", fauna: "Fauna", visite: "Visite", creditos: "Créditos",
      explorar: "Explorar o mapa", dica: "Role, arraste ou use as setas →",
      mapaSub: "Clique nos ícones para conhecer cada lugar da serra.",
      curiosidadesSub: "O que os moradores contam (e o que é verdade de fato).",
      postaisSub: "Clique num postal para ler o verso.",
      faunaSub: "Os bichos reais das montanhas, por categoria. Nas aves, aperte o play para ouvir o canto gravado na natureza.",
      visiteSub: "Quando ir, por onde andar e o que não fazer.",
      pontos: "Lugares do mapa", pontosSub: "Escolha um ícone ou um nome da lista.",
      verFoto: "Ver foto", lista: "Todos os lugares",
      virar: "virar ↻", saudacao: "Lembranças de", para: "Para:", destino: ["Família Walker", "Lowen Lake", "Condado de Lowen Lake"],
      tamanho: "Tamanho", onde: "Onde", ouvir: "Ouvir canto", parar: "Parar", especies: "espécies",
      sons: "Sons das aves", sonsTxt: "Gravações reais da natureza, do Wikimedia Commons (xeno-canto e Yellowstone Sound Library). Cortadas em até 30 s.",
      imagensTit: "Imagens", trocar: "Todas as imagens e sons podem ser trocados: veja LEIA-ME.md na pasta do site.",
      sobre: "Sobre", licenca: "licença", fonte: "fonte",
    },
    en: {
      inicio: "Home", mapa: "Map", curiosidades: "Curiosities", postais: "Postcards", fauna: "Wildlife", visite: "Visit", creditos: "Credits",
      explorar: "Explore the map", dica: "Scroll, drag or use the arrows →",
      mapaSub: "Click the icons to discover each place in the ridge.",
      curiosidadesSub: "What the locals say (and what is actually true).",
      postaisSub: "Click a postcard to read the back.",
      faunaSub: "The real animals of the mountains, by category. For birds, press play to hear a recording made in the wild.",
      visiteSub: "When to go, where to walk and what not to do.",
      pontos: "Places on the map", pontosSub: "Pick an icon or a name from the list.",
      verFoto: "View photo", lista: "All places",
      virar: "flip ↻", saudacao: "Greetings from", para: "To:", destino: ["The Walker family", "Lowen Lake", "Lowen Lake County"],
      tamanho: "Size", onde: "Where", ouvir: "Play call", parar: "Stop", especies: "species",
      sons: "Bird sounds", sonsTxt: "Real field recordings from Wikimedia Commons (xeno-canto and the Yellowstone Sound Library). Trimmed to 30 s max.",
      imagensTit: "Images", trocar: "Every image and sound can be swapped: see LEIA-ME.md in the site folder.",
      sobre: "About", licenca: "license", fonte: "source",
    },
  };

  /* ---------- idioma ---------- */
  let lang = "pt";
  try { lang = localStorage.getItem("er-idioma") || (navigator.language.startsWith("pt") ? "pt" : "en"); } catch (e) { /* sem storage */ }
  const t = v => (v == null ? "" : typeof v === "object" && !Array.isArray(v) ? (v[lang] ?? v.pt ?? "") : v);
  const ui = k => UI[lang][k] ?? k;
  const caminho = (obj, p) => p.split(".").reduce((o, k) => o?.[k], obj);
  const $ = (s, el = document) => el.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* imagem com aviso visível quando o arquivo não existe */
  function foto(src, alt = "", cls = "foto") {
    const box = el("div", cls);
    const img = new Image();
    img.alt = alt; img.decoding = "async";
    img.onerror = () => { box.classList.add("sem-imagem"); box.dataset.arquivo = src; };
    img.dataset.lazy = src;          // carregada quando o painel (ou o vizinho) fica ativo
    box.appendChild(img);
    return box;
  }
  /* o loading="lazy" do navegador não funciona com painéis deslocados por transform */
  function carregarPerto() {
    [atual - 1, atual, atual + 1].forEach(k => paineis[k]?.querySelectorAll("img[data-lazy]").forEach(img => {
      img.src = img.dataset.lazy;
      img.removeAttribute("data-lazy");
    }));
  }
  function ligarImagem(img, src) {
    img.onerror = () => { img.parentElement.classList.add("sem-imagem"); img.parentElement.dataset.arquivo = src; };
    img.src = src;
  }

  /* ---------- navegação horizontal ---------- */
  const trilho = $("#trilho");
  const paineis = [...document.querySelectorAll(".painel")];
  const N = paineis.length;
  let atual = 0, travado = false;

  function ir(i, suave = true) {
    atual = Math.max(0, Math.min(N - 1, i));
    trilho.style.transition = suave ? "" : "none";
    trilho.style.transform = `translateX(${-atual * 100}vw)`;
    $("#barra").style.width = `${((atual + 1) / N) * 100}%`;
    $("#contador").textContent = `${String(atual + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
    $("#anterior").disabled = atual === 0;
    $("#proximo").disabled = atual === N - 1;
    document.querySelectorAll(".menu button").forEach((b, k) => b.classList.toggle("ativo", k === atual));
    $(".menu button.ativo")?.scrollIntoView({ inline: "center", block: "nearest" });
    const id = paineis[atual].id;
    if (location.hash.slice(1) !== id) history.replaceState(null, "", "#" + id);
    carregarPerto();
    travado = true; setTimeout(() => (travado = false), 850);
  }

  function montarMenu() {
    const menu = $("#menu");
    menu.innerHTML = "";
    paineis.forEach((p, k) => {
      const b = el("button", "", esc(ui(p.dataset.nome)));
      b.onclick = () => ir(k);
      menu.appendChild(b);
    });
  }

  /* elemento que ainda pode rolar na direção pedida? */
  function podeRolar(alvo, dx, dy) {
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
    if (!$("#lightbox").hidden) return;
    const r = podeRolar(e.target, e.deltaX, e.deltaY);
    if (r) {
      if (r.eixo === "x") { e.preventDefault(); r.n.style.scrollBehavior = "auto"; r.n.scrollLeft += r.d; }
      return; // rolagem interna (vertical nativa ou faixa horizontal)
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
    if (!$("#lightbox").hidden) { if (e.key === "Escape") fecharLightbox(); return; }
    if (["ArrowRight", "PageDown"].includes(e.key)) { e.preventDefault(); ir(atual + 1); }
    if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); ir(atual - 1); }
    if (e.key === "Home") ir(0);
    if (e.key === "End") ir(N - 1);
  });

  // toque: arrastar para os lados troca de painel (exceto dentro de faixas que ainda rolam)
  let toque = null;
  window.addEventListener("touchstart", e => { const p = e.touches[0]; toque = { x: p.clientX, y: p.clientY, alvo: e.target }; }, { passive: true });
  window.addEventListener("touchend", e => {
    if (!toque || !$("#lightbox").hidden) return;
    const p = e.changedTouches[0], dx = toque.x - p.clientX, dy = toque.y - p.clientY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      const faixa = toque.alvo.closest(".rola-x");
      const temMais = faixa && (dx > 0 ? faixa.scrollLeft + faixa.clientWidth < faixa.scrollWidth - 4 : faixa.scrollLeft > 4);
      if (!temMais) ir(atual + (dx > 0 ? 1 : -1));
    }
    toque = null;
  });

  $("#anterior").onclick = () => ir(atual - 1);
  $("#proximo").onclick = () => ir(atual + 1);
  document.addEventListener("click", e => { const b = e.target.closest("[data-ir]"); if (b) { e.preventDefault(); ir(+b.dataset.ir); } });
  window.addEventListener("resize", () => ir(atual, false));
  // segurança: âncoras (#id) e foco do teclado não podem rolar o palco por conta própria
  const palco = $(".palco");
  palco.addEventListener("scroll", () => { palco.scrollLeft = 0; palco.scrollTop = 0; });
  document.addEventListener("focusin", e => {
    const p = e.target.closest(".painel");
    const k = paineis.indexOf(p);
    if (k >= 0 && k !== atual) ir(k);
  });
  window.addEventListener("hashchange", () => { const k = paineis.findIndex(p => p.id === location.hash.slice(1)); if (k >= 0 && k !== atual) ir(k); });

  /* ---------- lightbox ---------- */
  function abrirLightbox(src, legenda) {
    $("#lightboxImg").src = src;
    $("#lightboxLegenda").textContent = legenda || "";
    $("#lightbox").hidden = false;
  }
  function fecharLightbox() { $("#lightbox").hidden = true; }
  $("#lightbox").addEventListener("click", e => { if (e.target.id !== "lightboxImg") fecharLightbox(); });

  /* ---------- 1 · início ---------- */
  function montarInicio() {
    $("#fatos").innerHTML = D.inicio.fatos.map(f => `<dl class="fato"><dt>${esc(t(f.rotulo))}</dt><dd>${esc(t(f.valor))}</dd></dl>`).join("");
  }

  /* ---------- 2 · mapa ---------- */
  let pontoAtivo = null;
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
    pontoAtivo ? mostrarPonto(pontoAtivo) : mostrarLista();
  }
  function mostrarLista() {
    pontoAtivo = null;
    document.querySelectorAll(".pino").forEach(b => b.classList.remove("ativo"));
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
    c.appendChild(ul);
  }
  function mostrarPonto(id) {
    const p = D.mapa.pontos.find(q => q.id === id);
    if (!p) return mostrarLista();
    pontoAtivo = id;
    document.querySelectorAll(".pino").forEach(b => b.classList.toggle("ativo", b.dataset.id === id));
    const c = $("#mapaCartao");
    c.innerHTML = "";
    const f = foto(p.foto, t(p.nome));
    f.style.cursor = "zoom-in";
    f.onclick = () => abrirLightbox(p.foto, t(p.nome));
    c.appendChild(f);
    const corpo = el("div", "corpo", `<p class="tipo">${esc(t(p.tipo))}</p><h3>${esc(t(p.nome))}</h3><p>${esc(t(p.texto))}</p>`);
    const acoes = el("div", "cartao-acoes");
    const voltar = el("button", "", "← " + esc(ui("lista")));
    voltar.onclick = mostrarLista;
    acoes.appendChild(voltar);
    corpo.appendChild(acoes);
    c.appendChild(corpo);
  }

  /* ---------- 3 · curiosidades ---------- */
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

  /* ---------- 4 · postais ---------- */
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
          <div class="selo"><img src="${esc(p.imagem)}" alt=""></div>
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

  /* ---------- 5 · fauna + sons ---------- */
  let catAtual = D.fauna[0].id;
  const audio = new Audio();
  let tocandoId = null;
  const PLAY = '<svg viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z"/></svg>';
  const STOP = '<svg viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" rx="1"/></svg>';

  function pararSom() {
    audio.pause();
    if (tocandoId) {
      const s = document.querySelector(`.som[data-id="${tocandoId}"]`);
      if (s) { s.classList.remove("tocando"); $(".som-botao", s).innerHTML = PLAY; $(".som-botao", s).setAttribute("aria-label", ui("ouvir")); $(".som-progresso", s).style.width = "0"; }
    }
    tocandoId = null;
  }
  function tocar(e) {
    const id = e.id;
    if (tocandoId === id) return pararSom();
    pararSom();
    audio.src = e.som;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    tocandoId = id;
    const s = document.querySelector(`.som[data-id="${id}"]`);
    if (s) { s.classList.add("tocando"); $(".som-botao", s).innerHTML = STOP; $(".som-botao", s).setAttribute("aria-label", ui("parar")); }
  }
  audio.addEventListener("timeupdate", () => {
    const s = tocandoId && document.querySelector(`.som[data-id="${tocandoId}"]`);
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
    faixa.parentElement.classList.toggle("lendas", cat.id === "lendas");
    const aviso = $("#faunaAviso");
    aviso.hidden = !cat.aviso;
    aviso.textContent = t(cat.aviso);
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

  /* ---------- 6 · visite ---------- */
  function montarVisite() {
    $("#blocosVisite").innerHTML = D.visite.blocos.map(b =>
      `<div class="bloco"><h3>${esc(t(b.titulo))}</h3><ul>${t(b.lista).map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");
  }

  /* ---------- 7 · créditos ---------- */
  function montarCreditos() {
    const C = D.creditos;
    const aves = D.fauna.find(c => c.id === "aves").especies.filter(e => e.som);
    const sons = aves.map(e => {
      const s = SONS[e.id];
      return `<li><strong>${esc(t(e.nome))}</strong> · ${s ? `${esc(s.autor)} · ${esc(ui("licenca"))}: ${esc(s.licenca)} · <a href="${esc(s.fonte)}" target="_blank" rel="noopener">${esc(ui("fonte"))}</a>` : "—"}</li>`;
    }).join("");
    $("#creditosArea").innerHTML = `
      <div>
        <h3>${esc(ui("sobre"))}</h3><p>${esc(t(C.texto))}</p>
        <h3>${esc(ui("imagensTit"))}</h3><p>${esc(t(C.imagens))}</p><p>${esc(ui("trocar"))}</p>
        <p><a href="${esc(C.link.url)}" target="_blank" rel="noopener">${esc(t(C.link.texto))} ↗</a></p>
      </div>
      <div><h3>${esc(ui("sons"))}</h3><p>${esc(ui("sonsTxt"))}</p><ul class="lista-sons">${sons}</ul></div>`;
  }

  /* ---------- aplicar idioma ---------- */
  function aplicarIdioma() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-idioma]").forEach(b => b.classList.toggle("ativo", b.dataset.idioma === lang));
    document.querySelectorAll("[data-t]").forEach(n => (n.textContent = t(caminho(D, n.dataset.t))));
    document.querySelectorAll("[data-ui]").forEach(n => (n.textContent = ui(n.dataset.ui)));
    $("#anterior").setAttribute("aria-label", lang === "pt" ? "Anterior" : "Previous");
    $("#proximo").setAttribute("aria-label", lang === "pt" ? "Próximo" : "Next");
    const viradas = [...document.querySelectorAll(".postal")].map(p => p.classList.contains("virado"));
    montarMenu(); montarInicio(); montarMapa(); montarCuriosidades(); montarPostais(); montarAbas(); montarFauna(); montarVisite(); montarCreditos();
    document.querySelectorAll(".postal").forEach((p, k) => viradas[k] && p.classList.add("virado"));
    document.querySelectorAll(".menu button").forEach((b, k) => b.classList.toggle("ativo", k === atual));
    carregarPerto();
  }
  document.querySelectorAll("[data-idioma]").forEach(b => (b.onclick = () => {
    lang = b.dataset.idioma;
    try { localStorage.setItem("er-idioma", lang); } catch (e) { /* ok */ }
    aplicarIdioma();
  }));

  /* ---------- início ---------- */
  document.querySelectorAll("img[data-src]").forEach(img => ligarImagem(img, caminho(D, img.dataset.src)));
  aplicarIdioma();
  const k0 = paineis.findIndex(p => p.id === location.hash.slice(1));
  ir(k0 >= 0 ? k0 : 0, false);
})();
