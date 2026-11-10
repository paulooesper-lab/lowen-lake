/* Páginas internas: local.html?id=... e eventos.html */
(function () {
  const { S, T, U, esc, $, img, acharLocal, acharPersonagem, nomeOnde, urlLocal, cabecalho, abrirPersonagem, abrirLocal, rodape, idadeTexto } = window.LL;
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
    main.innerHTML = `
      ${capa(l.imagem, `${T(l.tipo)}${reg ? " · " + T(reg.nome) : ""}`, T(l.nome), T(pg.intro) || T(l.resumo))}
      ${pg.fatos ? `<div class="envolve"><dl class="fatos">${pg.fatos.map((f) => `<div><dt>${esc(T(f.rotulo))}</dt><dd>${esc(T(f.valor))}</dd></div>`).join("")}</dl></div>` : ""}
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
      ${pg.personagens ? `<section class="envolve faixa"><h2>${esc(U("quem"))}</h2><div class="carrossel carrossel-retratos fileira-p">${cartoesPersonagens(pg.personagens)}</div></section>` : ""}
      <section class="envolve faixa"><h2>${esc(U("outrosLocais"))}</h2>
        <div class="carrossel carrossel-mini">${S.locais.filter((x) => x.id !== l.id).map((x) => `
          <a class="cartao-mini" href="${urlLocal(x.id)}">${img(x.imagem, x.nome, ["#22302a", "#2f7fb5"])}<span>${esc(T(x.nome))}</span></a>`).join("")}</div>
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
