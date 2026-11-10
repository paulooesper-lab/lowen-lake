/* Páginas internas: local.html?id=... e eventos.html */
(function () {
  const { S, T, U, esc, $, img, acharLocal, locaisVisiveis, acharPersonagem, nomeOnde, urlLocal, cabecalho, abrirCaixa, abrirPersonagem, abrirLocal, rodape, idadeTexto } = window.LL;
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
      ${pg.mapa ? mapaLocal(pg.mapa) : ""}
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
