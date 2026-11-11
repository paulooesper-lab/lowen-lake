/* Páginas internas: local.html?id=... e eventos.html */
(function () {
  const { S, T, U, esc, $, img, acharLocal, locaisVisiveis, acharCriatura, urlCriatura, acharPersonagem, nomeOnde, urlLocal, cabecalho, abrirCaixa, abrirPersonagem, abrirLocal, rodape, idadeTexto } = window.LL;
  cabecalho(false);
  const main = $("#pagina");
  const tipo = document.body.dataset.pagina;

  const cartoesPersonagens = (ids) => ids.map(acharPersonagem).filter(Boolean).map((p) => `
    <button type="button" class="cartao-p" data-id="${esc(p.id)}">${img(p.imagem, p.nome, p.cor)}
      <span class="cartao-p-txt"><strong>${esc(T(p.nome))}</strong><span>${esc(T(p.papel))}${idadeTexto(p)}</span></span></button>`).join("");

  const capa = (imagem, etiqueta, titulo, intro) => `
    <section class="capa">
      <div class="capa-fundo">${img(imagem, titulo)}</div>
      <div class="envolve capa-txt">
        <a class="voltar" href="index.html">← ${esc(U("voltar"))}</a>
        ${etiqueta ? `<span class="etiqueta">${esc(etiqueta)}</span>` : ""}
        <h1 class="titulo">${esc(titulo)}</h1>
        ${intro ? `<p class="capa-intro">${esc(intro)}</p>` : ""}
      </div>
    </section>`;

  /* ---------- página de local ---------- */
  if (tipo === "local") {
    const id = new URLSearchParams(location.search).get("id");
    const l = acharLocal(id);
    if (!l) { main.innerHTML = `<div class="envolve vazio"><p>${esc(U("naoEncontrado"))}</p><a class="botao" href="index.html#locais">${esc(U("voltar"))}</a></div>`; return; }
    document.title = `${T(l.nome)} · Lowen Lake`;
    const pg = l.pagina || {};
    const reg = S.mapa.regioes[l.regiao];
    const lista = (v) => (T(v) || []).map((x) => `<li>${esc(x)}</li>`).join("");
    const miniLocal = (x) => `<a class="cartao-mini" href="${urlLocal(x.id)}">${img(x.imagem, x.nome, ["#22302a", "#2f7fb5"])}<span>${esc(T(x.nome))}</span></a>`;

    /* --- página secreta (dossiê / caderno) --- */
    if (l.estilo) {
      document.body.classList.add("modo-" + l.estilo);
      const sit = (s) => (s ? `<span class="selo selo-${esc(s)}">${esc(U("situacao." + s))}</span>` : "");
      const perigo = (n) => (n ? `<span class="perigo" title="${esc(U("perigo"))}">${esc(U("perigo"))}: ${"■".repeat(n)}${"□".repeat(5 - n)}</span>` : "");
      main.innerHTML = `
        <div class="dossie">
          <a class="voltar" href="${urlLocal(pg.voltar || "")}">← ${esc(U("fecharArquivo"))}</a>
          <header class="dossie-topo">
            ${pg.carimbo ? `<span class="carimbo">${esc(pg.carimbo)}</span>` : ""}
            <h1>${esc(T(l.nome))}</h1>
            <p class="dossie-tipo">${esc(T(l.tipo))}</p>
          </header>
          <p class="dossie-memo">${esc(T(pg.intro))}</p>
          <div class="dossie-fichas">${(pg.fichas || []).map((f, i) => `
            <article class="ficha-dossie">
              <button type="button" class="dossie-foto" data-zoom="${esc(f.imagem)}" style="--giro:${i % 2 ? 2 : -2}deg">${img(f.imagem, f.nome, ["#e9dfc4", "#8a1c1c"])}</button>
              <div class="ficha-dossie-txt">
                <div class="ficha-dossie-selos">${sit(f.situacao)}${perigo(f.perigo)}</div>
                <h2>${esc(T(f.nome))}</h2>
                ${f.classe ? `<p class="dossie-classe">${esc(T(f.classe))}</p>` : ""}
                <p>${esc(T(f.texto))}</p>
                ${f.notas ? `<ul class="manuscrito">${lista(f.notas)}</ul>` : ""}
              </div>
            </article>`).join("")}
          </div>
          ${pg.anotacoes ? `<aside class="dossie-anotacoes"><h2>${esc(U("anotacoes"))}</h2><ul class="manuscrito">${lista(pg.anotacoes)}</ul></aside>` : ""}
        </div>`;
      main.addEventListener("click", (e) => {
        const z = e.target.closest("[data-zoom]");
        if (z) abrirCaixa(`<img class="caixa-zoom" src="${esc(z.querySelector("img").src)}" alt="">`, "caixa-imagem");
      });
      main.after(rodape());
      return;
    }

    /* --- mapa clicável do local --- */
    const mapaLocal = (m) => `
      <section class="envolve faixa" id="mapa-local">
        <h2>${esc(T(m.titulo) || U("mapaRegiao"))}</h2>
        <div class="mapa-local">
          <div class="mapa-local-quadro">
            <img class="mapa-local-base" src="${esc(m.imagem)}" alt="${esc(T(m.titulo) || T(l.nome))}" onerror="this.closest('.mapa-local').classList.add('sem-imagem')">
            ${m.pontos.map((p, i) => `<button type="button" class="mapa-ponto" style="left:${p.x}%;top:${p.y}%" data-ponto="${i}">
              <span class="mapa-ponto-num">${i + 1}</span><span class="mapa-ponto-nome">${esc(T(p.nome))}</span></button>`).join("")}
          </div>
          <aside class="mapa-local-info" id="mapa-local-info" aria-live="polite">
            <p class="miudo">${esc(U("dicaMapaLocal"))}</p>
            <ol class="mapa-local-lista">${m.pontos.map((p, i) => `<li><button type="button" class="link" data-ponto="${i}">${esc(T(p.nome))}</button></li>`).join("")}</ol>
          </aside>
        </div>
      </section>`;

    const fauna = (grupos) => `
      <section class="envolve faixa" id="fauna">
        <h2>${esc(U("fauna"))}</h2>
        <div class="fauna-abas" role="tablist">${grupos.map((g, i) => `<button type="button" role="tab" data-fauna="${i}" aria-selected="${i === 0}">${esc(T(g.grupo))}</button>`).join("")}</div>
        <div class="fauna-painel" id="fauna-painel"></div>
      </section>`;

    const outros = locaisVisiveis().filter((x) => x.id !== l.id && !(pg.links || []).includes(x.id));
    main.innerHTML = `
      ${capa(l.imagem, `${T(l.tipo)}${reg && T(reg.nome) !== T(l.nome) ? " · " + T(reg.nome) : ""}`, T(l.nome), T(pg.intro) || T(l.resumo))}
      ${pg.segredo ? `<a class="segredo" href="${urlLocal(pg.segredo.local)}" aria-label="${esc(T(pg.segredo.dica))}">
          <img src="${esc(pg.segredo.icone)}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'segredo-reserva',textContent:'◬'}))">
          <span class="segredo-dica">${esc(T(pg.segredo.dica))}</span></a>` : ""}
      ${pg.fatos ? `<div class="envolve"><dl class="fatos">${pg.fatos.map((f) => `<div><dt>${esc(T(f.rotulo))}</dt><dd>${esc(T(f.valor))}</dd></div>`).join("")}</dl></div>` : ""}
      ${pg.destaque ? `<div class="envolve"><aside class="destaque-site">
          ${pg.destaque.imagem ? `<img src="${esc(pg.destaque.imagem)}" alt="" onerror="this.remove()">` : ""}
          <div><h2>${esc(T(pg.destaque.titulo))}</h2><p>${esc(T(pg.destaque.texto))}</p>
          <a class="botao" href="${esc(pg.destaque.url)}" target="_blank" rel="noopener">${esc(T(pg.destaque.botao))} ↗</a></div></aside></div>` : ""}
      ${pg.mapa ? mapaLocal(pg.mapa) : ""}
      ${pg.audios ? `<section class="envolve faixa" id="radio"><h2>${esc(U("noAr"))}</h2><p class="miudo">${esc(U("audioLegenda"))}</p>
        <div class="radio-grade">${pg.audios.map((a) => `
          <article class="radio-prog">
            ${img(a.imagem, a.titulo, ["#1b1b1b", "#ff4f93"], "radio-thumb")}
            <div class="radio-txt">
              <span class="etiqueta">FM 88.6 · ${esc(T(a.com))}</span>
              <h3>${esc(T(a.titulo))}</h3>
              <p>${esc(T(a.resumo))}</p>
              <audio controls preload="none" src="${esc(a.audio)}"></audio>
            </div>
          </article>`).join("")}</div>
        ${pg.programacao ? `<h3 class="sub">${esc(U("programacao"))}</h3><ul class="lista-simples">${lista(pg.programacao)}</ul>` : ""}
      </section>` : ""}
      ${pg.divisoes ? `<section class="envolve faixa"><h2>${esc(U("divisoes"))}</h2>
        <div class="divisoes">${pg.divisoes.map((d) => `
          <article class="divisao">
            <img class="patch" src="${esc(d.patch)}" alt="${esc(d.sigla)}" loading="lazy">
            <div><strong>${esc(d.sigla)}</strong><span class="miudo">${esc(d.nome)}</span><p>${esc(T(d.texto))}</p></div>
          </article>`).join("")}</div></section>` : ""}
      <div class="envolve secoes">
        ${(pg.secoes || []).map((s) => `
          <section class="secao-local${s.fosseis ? " secao-larga" : ""}" ${s.fosseis ? 'id="fosseis"' : ""}>
            <h2>${esc(T(s.titulo))}</h2>
            ${s.texto ? `<p>${esc(T(s.texto))}</p>` : ""}
            ${s.lista ? `<ul>${T(s.lista).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
            ${s.fosseis ? `<div class="fosseis-grade">${S.fosseis.map((f) => `
              <article class="fossil">${img(f.imagem, f.nome, ["#2a2418", "#c9a227"])}
                <div><h3><i>${esc(f.nome)}</i></h3><span class="local-tipo">${esc(T(f.tamanho))}</span><p>${esc(T(f.texto))}</p></div></article>`).join("")}</div>` : ""}
          </section>`).join("")}
      </div>
      ${pg.agenda ? `<section class="envolve faixa"><h2>${esc(U("agenda"))}</h2>
        <ol class="agenda">${pg.agenda.map((a) => `<li><span class="agenda-data">${esc(T(a.data))}</span><div><strong>${esc(T(a.nome))}</strong><p>${esc(T(a.texto))}</p></div></li>`).join("")}</ol></section>` : ""}
      ${pg.veiculos ? `<section class="envolve faixa"><h2>${esc(U("veiculos"))}</h2>
        <div class="veiculos">${pg.veiculos.map((v) => `<div class="veiculo"><strong>${esc(T(v.nome))}</strong><p>${esc(T(v.texto))}</p></div>`).join("")}</div></section>` : ""}
      ${pg.recortes ? `<section class="envolve faixa"><h2>${esc(U("recortes"))}</h2>
        <div class="recortes">${pg.recortes.map((r, i) => `
          <figure class="recorte${r.destaque ? " recorte-destaque" : ""}" style="--giro:${[-2, 1.5, -1, 2, -1.5][i % 5]}deg">
            <button type="button" data-zoom>${img(r.imagem, r.legenda, ["#e9dfc4", "#3a3a3a"])}</button>
            <figcaption>${esc(T(r.legenda))}</figcaption></figure>`).join("")}</div></section>` : ""}
      ${pg.fauna ? fauna(pg.fauna) : ""}
      ${pg.galeria ? `<section class="envolve faixa"><h2>${esc(U("galeria"))}</h2>
        <div class="carrossel galeria">${pg.galeria.map((g) => `
          <figure class="galeria-item"><button type="button" data-zoom>${img(g.imagem, g.legenda, ["#22302a", "#5c7a3e"])}</button>
            <figcaption>${esc(T(g.legenda))}</figcaption></figure>`).join("")}</div></section>` : ""}
      ${pg.curiosidades ? `<section class="envolve faixa"><h2>${esc(U("curiosidades"))}</h2>
        <ul class="curiosidades">${lista(pg.curiosidades)}</ul></section>` : ""}
      ${pg.personagens ? `<section class="envolve faixa"><h2>${esc(U("quem"))}</h2><div class="carrossel carrossel-retratos fileira-p">${cartoesPersonagens(pg.personagens)}</div></section>` : ""}
      ${pg.links ? `<section class="envolve faixa"><h2>${esc(U("exploreTambem"))}</h2>
        <div class="carrossel carrossel-mini carrossel-destaque">${pg.links.map(acharLocal).filter(Boolean).map(miniLocal).join("")}</div></section>` : ""}
      <section class="envolve faixa"><h2>${esc(U("outrosLocais"))}</h2>
        <div class="carrossel carrossel-mini">${outros.map(miniLocal).join("")}</div>
      </section>`;

    /* interações: mapa, fauna, galeria */
    if (pg.mapa) {
      const info = $("#mapa-local-info"), inicial = info.innerHTML;
      main.querySelector("#mapa-local").addEventListener("click", (e) => {
        const b = e.target.closest("[data-ponto]");
        if (!b) return;
        const p = pg.mapa.pontos[b.dataset.ponto];
        main.querySelectorAll(".mapa-ponto").forEach((x) => x.classList.toggle("ativa", x.dataset.ponto === b.dataset.ponto));
        info.innerHTML = `<span class="etiqueta">${+b.dataset.ponto + 1}</span><h3>${esc(T(p.nome))}</h3><p>${esc(T(p.texto))}</p>
          ${p.local && acharLocal(p.local) ? `<a class="botao" href="${urlLocal(p.local)}">${esc(U("abrirPagina"))} →</a>` : ""}
          <p><button type="button" class="link" data-voltar-lista>← ${esc(U("mapaRegiao"))}</button></p>`;
      });
      info.addEventListener("click", (e) => { if (e.target.closest("[data-voltar-lista]")) { e.stopPropagation(); info.innerHTML = inicial; main.querySelectorAll(".mapa-ponto.ativa").forEach((x) => x.classList.remove("ativa")); } });
    }
    if (pg.fauna) {
      const mostrarFauna = (i) => {
        const g = pg.fauna[i];
        main.querySelectorAll("[data-fauna]").forEach((b) => b.setAttribute("aria-selected", b.dataset.fauna === String(i)));
        $("#fauna-painel").innerHTML = `<button type="button" class="fauna-img" data-zoom>${img(g.imagem, g.grupo, ["#1f2a22", "#5c7a3e"])}</button><ul>${lista(g.itens)}</ul>`;
      };
      main.querySelector(".fauna-abas").addEventListener("click", (e) => { const b = e.target.closest("[data-fauna]"); if (b) mostrarFauna(+b.dataset.fauna); });
      mostrarFauna(0);
    }
    main.addEventListener("click", (e) => {
      const z = e.target.closest("[data-zoom]");
      if (!z) return;
      const im = z.querySelector("img"), leg = z.closest("figure")?.querySelector("figcaption")?.textContent || "";
      abrirCaixa(`<img class="caixa-zoom" src="${esc(im.src)}" alt="${esc(im.alt)}">${leg ? `<p class="caixa-legenda">${esc(leg)}</p>` : ""}`, "caixa-imagem");
    });
  }

  /* ---------- bestiário: criatura.html (índice) e criatura.html?id=... ---------- */
  if (tipo === "criatura") {
    const id = new URLSearchParams(location.search).get("id");
    const c = id && acharCriatura(id);
    const lista = (v) => (T(v) || []).map((x) => `<li>${esc(x)}</li>`).join("");
    const cartao = (x) => `<a class="cartao-p cartao-criatura" href="${urlCriatura(x.id)}">${img(x.imagem, x.nome, ["#1b2420", "#5c7a3e"])}
        <span class="cartao-p-txt"><span class="cartao-p-grupo">${esc(T(x.onde))} · ${esc(T(x.escala))}</span><strong>${esc(T(x.nome))}</strong></span></a>`;
    if (!c) {
      document.title = `${U("bestiario")} · Lowen Lake`;
      main.innerHTML = `
        ${capa(S.banners.lendas, U("etiquetas.lendas"), U("bestiario"), "")}
        <div class="envolve faixa"><div class="bestiario-grade">${S.criaturas.map(cartao).join("")}</div></div>`;
    } else {
      document.title = `${T(c.nome)} · Lowen Lake`;
      const pg = c.pagina || {};
      const reg = S.mapa.regioes[c.regiao];
      main.innerHTML = `
        <section class="envolve criatura-topo">
          <a class="voltar" href="criatura.html">← ${esc(U("bestiario"))}</a>
          <div class="criatura-grade">
            <button type="button" class="criatura-img" data-zoom>${img(c.imagem, c.nome, ["#1b2420", "#5c7a3e"])}</button>
            <div class="criatura-txt">
              <span class="etiqueta">${esc(U("avistamento"))}</span>
              <h1 class="titulo">${esc(T(c.nome))}</h1>
              <dl class="fatos fatos-compactos">
                <div><dt>${esc(U("tamanho"))}</dt><dd>${esc(T(c.escala))}</dd></div>
                <div><dt>${esc(U("ondeVisto"))}</dt><dd>${reg && reg.pagina ? `<a href="${urlLocal(reg.pagina)}">${esc(T(c.onde))}</a>` : esc(T(c.onde))}</dd></div>
              </dl>
              <p class="capa-intro">${esc(T(pg.intro) || T(c.texto))}</p>
              ${pg.sinais ? `<h2 class="sub">${esc(U("sinais"))}</h2><ul class="lista-simples">${lista(pg.sinais)}</ul>` : ""}
            </div>
          </div>
        </section>
        ${pg.avistamentos ? `<section class="envolve faixa"><h2>${esc(U("avistamentos"))}</h2>
          <ol class="agenda">${pg.avistamentos.map((a) => `<li><span class="agenda-data">${esc(T(a.data))}</span><div><strong>${esc(T(a.onde))}</strong><p>${esc(T(a.texto))}</p></div></li>`).join("")}</ol></section>` : ""}
        ${pg.dossie ? `<section class="envolve faixa"><div class="criatura-dossie">
          <button type="button" class="dossie-foto" data-zoom style="--giro:-2deg">${img(pg.dossie, c.nome, ["#e9dfc4", "#8a1c1c"])}</button>
          <div><span class="carimbo">TOP SECRET</span><h2>${esc(U("fichaConfidencial"))}</h2>
            <a class="botao" href="${urlLocal("area52-dossie")}">${esc(U("abrirDossie"))} →</a></div></div></section>` : ""}
        <section class="envolve faixa"><h2>${esc(U("outrasCriaturas"))}</h2>
          <div class="carrossel carrossel-retratos">${S.criaturas.filter((x) => x !== c).map(cartao).join("")}</div></section>`;
    }
    main.addEventListener("click", (e) => {
      const z = e.target.closest("[data-zoom]");
      if (z) abrirCaixa(`<img class="caixa-zoom" src="${esc(z.querySelector("img").src)}" alt="">`, "caixa-imagem");
    });
  }

  /* ---------- mapa de relações: relacoes.html ---------- */
  if (tipo === "relacoes") {
    document.title = `${U("mapaRelacoes")} · Lowen Lake`;
    const TIPOS = S.tiposRelacao;
    const COR_GRUPO = { punks: "#ff3d8b", amigos: "#9fd36b", cidade: "#c9a227", xerifado: "#e6c76a", area52: "#7d8c45",
      familias: "#2f7fb5", imprensa: "#e0703a", animais: "#b9c4a8", fundadores: "#a08a5a" };
    const CENTRO = { punks: [820, 560], amigos: [1160, 470], familias: [520, 300], cidade: [600, 860], xerifado: [250, 640],
      area52: [1330, 860], imprensa: [1180, 170], fundadores: [190, 180], animais: [800, 560] };
    const W = 1600, H = 1120;
    const arestas = (S.relacoesMapa || []).filter((r) => acharPersonagem(r[0]) && acharPersonagem(r[1]));
    const ids = [...new Set(arestas.flatMap((r) => [r[0], r[1]]))];
    const nos = ids.map((id, i) => {
      const p = acharPersonagem(id);
      const grande = ["jane", "asha", "lia", "lily", "jim", "ellen", "cross"].includes(id);
      return { id, p, r: grande ? 42 : p.grupo === "animais" ? 25 : 32, x: 0, y: 0, vx: 0, vy: 0 };
    });
    const no = Object.fromEntries(nos.map((n) => [n.id, n]));
    // animais ficam presos ao primeiro dono
    nos.forEach((n) => { if (n.p.grupo === "animais") { const r = arestas.find((a) => a[2] === "animal" && (a[0] === n.id || a[1] === n.id)); n.dono = r && (r[0] === n.id ? r[1] : r[0]); } });
    // posição inicial: em roda, perto do centro do grupo
    const porGrupo = {};
    nos.forEach((n) => { (porGrupo[n.p.grupo] = porGrupo[n.p.grupo] || []).push(n); });
    Object.entries(porGrupo).forEach(([g, lista]) => lista.forEach((n, i) => {
      const [cx, cy] = CENTRO[g] || [W / 2, H / 2];
      const a = (i / lista.length) * Math.PI * 2, raio = 40 + lista.length * 9;
      n.x = cx + Math.cos(a) * raio; n.y = cy + Math.sin(a) * raio;
    }));
    nos.forEach((n) => { if (n.dono && no[n.dono]) { n.x = no[n.dono].x + 50; n.y = no[n.dono].y + 50; } });
    // simulação simples de forças (sempre igual, sem sorteio)
    for (let it = 0, calor = 1; it < 500; it++, calor *= 0.993) {
      for (let i = 0; i < nos.length; i++) for (let j = i + 1; j < nos.length; j++) {
        const a = nos[i], b = nos[j];
        let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.1;
        const min = a.r + b.r + 34;
        if (d < 300) {
          const f = (9000 / (d * d)) + (d < min ? (min - d) * 0.5 : 0);
          dx /= d; dy /= d; a.vx -= dx * f; a.vy -= dy * f; b.vx += dx * f; b.vy += dy * f;
        }
      }
      arestas.forEach(([ia, ib, t]) => {
        const a = no[ia], b = no[ib];
        const L = t === "animal" ? 78 : 150;
        let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.1;
        const f = (d - L) * (t === "animal" ? 0.06 : 0.018);
        dx /= d; dy /= d; a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f; b.vy -= dy * f;
      });
      nos.forEach((n) => {
        if (!n.dono) { const [cx, cy] = CENTRO[n.p.grupo] || [W / 2, H / 2]; n.vx += (cx - n.x) * 0.014; n.vy += (cy - n.y) * 0.014; }
        n.x += Math.max(-30, Math.min(30, n.vx * calor)); n.y += Math.max(-30, Math.min(30, n.vy * calor));
        n.vx *= 0.5; n.vy *= 0.5;
        n.x = Math.max(n.r + 20, Math.min(W - n.r - 20, n.x)); n.y = Math.max(n.r + 20, Math.min(H - n.r - 40, n.y));
      });
    }
    const curto = (p) => T(p.nome).replace(/^(Xerife|Sheriff|General|Prefeita|Mayor|Vovó|Grandma|Oficial|Officer|Investigadora|Detective|Inspetora|Inspector|Capitã|Capt\.|Sargento|Sgt\.|Tenente|Lt\.|Irmã|Sister|Madame)\s+/, "")
      .replace(/^.*"(.+)".*$/, "$1").replace(/^A jiboia da Jane$|^Jane's boa$/, T({ pt: "Jiboia", en: "Boa" })).split(/[\s/]+/)[0];
    const fallback = (p) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="${(p.cor || [])[0] || "#222"}"/></svg>`)}`;

    main.innerHTML = `
      ${capa(S.banners.personagens, U("etiquetas.personagens"), U("mapaRelacoes"), U("introRelacoes"))}
      <div class="envolve faixa">
        <div class="rel-filtros" role="group" aria-label="${esc(U("relacoes"))}">${Object.entries(TIPOS).map(([k, t]) => `
          <button type="button" data-tipo="${k}" aria-pressed="true" style="--c:${t.cor}"><i></i>${esc(T(t.nome))}</button>`).join("")}</div>
        <div class="rel-grade">
          <div class="rel-palco">
            <svg id="rel-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(U("mapaRelacoes"))}">
              <defs><clipPath id="rel-clip" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath></defs>
              <g class="rel-arestas">${arestas.map(([a, b, t, rot], i) => {
                const A = no[a], B = no[b], tp = TIPOS[t] || {};
                return `<line data-i="${i}" data-a="${a}" data-b="${b}" data-tipo="${t}" x1="${A.x.toFixed(1)}" y1="${A.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}"
                  stroke="${tp.cor}"${tp.traco ? ` stroke-dasharray="${tp.traco}"` : ""}><title>${esc(T(A.p.nome))} · ${esc(T(B.p.nome))}: ${esc(T(rot))}</title></line>`;
              }).join("")}</g>
              <g class="rel-nos">${nos.map((n) => `
                <g class="rel-no${n.p.misterio ? " misterio" : ""}" data-id="${n.id}" transform="translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})" tabindex="0" role="button" aria-label="${esc(T(n.p.nome))}">
                  <circle class="rel-halo" r="${n.r + 7}"/>
                  <image href="${esc(n.p.imagem)}" x="${-n.r}" y="${-n.r}" width="${n.r * 2}" height="${n.r * 2}" preserveAspectRatio="xMidYMin slice" clip-path="url(#rel-clip)"
                    onerror="this.setAttribute('href','${fallback(n.p)}')"/>
                  <circle class="rel-aro" r="${n.r}" stroke="${COR_GRUPO[n.p.grupo] || "#ccc"}"/>
                  <text y="${n.r + 17}">${esc(curto(n.p))}</text>
                </g>`).join("")}</g>
            </svg>
            <div class="rel-zoom">
              <button type="button" data-zoom-rel="1" aria-label="+">+</button>
              <button type="button" data-zoom-rel="-1" aria-label="−">−</button>
              <button type="button" data-zoom-rel="0" aria-label="${esc(U("limpar"))}">⟲</button>
            </div>
          </div>
          <aside class="rel-info" id="rel-info" aria-live="polite"></aside>
        </div>
        <div class="rel-grupos">${Object.entries(COR_GRUPO).filter(([g]) => S.grupos[g]).map(([g, c]) => `<span style="--c:${c}"><i></i>${esc(T(S.grupos[g]))}</span>`).join("")}</div>
      </div>`;

    const svg = $("#rel-svg"), info = $("#rel-info");
    const ocultos = new Set();
    let sel = null;
    const infoPadrao = () => {
      info.innerHTML = `<h2 class="sub">${esc(U("mapaRelacoes"))}</h2><p>${esc(U("dicaRelacoes"))}</p>
        <p class="miudo">${nos.length} ${esc(U("personagensCriados"))} · ${arestas.length} ${esc(U("ligacoes"))}</p>`;
    };
    function selecionar(id, rolar) {
      sel = id && no[id] ? id : null;
      svg.classList.toggle("foco", !!sel);
      svg.querySelectorAll(".rel-no").forEach((g) => g.classList.remove("ativo", "vizinho"));
      svg.querySelectorAll("line").forEach((l) => l.classList.remove("ativo"));
      const url = new URL(location.href);
      if (!sel) { infoPadrao(); url.searchParams.delete("id"); history.replaceState(null, "", url); return; }
      url.searchParams.set("id", sel); history.replaceState(null, "", url);
      const n = no[sel];
      svg.querySelector(`.rel-no[data-id="${sel}"]`).classList.add("ativo");
      const minhas = arestas.map((r, i) => ({ r, i })).filter(({ r }) => (r[0] === sel || r[1] === sel) && !ocultos.has(r[2]));
      minhas.forEach(({ r, i }) => {
        svg.querySelector(`line[data-i="${i}"]`).classList.add("ativo");
        svg.querySelector(`.rel-no[data-id="${r[0] === sel ? r[1] : r[0]}"]`).classList.add("vizinho");
      });
      info.innerHTML = `
        <div class="rel-quem">${img(n.p.imagem, n.p.nome, n.p.cor)}
          <div><span class="etiqueta">${esc(T(S.grupos[n.p.grupo]))}</span><h2>${esc(T(n.p.nome))}</h2><p class="miudo">${esc(T(n.p.papel))}</p></div></div>
        <ul class="rel-lista">${minhas.map(({ r }) => {
          const outro = acharPersonagem(r[0] === sel ? r[1] : r[0]); const tp = TIPOS[r[2]];
          return `<li><button type="button" data-ir-rel="${esc(outro.id)}" style="--c:${tp.cor}">
            ${img(outro.imagem, outro.nome, outro.cor)}<span><b>${esc(T(outro.nome))}</b><small><i></i>${esc(T(r[3]))}</small></span></button></li>`;
        }).join("")}</ul>
        <div class="caixa-acoes"><button type="button" class="botao" data-ficha="${esc(sel)}">${esc(U("verFicha"))}</button>
          <button type="button" class="botao botao-linha" data-limpar>${esc(U("limpar"))}</button></div>`;
      if (rolar && matchMedia("(max-width: 860px)").matches) info.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // zoom e arrastar (mexe no viewBox)
    // o viewBox acompanha a proporção da caixa, então o mapa nunca fica achatado
    let vb = { x: 0, y: 0, w: W, h: H }, cheioW = W;
    const asp = () => (svg.clientHeight || 1) / (svg.clientWidth || 1);
    const aplicar = () => svg.setAttribute("viewBox", `${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`);
    const limitar = () => {
      const cx = Math.max(bx0, Math.min(bx1, vb.x + vb.w / 2)), cy = Math.max(by0, Math.min(by1, vb.y + vb.h / 2));
      vb.x = cx - vb.w / 2; vb.y = cy - vb.h / 2;
    };
    // enquadra só a área ocupada pelos personagens
    const bx0 = Math.min(...nos.map((n) => n.x - n.r)) - 30, bx1 = Math.max(...nos.map((n) => n.x + n.r)) + 30;
    const by0 = Math.min(...nos.map((n) => n.y - n.r)) - 30, by1 = Math.max(...nos.map((n) => n.y + n.r)) + 50;
    const BW = bx1 - bx0, BH = by1 - by0;
    const inteiro = () => {
      const a = asp();
      vb = a > BH / BW ? { x: bx0, w: BW, h: BW * a, y: by0 + (BH - BW * a) / 2 } : { y: by0, h: BH, w: BH / a, x: bx0 + (BW - BH / a) / 2 };
      cheioW = vb.w; aplicar();
    };
    const zoom = (f, cx = vb.x + vb.w / 2, cy = vb.y + vb.h / 2) => {
      const nw = Math.max(cheioW / 6, Math.min(cheioW, vb.w / f)), k = nw / vb.w;
      vb = { x: cx - (cx - vb.x) * k, y: cy - (cy - vb.y) * k, w: nw, h: nw * asp() };
      limitar(); aplicar();
    };
    const centrarEm = (id, w) => { const n = no[id]; if (!n) return; vb.w = w; vb.h = w * asp(); vb.x = n.x - w / 2; vb.y = n.y - vb.h / 2; limitar(); aplicar(); };
    inteiro();
    const pequeno = () => svg.clientWidth < 700;
    if (pequeno()) centrarEm(new URLSearchParams(location.search).get("id") || "jane", cheioW / 2.4);
    addEventListener("resize", () => { const cx = vb.x + vb.w / 2, cy = vb.y + vb.h / 2, f = cheioW / vb.w; inteiro(); vb.w = cheioW / f; vb.h = vb.w * asp(); vb.x = cx - vb.w / 2; vb.y = cy - vb.h / 2; limitar(); aplicar(); });
    let arrasto = null, moveu = false;
    svg.addEventListener("pointerdown", (e) => { arrasto = { x: e.clientX, y: e.clientY, vx: vb.x, vy: vb.y }; moveu = false; });
    addEventListener("pointermove", (e) => {
      if (!arrasto) return;
      const dx = e.clientX - arrasto.x, dy = e.clientY - arrasto.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) { moveu = true; svg.classList.add("arrastando"); }
      if (!moveu) return;
      const k = vb.w / svg.clientWidth;
      vb.x = arrasto.vx - dx * k; vb.y = arrasto.vy - dy * k; limitar(); aplicar();
    });
    addEventListener("pointerup", () => { arrasto = null; svg.classList.remove("arrastando"); });
    svg.addEventListener("wheel", (e) => {
      if (!e.ctrlKey && vb.w >= cheioW - 1) return; // sem zoom: a página rola normalmente
      e.preventDefault();
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const p = pt.matrixTransform(svg.getScreenCTM().inverse());
      zoom(e.deltaY < 0 ? 1.2 : 1 / 1.2, p.x, p.y);
    }, { passive: false });

    main.addEventListener("click", (e) => {
      const z = e.target.closest("[data-zoom-rel]");
      if (z) { const v = +z.dataset.zoomRel; if (v) zoom(v > 0 ? 1.4 : 1 / 1.4); else inteiro(); return; }
      const g = e.target.closest(".rel-no");
      if (g && !moveu) { selecionar(g.dataset.id === sel ? null : g.dataset.id, true); return; }
      const ir = e.target.closest("[data-ir-rel]"); if (ir) { selecionar(ir.dataset.irRel); return; }
      const f = e.target.closest("[data-ficha]"); if (f) { abrirPersonagem(f.dataset.ficha); return; }
      if (e.target.closest("[data-limpar]")) { selecionar(null); return; }
      const t = e.target.closest("[data-tipo]");
      if (t) {
        const k = t.dataset.tipo, liga = ocultos.has(k);
        liga ? ocultos.delete(k) : ocultos.add(k);
        t.setAttribute("aria-pressed", liga);
        svg.querySelectorAll(`line[data-tipo="${k}"]`).forEach((l) => l.classList.toggle("oculta", !liga));
        selecionar(sel);
      }
    });
    svg.addEventListener("keydown", (e) => { const g = e.target.closest(".rel-no"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); selecionar(g.dataset.id); } });
    selecionar(new URLSearchParams(location.search).get("id"));
  }

  /* ---------- sobre o artista: sobre.html ---------- */
  if (tipo === "sobre") {
    const A = S.artista || {};
    document.title = `${U("sobreArtista")} · ${S.nomeArtista}`;
    const vitrine = ["jane", "asha", "lia", "lily", "fatboy", "cross"].map(acharPersonagem).filter(Boolean);
    main.innerHTML = `
      ${capa(S.banners.portfolio, U("sobreArtista"), S.nomeArtista, T(A.titulo))}
      <section class="envolve faixa sobre-grade">
        <div class="sobre-texto">
          ${(A.bio || []).map((p) => `<p>${esc(T(p))}</p>`).join("")}
          <dl class="sobre-numeros">
            <div><dt>${esc(U("desenhandoDesde"))}</dt><dd>${esc(A.desde || "")}</dd></div>
            <div><dt>${esc(U("personagensCriados"))}</dt><dd>${S.personagens.length}</dd></div>
            <div><dt>${esc(U("locaisCriados"))}</dt><dd>${locaisVisiveis().length}</dd></div>
            <div><dt>${esc(U("criaturasCriadas"))}</dt><dd>${S.criaturas.length}</dd></div>
          </dl>
          <div class="caixa-acoes">
            <a class="botao" href="index.html#portfolio">${esc(U("verPortfolio"))} →</a>
            <a class="botao botao-linha" href="index.html#encomendas">${esc(U("encomendar"))}</a>
          </div>
        </div>
        <div class="sobre-vitrine">${vitrine.map((p, i) => `<button type="button" class="cartao-p" data-id="${esc(p.id)}" style="--giro:${[-3, 2, -1, 3, -2, 1][i]}deg">${img(p.imagem, p.nome, p.cor)}</button>`).join("")}</div>
      </section>
      <section class="envolve faixa">
        <h2>${esc(U("redesSociais"))}</h2>
        ${window.LL.redesHTML("redes redes-grandes")}
      </section>`;
  }

  /* ---------- página de eventos ---------- */
  if (tipo === "eventos") {
    document.title = `${U("menu.eventos")} · Lowen Lake`;
    main.innerHTML = `
      ${capa(S.banners.eventos, U("etiquetas.eventos"), U("menu.eventos"), "")}
      <div class="envolve">
        <div class="eventos-abas" role="tablist">${S.eventos.map((ev) => `
          <button type="button" role="tab" data-ev="${esc(ev.id)}"><span>${esc(T(ev.quando))}</span><b>${esc(T(ev.nome))}</b></button>`).join("")}</div>
        <div class="evento-destaque" id="evento-destaque" aria-live="polite"></div>
      </div>`;
    const mostrar = (id, rolar) => {
      const ev = S.eventos.find((x) => x.id === id) || S.eventos[0];
      const i = S.eventos.indexOf(ev);
      main.querySelectorAll("[data-ev]").forEach((b) => b.setAttribute("aria-selected", b.dataset.ev === ev.id));
      const destino = acharLocal(ev.local) ? urlLocal(ev.local) : "index.html#mapa";
      $("#evento-destaque").innerHTML = `
        ${img(ev.imagem, ev.nome, ["#2a1a2e", "#ff4f93"], "evento-img")}
        <div class="evento-txt">
          <h2>${esc(T(ev.nome))}</h2>
          <dl class="fatos fatos-compactos"><div><dt>${esc(U("quando"))}</dt><dd>${esc(T(ev.quando))}</dd></div>
            <div><dt>${esc(U("onde"))}</dt><dd><a href="${destino}">${esc(nomeOnde(ev.local))}</a></dd></div></dl>
          <p>${esc(T(ev.texto))}</p>
          ${ev.destaques ? `<h3>${esc(U("destaques"))}</h3><ul>${T(ev.destaques).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
          <div class="evento-nav">
            <button type="button" class="botao botao-linha" data-ev="${esc(S.eventos[(i - 1 + S.eventos.length) % S.eventos.length].id)}">‹ ${esc(U("anterior"))}</button>
            <button type="button" class="botao botao-linha" data-ev="${esc(S.eventos[(i + 1) % S.eventos.length].id)}">${esc(U("proximo"))} ›</button>
          </div>
        </div>`;
      history.replaceState(null, "", "#" + ev.id);
      if (rolar) $("#evento-destaque").scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    main.addEventListener("click", (e) => { const b = e.target.closest("[data-ev]"); if (b) mostrar(b.dataset.ev, true); });
    mostrar(location.hash.slice(1), false);
  }

  main.after(rodape());
  main.addEventListener("click", (e) => { const b = e.target.closest(".cartao-p"); if (b) abrirPersonagem(b.dataset.id); });
})();
